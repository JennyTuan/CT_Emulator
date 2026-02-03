import { defineStore } from 'pinia'
import { ref, nextTick } from 'vue'

export type ProcessStatus = 'idle' | 'running' | 'paused' | 'finished' | 'error'
export type ScanPhase = 'idle' | 'prepared' | 'enabling' | 'enabled' | 'exposing' | 'reconstructing' | 'finishing' | 'error'

export const useSimulatorStore = defineStore('simulator', () => {
    // --- GLOBAL STATE ---
    const laserOn = ref(false)
    const eStopActive = ref(false)

    // --- TUBE WARM-UP ---
    const warmUpStatus = ref<ProcessStatus>('idle')
    const warmUpProgress = ref(0)
    const currentHeatCapacity = ref(0)
    const targetHeatCapacity = ref(60)
    let warmUpTimer: any = null

    // --- AIR CALIBRATION ---
    const airCalStatus = ref<ProcessStatus>('idle')
    const airCalProgress = ref(0)
    const completedAirCalCombinations = ref(0)
    let airCalTimer: any = null

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
    const scanPhase = ref<ScanPhase>('idle')
    const scanStatus = ref<'idle' | 'ready' | 'scanning' | 'error'>('idle')
    const currentSlice = ref(0)
    const totalSlices = ref(500)
    const exposureActive = ref(false)
    let scanInterval: any = null

    // --- ACTIONS: GLOBAL ---
    const toggleLaser = () => {
        laserOn.value = !laserOn.value
    }

    const triggerEStop = () => {
        eStopActive.value = true
        scanStatus.value = 'error'
        scanPhase.value = 'error'
        isMoving.value = false
        exposureActive.value = false
        if (warmUpStatus.value === 'running') failWarmUp()
        if (airCalStatus.value === 'running') failAirCal()
        if (scanInterval) clearInterval(scanInterval)
    }

    const resetEStop = () => {
        eStopActive.value = false
        if (scanPhase.value === 'error') {
            scanPhase.value = 'idle'
            scanStatus.value = 'idle'
            currentSlice.value = 0
        }
    }

    // --- ACTIONS: WARM-UP ---
    const runWarmUp = () => {
        warmUpTimer = setInterval(() => {
            if (warmUpStatus.value !== 'running') {
                clearInterval(warmUpTimer)
                return
            }
            warmUpProgress.value = Math.min(100, warmUpProgress.value + 1)
            currentHeatCapacity.value = (warmUpProgress.value / 100) * targetHeatCapacity.value
            if (warmUpProgress.value >= 100) {
                clearInterval(warmUpTimer)
                warmUpStatus.value = 'finished'
            }
        }, 100)
    }

    const startWarmUp = () => {
        if (warmUpStatus.value === 'running' || warmUpStatus.value === 'finished') return
        warmUpStatus.value = 'running'
        runWarmUp()
    }

    const pauseWarmUp = () => {
        if (warmUpStatus.value === 'running') {
            warmUpStatus.value = 'paused'
            clearInterval(warmUpTimer)
        }
    }

    const resumeWarmUp = () => {
        if (warmUpStatus.value === 'paused') {
            warmUpStatus.value = 'running'
            runWarmUp()
        }
    }

    const failWarmUp = () => {
        warmUpStatus.value = 'error'
        clearInterval(warmUpTimer)
    }

    const resetWarmUp = () => {
        warmUpStatus.value = 'idle'
        warmUpProgress.value = 0
        currentHeatCapacity.value = 0
        if (warmUpTimer) clearInterval(warmUpTimer)
    }

    // --- ACTIONS: AIR CAL ---
    const runAirCal = () => {
        const totalCombinations = 24
        airCalTimer = setInterval(() => {
            if (airCalStatus.value !== 'running') {
                clearInterval(airCalTimer)
                return
            }
            airCalProgress.value = Math.min(100, airCalProgress.value + 0.5)
            completedAirCalCombinations.value = Math.floor((airCalProgress.value / 100) * totalCombinations)
            if (airCalProgress.value >= 100) {
                clearInterval(airCalTimer)
                airCalStatus.value = 'finished'
                completedAirCalCombinations.value = totalCombinations
            }
        }, 100)
    }

    const startAirCal = () => {
        if (airCalStatus.value === 'running' || airCalStatus.value === 'finished') return
        airCalStatus.value = 'running'
        runAirCal()
    }

    const pauseAirCal = () => {
        if (airCalStatus.value === 'running') {
            airCalStatus.value = 'paused'
            clearInterval(airCalTimer)
        }
    }

    const resumeAirCal = () => {
        if (airCalStatus.value === 'paused') {
            airCalStatus.value = 'running'
            runAirCal()
        }
    }

    const failAirCal = () => {
        airCalStatus.value = 'error'
        clearInterval(airCalTimer)
    }

    const resetAirCal = () => {
        airCalStatus.value = 'idle'
        airCalProgress.value = 0
        completedAirCalCombinations.value = 0
        if (airCalTimer) clearInterval(airCalTimer)
    }

    const clearAirCalRecords = () => resetAirCal()

    // --- ACTIONS: MOTION ---
    const moveGantry = (pos: number) => {
        isMoving.value = true
        setTimeout(() => {
            gantryPosition.value = pos
            isMoving.value = false
        }, 500)
    }

    // --- ACTIONS: SCAN ENGINE ---
    const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

    const prepareScan = async () => {
        if (scanPhase.value === 'error' || eStopActive.value) {
            resetEStop()
        }
        scanPhase.value = 'prepared'
        scanStatus.value = 'ready'
        currentSlice.value = 0
    }

    const enableScan = async () => {
        if (scanPhase.value !== 'prepared') return
        scanPhase.value = 'enabling'
        await delay(1200)
        if ((scanPhase.value as string) === 'error') return
        scanPhase.value = 'enabled'
    }

    const startExposure = async () => {
        if (scanPhase.value !== 'enabled') return
        scanPhase.value = 'exposing'
        scanStatus.value = 'scanning'
        exposureActive.value = true
        await nextTick()

        try {
            await new Promise<void>((resolve, reject) => {
                scanInterval = setInterval(() => {
                    if ((scanPhase.value as string) === 'error') {
                        clearInterval(scanInterval)
                        exposureActive.value = false
                        reject(new Error('Exposure Failed'))
                        return
                    }
                    currentSlice.value += 10
                    if (currentSlice.value >= totalSlices.value) {
                        clearInterval(scanInterval)
                        exposureActive.value = false
                        resolve()
                    }
                }, 50)
            })

            // AUTO-SEQUENCING AFTER EXPOSURE
            scanPhase.value = 'reconstructing'
            await delay(1500)
            if ((scanPhase.value as string) === 'error') return

            scanPhase.value = 'finishing'
            await delay(800)
            if ((scanPhase.value as string) === 'error') return

            scanPhase.value = 'idle'
            scanStatus.value = 'idle'
        } catch (e) {
            console.error(e)
        }
    }

    const failScan = () => {
        triggerEStop()
    }

    const resetSystem = () => {
        localStorage.clear()
        window.location.reload()
    }

    return {
        // State
        laserOn, eStopActive,
        warmUpStatus, warmUpProgress, currentHeatCapacity, targetHeatCapacity,
        airCalStatus, airCalProgress, airCalParams, completedAirCalCombinations,
        gantryPosition, tableVertical, tableHorizontal, isMoving,
        scanStatus, scanPhase, currentSlice, totalSlices, exposureActive,

        // Actions
        toggleLaser, triggerEStop, resetEStop,
        startWarmUp, pauseWarmUp, resumeWarmUp, failWarmUp, resetWarmUp,
        startAirCal, pauseAirCal, resumeAirCal, failAirCal, resetAirCal, clearAirCalRecords,
        moveGantry, prepareScan, enableScan, startExposure, failScan, resetSystem
    }
}, {
    persist: true // RESTORE PERSISTENCE
})
