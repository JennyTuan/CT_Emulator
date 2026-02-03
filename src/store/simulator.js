import { defineStore } from 'pinia';
import { ref } from 'vue';
export const useSimulatorStore = defineStore('simulator', () => {
    // Global States
    const laserOn = ref(false);
    const eStopActive = ref(false);
    const warmUpProgress = ref(0);
    const isWarmingUp = ref(false);
    const currentHeatCapacity = ref(0);
    const targetHeatCapacity = ref(60);
    const airCalProgress = ref(0);
    const isAirCalibrating = ref(false);
    const airCalParams = ref({
        rotationSpeed: [1, 2, 0.75],
        focalSpot: ['small', 'big'],
        voltage: [80, 100, 120, 140],
        collimatorWidth: ['32*0.6']
    });
    const completedAirCalCombinations = ref(0);
    // Motion States
    const gantryPosition = ref(0);
    const tableVertical = ref(0);
    const tableHorizontal = ref(0);
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
    };
    const resetEStop = () => {
        eStopActive.value = false;
        if (scanStatus.value === 'error') {
            scanStatus.value = 'idle';
        }
    };
    const startWarmUp = () => {
        if (isWarmingUp.value)
            return;
        isWarmingUp.value = true;
        // Starting from current heat capacity, but for demo we just progress to 100
        const interval = setInterval(() => {
            warmUpProgress.value += 2;
            currentHeatCapacity.value = Math.min(targetHeatCapacity.value, currentHeatCapacity.value + (targetHeatCapacity.value / 50));
            if (warmUpProgress.value >= 100) {
                clearInterval(interval);
                isWarmingUp.value = false;
                currentHeatCapacity.value = targetHeatCapacity.value;
            }
        }, 100);
    };
    const startAirCal = () => {
        if (isAirCalibrating.value)
            return;
        isAirCalibrating.value = true;
        airCalProgress.value = 0;
        const totalCombinations = 24; // 3 * 2 * 4 * 1
        const interval = setInterval(() => {
            airCalProgress.value += 1;
            completedAirCalCombinations.value = Math.floor((airCalProgress.value / 100) * totalCombinations);
            if (airCalProgress.value >= 100) {
                clearInterval(interval);
                isAirCalibrating.value = false;
                completedAirCalCombinations.value = totalCombinations;
            }
        }, 200);
    };
    const clearAirCalRecords = () => {
        completedAirCalCombinations.value = 0;
        airCalProgress.value = 0;
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
        laserOn, eStopActive, warmUpProgress, isWarmingUp, currentHeatCapacity, targetHeatCapacity,
        airCalProgress, isAirCalibrating, airCalParams, completedAirCalCombinations,
        gantryPosition, tableVertical, tableHorizontal, isMoving,
        scanStatus, currentSlice, totalSlices, exposureActive,
        toggleLaser, triggerEStop, resetEStop, startWarmUp, startAirCal, clearAirCalRecords, moveGantry, startScan
    };
});
//# sourceMappingURL=simulator.js.map