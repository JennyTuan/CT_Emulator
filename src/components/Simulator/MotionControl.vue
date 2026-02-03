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
          <span class="axis-name">SCANNER TRAVEL (Horizontal)</span>
          <span class="axis-value">{{ store.tableHorizontal.toFixed(1) }} mm</span>
        </div>
        <div class="axis-controls">
          <v-btn icon="mdi-chevron-double-left" density="compact" variant="text" size="small" @click="moveStep('h', -10)"></v-btn>
          <v-slider
            v-model="store.tableHorizontal"
            :min="0"
            :max="2000"
            hide-details
            color="primary"
            class="axis-slider mx-2"
          ></v-slider>
          <v-btn icon="mdi-chevron-double-right" density="compact" variant="text" size="small" @click="moveStep('h', 10)"></v-btn>
        </div>
      </div>

      <div class="motion-visualizer mt-4">
        <div class="visualizer-container">
          <!-- Floor -->
          <div class="floor"></div>
          
          <!-- Moving Gantry -->
          <div class="gantry-system" :style="{ 
            left: `${10 + (store.tableHorizontal / 2000) * 180}px`
          }">
            <div class="gantry-side" :style="{ transform: `rotate(${store.gantryPosition}deg)` }">
              <div class="gantry-aperture"></div>
            </div>
            <div class="gantry-rails"></div>
          </div>
          
          <!-- Fixed Table (Vertical only) -->
          <div class="table-system fixed-h" :style="{ 
            bottom: `${20 + (store.tableVertical / 300) * 40}px`
          }">
            <div class="table-bed"></div>
            <div class="table-base"></div>
          </div>
        </div>
        
        <div class="visualizer-label">SCANNER TRAVEL VIEW</div>
      </div>

      <div class="quick-positions pt-4">
        <span class="label mb-2">PRESETS</span>
        <div class="d-flex gap-2">
          <v-btn size="small" variant="outlined" @click="store.tableHorizontal = 0; store.tableVertical = 150">HOME</v-btn>
          <v-btn size="small" variant="outlined" class="mx-2" @click="store.tableHorizontal = 1000; store.tableVertical = 150">SCAN CENTER</v-btn>
          <v-btn size="small" variant="outlined" @click="store.tableHorizontal = 1800">PARK</v-btn>
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
  height: 160px;
  background: rgba(var(--v-theme-on-surface), 0.03);
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(var(--v-theme-on-surface), 0.05);
}

.visualizer-container {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 20px;
}

.floor {
  position: absolute;
  bottom: 20px;
  width: 90%;
  height: 2px;
  background: rgba(var(--v-theme-on-surface), 0.1);
}

.gantry-system {
  position: absolute;
  bottom: 20px;
  width: 60px;
  height: 110px;
  z-index: 2;
  transition: left 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.gantry-side {
  width: 40px;
  height: 100px;
  background: rgba(var(--v-theme-on-surface), 0.1);
  border: 2px solid rgba(var(--v-theme-on-surface), 0.2);
  border-radius: 4px;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: bottom center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gantry-rails {
  height: 4px;
  width: 100%;
  background: rgba(var(--v-theme-on-surface), 0.2);
  margin-top: 2px;
  border-radius: 2px;
}

.table-system {
  position: absolute;
  width: 120px;
  height: 60px;
  z-index: 1;
  transition: bottom 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.table-system.fixed-h {
  right: 40px;
}

.table-bed {
  width: 140px;
  height: 6px;
  background: rgb(var(--v-theme-primary));
  border-radius: 3px;
  position: absolute;
  top: 0;
  right: 0;
  box-shadow: 0 2px 10px rgba(var(--v-theme-primary), 0.3);
}

.table-base {
  width: 40px;
  height: 40px;
  background: rgba(var(--v-theme-on-surface), 0.05);
  border-left: 2px solid rgba(var(--v-theme-on-surface), 0.1);
  position: absolute;
  top: 6px;
  right: 20px;
}

.visualizer-label {
  position: absolute;
  top: 8px;
  left: 8px;
  font-size: 0.6rem;
  letter-spacing: 1px;
  opacity: 0.3;
  font-weight: bold;
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
