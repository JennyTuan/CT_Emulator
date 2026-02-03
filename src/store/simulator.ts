import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useSimulatorStore = defineStore('simulator', () => {
    // Global States
    const laserOn = ref(false)
    const eStopActive = ref(false)
    const warmUpProgress = ref(0)
    const isWarmingUp = ref(false)
    const airCalProgress = ref(0)
    const isAirCalibrating = ref(false)

    // Motion States
    const gantryPosition = ref(0)
    const tableVertical = ref(0)
    const tableHorizontal = ref(0)
    const isMoving = ref(false)

    // Scan States
    const scanStatus = ref<'idle' | 'ready' | 'scanning' | 'pausing' | 'error'>('idle')
    const currentSlice = ref(0)
    const totalSlices = ref(500)
    const exposureActive = ref(false)

    // Actions
    const toggleLaser = () => {
        laserOn.value = !laserOn.value
    }

    const triggerEStop = () => {
        eStopActive.value = true
        scanStatus.value = 'error'
        isMoving.value = false
        exposureActive.value = false
    }

    const resetEStop = () => {
        eStopActive.value = false
        if (scanStatus.value === 'error') {
            scanStatus.value = 'idle'
        }
    }

    const startWarmUp = () => {
        if (isWarmingUp.value) return
        isWarmingUp.value = true
        warmUpProgress.value = 0
        const interval = setInterval(() => {
            warmUpProgress.value += 2
            if (warmUpProgress.value >= 100) {
                clearInterval(interval)
                isWarmingUp.value = false
            }
        }, 100)
    }

    const startAirCal = () => {
        if (isAirCalibrating.value) return
        isAirCalibrating.value = true
        airCalProgress.value = 0
        const interval = setInterval(() => {
            airCalProgress.value += 4
            if (airCalProgress.value >= 100) {
                clearInterval(interval)
                isAirCalibrating.value = false
            }
        }, 150)
    }

    const moveGantry = (pos: number) => {
        isMoving.value = true
        setTimeout(() => {
            gantryPosition.value = pos
            isMoving.value = false
        }, 500)
    }

    const startScan = () => {
        if (eStopActive.value) return
        scanStatus.value = 'scanning'
        exposureActive.value = true
        currentSlice.value = 0
        const interval = setInterval(() => {
            if (scanStatus.value !== 'scanning') {
                clearInterval(interval)
                exposureActive.value = false
                return
            }
            currentSlice.value += 1
            if (currentSlice.value >= totalSlices.value) {
                clearInterval(interval)
                scanStatus.value = 'idle'
                exposureActive.value = false
            }
        }, 50)
    }

    return {
        laserOn, eStopActive, warmUpProgress, isWarmingUp, airCalProgress, isAirCalibrating,
        gantryPosition, tableVertical, tableHorizontal, isMoving,
        scanStatus, currentSlice, totalSlices, exposureActive,
        toggleLaser, triggerEStop, resetEStop, startWarmUp, startAirCal, moveGantry, startScan
    }
})
