<script setup lang="ts">
import { useSimulatorStore } from '../../store/simulator'
import { computed } from 'vue'

const store = useSimulatorStore()

const heatCapacityPercent = computed(() => {
  if (!store.targetHeatCapacity) return 0
  return Math.round((store.currentHeatCapacity / store.targetHeatCapacity) * 100)
})
</script>

<template>
  <div class="global-status-container d-flex align-center gap-4">
    
    <!-- Status Mini Cards -->
    <div class="status-mini-group d-flex align-center gap-2">
      <!-- Laser -->
      <div class="mini-card" :class="{ 'active': store.laserOn }" @click="store.toggleLaser">
        <v-marker v-if="store.laserOn" color="warning" size="4" style="position: absolute; top: 4px; right: 4px;"></v-marker>
        <v-icon size="small" :color="store.laserOn ? 'warning' : 'grey'">mdi-laser-pointer</v-icon>
        <div class="mini-content">
          <span class="label">LASER</span>
          <span class="value">{{ store.laserOn ? 'ON' : 'OFF' }}</span>
        </div>
      </div>

      <!-- Tube Heat -->
      <div class="mini-card">
        <v-icon size="small" color="primary">mdi-thermometer-lines</v-icon>
        <div class="mini-content">
          <span class="label">HEAT</span>
          <span class="value">{{ heatCapacityPercent }}%</span>
        </div>
        <v-progress-linear
          :model-value="heatCapacityPercent"
          color="primary"
          height="2"
          absolute
          location="bottom"
        ></v-progress-linear>
      </div>

      <!-- Gantry -->
      <div class="mini-card">
        <v-icon size="small" color="secondary">mdi-rotate-orbit</v-icon>
        <div class="mini-content">
          <span class="label">TILT</span>
          <span class="value">{{ store.gantryPosition.toFixed(1) }}°</span>
        </div>
      </div>

      <!-- Table -->
      <div class="mini-card">
        <v-icon size="small" color="info">mdi-human-bed</v-icon>
        <div class="mini-content">
          <span class="label">BED</span>
          <span class="value">{{ store.tableHorizontal.toFixed(0) }}mm</span>
        </div>
      </div>

      <!-- Exposure -->
      <div class="mini-card" :class="{ 'exposure-active': store.exposureActive }">
        <v-icon size="small" :color="store.exposureActive ? 'error' : 'grey'">mdi-radioactive</v-icon>
        <div class="mini-content">
          <span class="label">X-RAY</span>
          <span class="value">{{ store.exposureActive ? 'ACTIVE' : 'IDLE' }}</span>
        </div>
      </div>
    </div>

    <v-divider vertical class="mx-2" style="height: 24px"></v-divider>

    <!-- Safety Status -->
    <div class="safety-indicator d-flex align-center gap-2 px-2">
      <div class="dot-pulse" :class="store.eStopActive ? 'error' : 'success'"></div>
      <span class="text-caption font-weight-bold opacity-70">SAFETY:</span>
      <span class="text-caption font-weight-black" :class="store.eStopActive ? 'text-error' : 'text-success'">
        {{ store.eStopActive ? 'E-STOP' : 'OK' }}
      </span>
    </div>

  </div>
</template>

<style scoped>
.global-status-container {
  height: 48px;
}

.status-mini-group {
  background: rgba(var(--v-theme-on-surface), 0.03);
  padding: 4px;
  border-radius: 8px;
  border: 1px solid rgba(var(--v-theme-on-surface), 0.05);
}

.mini-card {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 10px;
  border-radius: 6px;
  transition: all 0.2s;
  min-width: 80px;
  position: relative;
  overflow: hidden;
}

.mini-card:not(.exposure-active):not(.active) {
  background: rgba(var(--v-theme-on-surface), 0.02);
}

.mini-card.active {
  background: rgba(var(--v-theme-warning), 0.1);
  border: 1px solid rgba(var(--v-theme-warning), 0.2);
}

.mini-card.exposure-active {
  background: rgba(var(--v-theme-error), 0.1);
  border: 1px solid rgba(var(--v-theme-error), 0.3);
  animation: bg-pulse-error 2s infinite;
}

.mini-card.active, .mini-card:hover {
  cursor: pointer;
}

.mini-content {
  display: flex;
  flex-direction: column;
  line-height: 1;
}

.mini-content .label {
  font-size: 0.6rem;
  opacity: 0.5;
  font-weight: bold;
  letter-spacing: 0.5px;
}

.mini-content .value {
  font-size: 0.8rem;
  font-weight: 800;
}

.dot-pulse {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.dot-pulse.success { background: rgb(var(--v-theme-success)); box-shadow: 0 0 8px rgba(var(--v-theme-success), 0.5); }
.dot-pulse.error { background: rgb(var(--v-theme-error)); box-shadow: 0 0 8px rgba(var(--v-theme-error), 0.5); animation: pulse-error 1s infinite; }

@keyframes pulse-error {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.3); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes bg-pulse-error {
  0% { background: rgba(var(--v-theme-error), 0.05); }
  50% { background: rgba(var(--v-theme-error), 0.15); }
  100% { background: rgba(var(--v-theme-error), 0.05); }
}
</style>
