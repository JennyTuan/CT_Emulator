<script setup lang="ts">
import { useSimulatorStore } from '../../store/simulator';

const store = useSimulatorStore();

const moveStep = (axis: 'gantry' | 'v' | 'h', amount: number) => {
  if (axis === 'gantry') store.gantryPosition += amount;
  if (axis === 'v') store.tableVertical += amount;
  if (axis === 'h') store.tableHorizontal += amount;
};
</script>

<template>
  <v-card class="motion-card fill-height" variant="flat">
    <v-card-title class="card-title-container pa-4">
      <v-icon color="primary" class="mr-2">mdi-compass-outline</v-icon>
      <span>MOTION CONTROL</span>
    </v-card-title>

    <v-card-text class="pa-4">
      <div class="axis-group">
        <div class="axis-header">
          <span class="axis-name">GANTRY TILT</span>
          <span class="axis-value">{{ store.gantryPosition.toFixed(1) }}°</span>
        </div>
        <div class="axis-controls">
          <v-btn icon="mdi-chevron-left" density="compact" variant="text" size="small" @click="moveStep('gantry', -1)"></v-btn>
          <v-slider
            v-model="store.gantryPosition"
            :min="-30"
            :max="30"
            :step="0.5"
            hide-details
            color="primary"
            class="axis-slider mx-2"
          ></v-slider>
          <v-btn icon="mdi-chevron-right" density="compact" variant="text" size="small" @click="moveStep('gantry', 1)"></v-btn>
        </div>
      </div>

      <div class="axis-group">
        <div class="axis-header">
          <span class="axis-name">TABLE VERTICAL</span>
          <span class="axis-value">{{ store.tableVertical.toFixed(1) }} mm</span>
        </div>
        <div class="axis-controls">
          <v-btn icon="mdi-chevron-down" density="compact" variant="text" size="small" @click="moveStep('v', -5)"></v-btn>
          <v-slider
            v-model="store.tableVertical"
            :min="0"
            :max="300"
            hide-details
            color="primary"
            class="axis-slider mx-2"
          ></v-slider>
          <v-btn icon="mdi-chevron-up" density="compact" variant="text" size="small" @click="moveStep('v', 5)"></v-btn>
        </div>
      </div>

      <div class="axis-group">
        <div class="axis-header">
          <span class="axis-name">TABLE HORIZONTAL</span>
          <span class="axis-value">{{ store.tableHorizontal.toFixed(1) }} mm</span>
        </div>
        <div class="axis-controls">
          <v-btn icon="mdi-chevron-down" density="compact" variant="text" size="small" @click="moveStep('h', -10)"></v-btn>
          <v-slider
            v-model="store.tableHorizontal"
            :min="0"
            :max="2000"
            hide-details
            color="primary"
            class="axis-slider mx-2"
          ></v-slider>
          <v-btn icon="mdi-chevron-up" density="compact" variant="text" size="small" @click="moveStep('h', 10)"></v-btn>
        </div>
      </div>

      <div class="motion-visualizer mt-4">
        <div class="gantry-ring">
          <div class="gantry-tilt-indicator" :style="{ transform: `rotate(${store.gantryPosition}deg)` }"></div>
          <div class="table-v" :style="{ bottom: `${(store.tableVertical / 300) * 100}%` }">
            <div class="table-top"></div>
          </div>
        </div>
      </div>

      <div class="quick-positions pt-4">
        <span class="label mb-2">PRESETS</span>
        <div class="d-flex gap-2">
          <v-btn size="small" variant="outlined" @click="store.tableHorizontal = 0; store.tableVertical = 150">HOME</v-btn>
          <v-btn size="small" variant="outlined" class="mx-2" @click="store.tableHorizontal = 800; store.tableVertical = 150">CENTER</v-btn>
          <v-btn size="small" variant="outlined" @click="store.tableHorizontal = 1800">UNLOAD</v-btn>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.motion-card {
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}

.card-title-container {
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: bold;
}

.axis-group {
  margin-bottom: 20px;
}

.axis-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.axis-name {
  font-size: 0.75rem;
  opacity: 0.6;
}

.axis-value {
  font-family: monospace;
  font-weight: bold;
  color: rgb(var(--v-theme-primary));
}

.axis-controls {
  display: flex;
  align-items: center;
}

.axis-slider {
  flex: 1;
}

.motion-visualizer {
  height: 140px;
  background: rgba(var(--v-theme-on-surface), 0.05);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.gantry-ring {
  width: 100px;
  height: 100px;
  border: 8px solid rgba(var(--v-theme-on-surface), 0.1);
  border-radius: 50%;
  position: relative;
}

.gantry-tilt-indicator {
  position: absolute;
  top: -12px;
  left: 50%;
  width: 4px;
  height: 20px;
  background: rgb(var(--v-theme-primary));
  margin-left: -2px;
  transition: transform 0.3s;
  transform-origin: 50% 62px;
}

.table-v {
  position: absolute;
  width: 60px;
  height: 4px;
  background: rgba(var(--v-theme-on-surface), 0.3);
  left: 50%;
  margin-left: -30px;
  transition: bottom 0.3s;
}

.table-top {
  position: absolute;
  top: -4px;
  width: 100%;
  height: 4px;
  background: rgb(var(--v-theme-primary));
  border-radius: 2px;
}

.quick-positions {
  display: flex;
  flex-direction: column;
}

.quick-positions .label {
  font-size: 0.7rem;
  opacity: 0.4;
}

.gap-2 {
  gap: 8px;
}
</style>
