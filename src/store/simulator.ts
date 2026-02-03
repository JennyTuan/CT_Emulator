import { defineStore } from 'pinia'
import { ref, nextTick } from 'vue'

export type ProcessStatus = 'idle' | 'running' | 'paused' | 'finished' | 'error'
export type ScanPhase = 'idle' | 'enabling' | 'exposing' | 'reconstructing' | 'finishing' | 'error'

export const useSimulatorStore = defineStore('simulator', () => {
    // Global States
    const laserOn = ref(false)
    const eStopActive = ref(false)

    // Tube Warm-up States
    const warmUpStatus = ref<ProcessStatus>('idle')
    const warmUpProgress = ref(0)
    const currentHeatCapacity = ref(0)
    const targetHeatCapacity = ref(60)
    let warmUpTimer: any = null

    // Air Calibration States
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

    // Motion States
    const gantryPosition = ref(0)
    const tableVertical = ref(150)
    const tableHorizontal = ref(1600)
    const isMoving = ref(false)

    // Scan States
    const scanPhase = ref<ScanPhase>('idle')
    const scanStatus = ref<'idle' | 'ready' | 'scanning' | 'pausing' | 'error'>('idle')
    const currentSlice = ref(0)
    const totalSlices = ref(500)
    const exposureActive = ref(false)
    let scanInterval: any = null

    // --- ACTIONS ---

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
        if (scanStatus.value === 'error') {
            scanStatus.value = 'idle'
            scanPhase.value = 'idle'
        }
    }

    // Warm-up Actions
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

    // Air Calibration Actions
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

    const clearAirCalRecords = () => {
        resetAirCal()
    }

    const moveGantry = (pos: number) => {
        isMoving.value = true
        setTimeout(() => {
            gantryPosition.value = pos
            isMoving.value = false
        }, 500)
    }

    // Scan Actions
    const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

    const startScan = async () => {
        // Use type-neutral check to avoid TS inference issues in async scope
        const currentP: any = scanPhase.value;
        if (eStopActive.value || currentP !== 'idle') return

        try {
            // Phase 1: Enabling
            scanPhase.value = 'enabling'
            scanStatus.value = 'scanning'
            await delay(1000)
            if ((scanPhase.value as any) === 'error') return

            // Phase 2: Exposing
            scanPhase.value = 'exposing'
            exposureActive.value = true
            await nextTick()

            await new Promise<void>((resolve, reject) => {
                currentSlice.value = 0
                scanInterval = setInterval(() => {
                    const p: any = scanPhase.value;
                    if (p === 'error') {
                        clearInterval(scanInterval)
                        exposureActive.value = false
                        reject(new Error('Scan Aborted'))
                        return
                    }
                    if (scanStatus.value === 'pausing') return

                    currentSlice.value += 10; // Faster simulation
                    if (currentSlice.value >= totalSlices.value) {
                        clearInterval(scanInterval)
                        exposureActive.value = false
                        resolve()
                    }
                }, 50)
            })

            // Phase 3: Reconstructing
            scanPhase.value = 'reconstructing'
            await delay(1500)
            if ((scanPhase.value as any) === 'error') return

            // Phase 4: Finishing
            scanPhase.value = 'finishing'
            await delay(800)
            if ((scanPhase.value as any) === 'error') return

            scanPhase.value = 'idle'
            scanStatus.value = 'idle'

        } catch (e) {
            console.error(e)
            // Still reset state if error was handled
            if ((scanPhase.value as any) !== 'error') {
                scanPhase.value = 'idle'
                scanStatus.value = 'idle'
            }
        }
    }

    const failScan = (phase: ScanPhase) => {
        scanPhase.value = 'error'
        scanStatus.value = 'error'
        exposureActive.value = false
        if (scanInterval) clearInterval(scanInterval)
        triggerEStop()
    }

    return {
        laserOn, eStopActive,
        warmUpStatus, warmUpProgress, currentHeatCapacity, targetHeatCapacity,
        airCalStatus, airCalProgress, airCalParams, completedAirCalCombinations,
        gantryPosition, tableVertical, tableHorizontal, isMoving,
        scanStatus, scanPhase, currentSlice, totalSlices, exposureActive,
        toggleLaser, triggerEStop, resetEStop,
        startWarmUp, pauseWarmUp, resumeWarmUp, failWarmUp, resetWarmUp,
        startAirCal, pauseAirCal, resumeAirCal, failAirCal, resetAirCal, clearAirCalRecords,
        moveGantry, startScan, failScan
    }
}, {
    persist: false // DISABLE PERSISTENCE TEMPORARILY
})
