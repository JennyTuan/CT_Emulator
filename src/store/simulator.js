import { defineStore } from 'pinia';
import { ref } from 'vue';
export const useSimulatorStore = defineStore('simulator', () => {
    // Global States
    const laserOn = ref(false);
    const eStopActive = ref(false);
    // Tube Warm-up States
    const warmUpStatus = ref('idle');
    const warmUpProgress = ref(0);
    const currentHeatCapacity = ref(0);
    const targetHeatCapacity = ref(60);
    let warmUpTimer = null;
    // Air Calibration States
    const airCalStatus = ref('idle');
    const airCalProgress = ref(0);
    const completedAirCalCombinations = ref(0);
    let airCalTimer = null;
    const airCalParams = ref({
        rotationSpeed: [1, 2, 0.75],
        focalSpot: ['small', 'big'],
        voltage: [80, 100, 120, 140],
        collimatorWidth: ['32*0.6']
    });
    // Motion States
    const gantryPosition = ref(0);
    const tableVertical = ref(150);
    const tableHorizontal = ref(800);
    const isMoving = ref(false);
    // Scan States
    const scanStatus = ref('idle');
    const currentSlice = ref(0);
    const totalSlices = ref(500);
    const exposureActive = ref(false);
    // Actions
    const toggleLaser = () => {
        laserOn.value = !laserOn.value;
    };
    const triggerEStop = () => {
        eStopActive.value = true;
        scanStatus.value = 'error';
        isMoving.value = false;
        exposureActive.value = false;
        if (warmUpStatus.value === 'running')
            failWarmUp();
        if (airCalStatus.value === 'running')
            failAirCal();
    };
    const resetEStop = () => {
        eStopActive.value = false;
        if (scanStatus.value === 'error')
            scanStatus.value = 'idle';
    };
    // Warm-up Actions
    const startWarmUp = () => {
        if (warmUpStatus.value === 'running' || warmUpStatus.value === 'finished')
            return;
        warmUpStatus.value = 'running';
        runWarmUp();
    };
    const runWarmUp = () => {
        warmUpTimer = setInterval(() => {
            if (warmUpStatus.value !== 'running') {
                clearInterval(warmUpTimer);
                return;
            }
            warmUpProgress.value = Math.min(100, warmUpProgress.value + 1);
            currentHeatCapacity.value = (warmUpProgress.value / 100) * targetHeatCapacity.value;
            if (warmUpProgress.value >= 100) {
                clearInterval(warmUpTimer);
                warmUpStatus.value = 'finished';
            }
        }, 100);
    };
    const pauseWarmUp = () => {
        if (warmUpStatus.value === 'running') {
            warmUpStatus.value = 'paused';
            clearInterval(warmUpTimer);
        }
    };
    const resumeWarmUp = () => {
        if (warmUpStatus.value === 'paused') {
            warmUpStatus.value = 'running';
            runWarmUp();
        }
    };
    const failWarmUp = () => {
        warmUpStatus.value = 'error';
        clearInterval(warmUpTimer);
    };
    const resetWarmUp = () => {
        warmUpStatus.value = 'idle';
        warmUpProgress.value = 0;
        currentHeatCapacity.value = 0;
        clearInterval(warmUpTimer);
    };
    // Air Calibration Actions
    const startAirCal = () => {
        if (airCalStatus.value === 'running' || airCalStatus.value === 'finished')
            return;
        airCalStatus.value = 'running';
        runAirCal();
    };
    const runAirCal = () => {
        const totalCombinations = 24;
        airCalTimer = setInterval(() => {
            if (airCalStatus.value !== 'running') {
                clearInterval(airCalTimer);
                return;
            }
            airCalProgress.value = Math.min(100, airCalProgress.value + 0.5);
            completedAirCalCombinations.value = Math.floor((airCalProgress.value / 100) * totalCombinations);
            if (airCalProgress.value >= 100) {
                clearInterval(airCalTimer);
                airCalStatus.value = 'finished';
                completedAirCalCombinations.value = totalCombinations;
            }
        }, 100);
    };
    const pauseAirCal = () => {
        if (airCalStatus.value === 'running') {
            airCalStatus.value = 'paused';
            clearInterval(airCalTimer);
        }
    };
    const resumeAirCal = () => {
        if (airCalStatus.value === 'paused') {
            airCalStatus.value = 'running';
            runAirCal();
        }
    };
    const failAirCal = () => {
        airCalStatus.value = 'error';
        clearInterval(airCalTimer);
    };
    const resetAirCal = () => {
        airCalStatus.value = 'idle';
        airCalProgress.value = 0;
        completedAirCalCombinations.value = 0;
        clearInterval(airCalTimer);
    };
    const clearAirCalRecords = () => {
        resetAirCal();
    };
    const moveGantry = (pos) => {
        isMoving.value = true;
        setTimeout(() => {
            gantryPosition.value = pos;
            isMoving.value = false;
        }, 500);
    };
    const startScan = () => {
        if (eStopActive.value)
            return;
        scanStatus.value = 'scanning';
        exposureActive.value = true;
        currentSlice.value = 0;
        const interval = setInterval(() => {
            if (scanStatus.value !== 'scanning') {
                clearInterval(interval);
                exposureActive.value = false;
                return;
            }
            currentSlice.value += 1;
            if (currentSlice.value >= totalSlices.value) {
                clearInterval(interval);
                scanStatus.value = 'idle';
                exposureActive.value = false;
            }
        }, 50);
    };
    return {
        laserOn, eStopActive,
        warmUpStatus, warmUpProgress, currentHeatCapacity, targetHeatCapacity,
        airCalStatus, airCalProgress, airCalParams, completedAirCalCombinations,
        gantryPosition, tableVertical, tableHorizontal, isMoving,
        scanStatus, currentSlice, totalSlices, exposureActive,
        toggleLaser, triggerEStop, resetEStop,
        startWarmUp, pauseWarmUp, resumeWarmUp, failWarmUp, resetWarmUp,
        startAirCal, pauseAirCal, resumeAirCal, failAirCal, resetAirCal, clearAirCalRecords,
        moveGantry, startScan
    };
}, {
    persist: true
});
//# sourceMappingURL=simulator.js.map