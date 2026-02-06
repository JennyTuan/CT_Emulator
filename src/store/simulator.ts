import { defineStore } from 'pinia'
import { nextTick, ref } from 'vue'
import {
    AIRCAL_INTERVAL_MS,
    AIRCAL_STEP_PERCENT,
    AIRCAL_TOTAL_COMBINATIONS,
    ENABLE_DELAY_MS,
    FINISH_DELAY_MS,
    MAX_LOG_ENTRIES,
    MOVE_GANTRY_BASE_DELAY_MS,
    RECON_DELAY_MS,
    SCAN_INTERVAL_MS,
    SCAN_SLICE_STEP,
    SCAN_TOTAL_SLICES,
    THERMAL_UPDATE_MS,
    TUBE_COOL_RATE_PER_TICK,
    TUBE_TEMP_AMBIENT,
    TUBE_TEMP_MAX,
    TUBE_TEMP_WARN,
    EXPOSURE_HEAT_PER_SLICE,
    WARMUP_HEAT_PER_TICK,
    WARMUP_INTERVAL_MS,
    WARMUP_STEP_PERCENT
} from '../constants/simulator'

export type ProcessStatus = 'idle' | 'running' | 'paused' | 'finished' | 'error'
export type ScanPhase = 'Init' | 'ScanRequest' | 'ScanStart' | 'MoveWait' | 'ScanWait' | 'ExposureStart' | 'SendImage' | 'error'
export type PatientStatus = 'idle' | 'inProgress' | 'completed' | 'cancelled'
export type LogLevel = 'info' | 'warn' | 'error' | 'success'

type LogEntry = {
    id: string
    time: string
    level: LogLevel
    message: string
}

export const useSimulatorStore = defineStore('simulator', () => {
    // --- GLOBAL STATE ---
    const laserOn = ref(false)
    const eStopActive = ref(false)

    // --- PATIENT & WORKFLOW ---
    const patientStatus = ref<PatientStatus>('idle')
    const patientInfoComplete = ref(false)
    const protocolComplete = ref(false)
    const scoutComplete = ref(false)
    const scanComplete = ref(false)
    const reconComplete = ref(false)
    const activePatient = ref({
        id: 'PID-2024-004',
        name: '张小凡',
        gender: 'M',
        age: '28Y',
        weight: '65kg',
        protocol: 'Chest Routine'
    })


    // --- TUBE WARM-UP ---
    const warmUpStatus = ref<ProcessStatus>('idle')
    const warmUpProgress = ref(0)
    const currentHeatCapacity = ref(0)
    const targetHeatCapacity = ref(60)
    let warmUpTimer: ReturnType<typeof setInterval> | null = null

    // --- AIR CALIBRATION ---
    const airCalStatus = ref<ProcessStatus>('idle')
    const airCalProgress = ref(0)
    const completedAirCalCombinations = ref(0)
    let airCalTimer: ReturnType<typeof setInterval> | null = null

    const airCalParams = ref({
        rotationSpeed: [1, 2, 0.75],
        focalSpot: ['small', 'big'],
        voltage: [80, 100, 120, 140],
        collimatorWidth: ['32*0.6']
    })

    // --- MOTION ---
    const gantryPosition = ref(0)
    const tableVertical = ref(150)
    const tableHorizontal = ref(1600)
    const isMoving = ref(false)

    // --- SCAN MACHINE ---
    const scanPhase = ref<ScanPhase>('Init')
    const scanStatus = ref<'idle' | 'ready' | 'scanning' | 'error'>('idle')
    const autoScan = ref(false)
    const errorMessage = ref('')

    // --- MOTION FAULTS & GLOBAL ---
    const motionLimitFault = ref(false)
    const gantryStuck = ref(false)
    const outOfSync = ref(false)
    const heartbeatLost = ref(false)
    const responseDelay = ref(0) // ms
    const faultSimActive = ref(false) // Track if fault simulation is active

    const currentSlice = ref(0)
    const totalSlices = ref(SCAN_TOTAL_SLICES)
    const exposureActive = ref(false)
    let scanInterval: ReturnType<typeof setInterval> | null = null

    const tubeTemp = ref(TUBE_TEMP_AMBIENT)
    const tubeOverheat = ref(false)
    let thermalTimer: ReturnType<typeof setInterval> | null = null
    let lastTempWarnAt = 0

    const logs = ref<LogEntry[]>([])

    const addLog = (level: LogLevel, message: string) => {
        const time = new Date().toLocaleTimeString('zh-CN', { hour12: false })
        logs.value.unshift({
            id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
            time,
            level,
            message
        })
        if (logs.value.length > MAX_LOG_ENTRIES) {
            logs.value = logs.value.slice(0, MAX_LOG_ENTRIES)
        }
    }

    const clearLogs = () => {
        logs.value = []
    }

    const applyTubeHeat = (delta: number) => {
        tubeTemp.value = Math.max(TUBE_TEMP_AMBIENT, tubeTemp.value + delta)
        if (tubeTemp.value >= TUBE_TEMP_MAX) {
            tubeOverheat.value = true
            triggerEStop('球管过热 (Tube Overheat)')
            addLog('error', `球管过热：${tubeTemp.value.toFixed(1)}°C`)
        } else if (tubeTemp.value >= TUBE_TEMP_WARN) {
            const now = Date.now()
            if (now - lastTempWarnAt > 5000) {
                lastTempWarnAt = now
                addLog('warn', `球管温度偏高：${tubeTemp.value.toFixed(1)}°C`)
            }
        }
    }

    const startThermalLoop = () => {
        if (thermalTimer) return
        thermalTimer = setInterval(() => {
            if (exposureActive.value || warmUpStatus.value === 'running') return
            if (tubeTemp.value > TUBE_TEMP_AMBIENT) {
                tubeTemp.value = Math.max(TUBE_TEMP_AMBIENT, tubeTemp.value - TUBE_COOL_RATE_PER_TICK)
            }
        }, THERMAL_UPDATE_MS)
    }

    const clearWarmUpTimer = () => {
        if (warmUpTimer) {
            clearInterval(warmUpTimer)
            warmUpTimer = null
        }
    }

    const clearAirCalTimer = () => {
        if (airCalTimer) {
            clearInterval(airCalTimer)
            airCalTimer = null
        }
    }

    const clearScanInterval = () => {
        if (scanInterval) {
            clearInterval(scanInterval)
            scanInterval = null
        }
    }

    // --- ACTIONS: GLOBAL ---
    const toggleLaser = () => {
        laserOn.value = !laserOn.value
        addLog('info', laserOn.value ? '激光定位已开启' : '激光定位已关闭')
    }

    const triggerEStop = (msg: string = 'EMERGENCY STOP ACTIVE') => {
        eStopActive.value = true
        scanStatus.value = 'error'
        scanPhase.value = 'Init'
        errorMessage.value = msg
        addLog('error', `急停触发：${msg}`)
        isMoving.value = false
        exposureActive.value = false
        gantryStuck.value = false // Reset stuck on estop
        if (warmUpStatus.value === 'running') failWarmUp()
        if (airCalStatus.value === 'running') failAirCal()
        clearScanInterval()
    }

    const resetEStop = () => {
        eStopActive.value = false
        faultSimActive.value = false
        errorMessage.value = ''
        addLog('info', '急停已复位')
        if (scanPhase.value === 'Init' || scanStatus.value === 'error') {
            scanPhase.value = 'Init'
            scanStatus.value = 'idle'
            currentSlice.value = 0
        }
    }

    // --- ACTIONS: WARM-UP ---
    const runWarmUp = () => {
        warmUpTimer = setInterval(() => {
            if (warmUpStatus.value !== 'running') {
                clearWarmUpTimer()
                return
            }
            warmUpProgress.value = Math.min(100, warmUpProgress.value + WARMUP_STEP_PERCENT)
            currentHeatCapacity.value = (warmUpProgress.value / 100) * targetHeatCapacity.value
            applyTubeHeat(WARMUP_HEAT_PER_TICK)
            if (warmUpProgress.value >= 100) {
                clearWarmUpTimer()
                warmUpStatus.value = 'finished'
                addLog('success', '球管预热完成')
            }
        }, WARMUP_INTERVAL_MS)
    }

    const startWarmUp = () => {
        if (warmUpStatus.value === 'running' || warmUpStatus.value === 'finished') return
        warmUpStatus.value = 'running'
        addLog('info', '开始球管预热')
        runWarmUp()
    }

    const pauseWarmUp = () => {
        if (warmUpStatus.value === 'running') {
            warmUpStatus.value = 'paused'
            clearWarmUpTimer()
            addLog('warn', '球管预热已暂停')
        }
    }

    const resumeWarmUp = () => {
        if (warmUpStatus.value === 'paused') {
            warmUpStatus.value = 'running'
            addLog('info', '球管预热继续')
            runWarmUp()
        }
    }

    const failWarmUp = () => {
        warmUpStatus.value = 'error'
        clearWarmUpTimer()
        addLog('error', '球管预热失败')
    }

    const resetWarmUp = () => {
        warmUpStatus.value = 'idle'
        warmUpProgress.value = 0
        currentHeatCapacity.value = 0
        clearWarmUpTimer()
        addLog('info', '球管预热已重置')
    }

    // --- ACTIONS: AIR CAL ---
    const runAirCal = () => {
        airCalTimer = setInterval(() => {
            if (airCalStatus.value !== 'running') {
                clearAirCalTimer()
                return
            }
            airCalProgress.value = Math.min(100, airCalProgress.value + AIRCAL_STEP_PERCENT)
            completedAirCalCombinations.value = Math.floor((airCalProgress.value / 100) * AIRCAL_TOTAL_COMBINATIONS)
            if (airCalProgress.value >= 100) {
                clearAirCalTimer()
                airCalStatus.value = 'finished'
                completedAirCalCombinations.value = AIRCAL_TOTAL_COMBINATIONS
                addLog('success', '空气校正完成')
            }
        }, AIRCAL_INTERVAL_MS)
    }

    const startAirCal = () => {
        if (airCalStatus.value === 'running' || airCalStatus.value === 'finished') return
        airCalStatus.value = 'running'
        addLog('info', '开始空气校正')
        runAirCal()
    }

    const pauseAirCal = () => {
        if (airCalStatus.value === 'running') {
            airCalStatus.value = 'paused'
            clearAirCalTimer()
            addLog('warn', '空气校正已暂停')
        }
    }

    const resumeAirCal = () => {
        if (airCalStatus.value === 'paused') {
            airCalStatus.value = 'running'
            addLog('info', '空气校正继续')
            runAirCal()
        }
    }

    const failAirCal = () => {
        airCalStatus.value = 'error'
        clearAirCalTimer()
        addLog('error', '空气校正失败')
    }

    const resetAirCal = () => {
        airCalStatus.value = 'idle'
        airCalProgress.value = 0
        completedAirCalCombinations.value = 0
        clearAirCalTimer()
        addLog('info', '空气校正已重置')
    }

    const clearAirCalRecords = () => resetAirCal()

    // --- ACTIONS: MOTION ---
    const moveGantry = (pos: number) => {
        if (heartbeatLost.value) return
        isMoving.value = true
        setTimeout(() => {
            gantryPosition.value = pos
            isMoving.value = false
        }, MOVE_GANTRY_BASE_DELAY_MS + responseDelay.value)
    }

    const setMotionFault = (type: string) => {
        switch (type) {
            case 'limit':
                motionLimitFault.value = true
                errorMessage.value = '限位触发 (Limit Hit): 水平移动超出安全范围'
                addLog('error', '限位触发：水平移动超出安全范围')
                break
            case 'stuck':
                gantryStuck.value = true
                errorMessage.value = '机架倾斜卡死: 电机过载 (Motor Overload)'
                addLog('error', '机架倾斜卡死：电机过载')
                break
            case 'sync':
                outOfSync.value = true
                errorMessage.value = '反馈失步 (Position Out of Sync): 编码器反馈异常'
                addLog('error', '运动反馈失步：编码器反馈异常')
                break
            case 'heartbeat':
                heartbeatLost.value = true
                errorMessage.value = '系统通讯超时 (Heartbeat Timeout)'
                addLog('error', '系统通讯超时：心跳丢失')
                break
            case 'delay':
                responseDelay.value = 2000
                errorMessage.value = '总线延迟 (Response Delay): 通讯延迟已开启 (2s)'
                addLog('warn', '通讯延迟模拟已开启 (2s)')
                break
            case 'clear':
                motionLimitFault.value = false
                gantryStuck.value = false
                outOfSync.value = false
                heartbeatLost.value = false
                responseDelay.value = 0
                errorMessage.value = ''
                addLog('info', '运动故障已清除')
                break
        }
    }

    // --- ACTIONS: SCAN ENGINE ---
    const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

    const prepareScan = async () => {
        if (scanPhase.value !== 'Init' && scanPhase.value !== 'SendImage') return
        scanPhase.value = 'ScanRequest'
        addLog('info', '收到扫描请求 (ScanRequest)')
        await delay(1000)
        if (autoScan.value) enableScan()
    }

    const enableScan = async () => {
        if (scanPhase.value !== 'ScanRequest') return
        scanPhase.value = 'ScanStart'
        addLog('info', '扫描启动中 (ScanStart)')
        await delay(ENABLE_DELAY_MS)
        if ((scanPhase.value as string) === 'error') return

        scanPhase.value = 'MoveWait'
        addLog('info', '等待机械到位 (MoveWait)...')
        await delay(1500)

        scanPhase.value = 'ScanWait'
        addLog('success', '使能完成，准备曝光 (ScanWait)')
        if (autoScan.value) startExposureAction()
    }

    const startExposureAction = async () => {
        if (scanPhase.value !== 'ScanWait') return

        scanPhase.value = 'ExposureStart'
        scanStatus.value = 'scanning'
        exposureActive.value = true
        addLog('info', '开始曝光 (ExposureStart)')

        await nextTick()

        try {
            await new Promise<void>((resolve, reject) => {
                scanInterval = setInterval(() => {
                    if ((scanPhase.value as string) === 'error') {
                        clearScanInterval()
                        exposureActive.value = false
                        reject(new Error('Exposure Failed'))
                        return
                    }
                    currentSlice.value += SCAN_SLICE_STEP
                    applyTubeHeat(SCAN_SLICE_STEP * EXPOSURE_HEAT_PER_SLICE)
                    if (currentSlice.value >= totalSlices.value) {
                        clearScanInterval()
                        exposureActive.value = false
                        resolve()
                    }
                }, SCAN_INTERVAL_MS)
            })

            scanPhase.value = 'SendImage'
            addLog('success', '曝光完成，正在传输图像 (SendImage)')
            await delay(2000)
            addLog('success', '检查流程结束')
            patientStatus.value = 'completed'
            if (autoScan.value) startRecon()
        } catch (e) {
            console.error(e)
        }
    }

    const startRecon = async () => {
        // ... Recon is now part of SendImage logic effectively, or can be triggered after SendImage
        if (scanPhase.value !== 'SendImage') return
        scanPhase.value = 'Init'
        scanStatus.value = 'idle'
        reconComplete.value = true
        addLog('success', '重建任务已启动')
    }

    // StartScout is removed or integrated into the single Exposure flow

    const failScan = (msg?: string) => {
        faultSimActive.value = true
        triggerEStop(msg)
    }

    const resetSystem = () => {
        // 1. Explicitly reset all clinical states
        patientStatus.value = 'idle'
        patientInfoComplete.value = false
        protocolComplete.value = false
        scoutComplete.value = false
        scanComplete.value = false
        reconComplete.value = false
        scanPhase.value = 'Init'
        scanStatus.value = 'idle'
        currentSlice.value = 0
        exposureActive.value = false
        faultSimActive.value = false
        logs.value = []

        // 2. Clear storage and reload
        localStorage.clear()
        addLog('warn', '系统强制重置')
        window.location.reload()
    }

    const confirmPatientInfo = (info?: any) => {
        if (info) activePatient.value = { ...activePatient.value, ...info }
        patientInfoComplete.value = true
        patientStatus.value = 'inProgress'
        addLog('success', '模拟器收到：患者基本信息已完成确认')
    }

    const confirmProtocolParameters = (params?: any) => {
        protocolComplete.value = true
        reconComplete.value = true
        if (patientInfoComplete.value) {
            addLog('success', '模拟器收到：协议参数及重建参数已完成确认')
        }
    }

    startThermalLoop()

    return {
        // State
        laserOn, eStopActive,
        patientStatus, patientInfoComplete, protocolComplete, scoutComplete, scanComplete, reconComplete, activePatient,
        warmUpStatus, warmUpProgress, currentHeatCapacity, targetHeatCapacity,
        airCalStatus, airCalProgress, airCalParams, completedAirCalCombinations,
        gantryPosition, tableVertical, tableHorizontal, isMoving,
        scanStatus, scanPhase, autoScan, errorMessage,
        motionLimitFault, gantryStuck, outOfSync, heartbeatLost, responseDelay, faultSimActive,
        currentSlice, totalSlices, exposureActive,
        tubeTemp, tubeOverheat,
        logs,

        // Actions
        toggleLaser, triggerEStop, resetEStop,
        confirmPatientInfo, confirmProtocolParameters,
        startWarmUp, pauseWarmUp, resumeWarmUp, failWarmUp, resetWarmUp,
        startAirCal, pauseAirCal, resumeAirCal, failAirCal, resetAirCal, clearAirCalRecords,
        moveGantry, setMotionFault, prepareScan, enableScan, startExposure: startExposureAction, startRecon, failScan, resetSystem,
        addLog,
        clearLogs
    }
}, {
    persist: true // RESTORE PERSISTENCE
})
