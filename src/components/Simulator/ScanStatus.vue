<script setup lang="ts">
import { useSimulatorStore } from '../../store/simulator';
import { computed } from 'vue';

const store = useSimulatorStore();

const progressPercent = computed(() => {
  if (!store.totalSlices) return 0;
  return Math.round((store.currentSlice / store.totalSlices) * 100);
});

const scanStatusColor = computed(() => {
  const status = store.scanStatus || 'idle';
  switch (status) {
    case 'scanning': return 'success';
    case 'error': return 'error';
    case 'ready': return 'primary';
    default: return 'grey';
  }
});

const handleStart = () => {
  console.log('Start Clicked');
  store.prepareScan();
}

const historyData = [
  { key: '1', time: '10:45:12', protocol: 'Chest Routine', patientId: 'PID-2024-001', dose: '12.4 mGy', status: 'Completed' },
  { key: '2', time: '10:30:45', protocol: 'Head Non-Contrast', patientId: 'PID-2024-002', dose: '45.2 mGy', status: 'Completed' },
  { key: '3', time: '10:15:22', protocol: 'Abdomen/Pelvis', patientId: 'PID-2024-003', dose: '18.1 mGy', status: 'Cancelled' },
];
</script>

<template>
  <v-card class="scan-card mb-4" variant="flat">
    <v-card-title class="card-title-container pa-4">
      <v-icon color="primary" class="mr-2">mdi-barcode-scan</v-icon>
      <span>SCAN STATE MACHINE</span>
      <v-spacer></v-spacer>
      <v-btn size="x-small" color="error" variant="text" @click="store.resetSystem">FORCE RESET SYSTEM</v-btn>
    </v-card-title>
    
    <v-card-text class="pa-4">
      <div class="scan-main">
          <div class="scan-visualizer" :class="{ 'is-scanning': store.exposureActive, 'is-reconstructing': store.scanPhase === 'reconstructing' }">
          <div class="exposure-indicator" v-if="store.exposureActive">
            EXPOSURE ACTIVE
          </div>
          <div class="recon-indicator" v-if="store.scanPhase === 'reconstructing'">
            RECONSTRUCTING...
          </div>
          <div class="finish-indicator" v-if="store.scanPhase === 'finishing'">
            FINISHING...
          </div>
          <div class="slice-counter">
            <span class="current">{{ store.currentSlice }}</span>
            <span class="separator">/</span>
            <span class="total">{{ store.totalSlices }} SLICES</span>
          </div>
          <v-progress-circular
            :model-value="progressPercent"
            :color="scanStatusColor"
            :size="180"
            :width="12"
          >
            <span class="progress-percent">{{ progressPercent }}%</span>
          </v-progress-circular>
        </div>

        <div class="scan-controls">
          <v-alert
            variant="tonal"
            :color="scanStatusColor"
            class="status-banner mb-6"
            density="compact"
          >
            <div class="d-flex align-center justify-space-between">
              <div class="d-flex align-center">
                <span class="label mr-3">CURRENT STATE:</span>
                <span class="value">{{ (store.scanStatus || 'idle').toUpperCase() }}</span>
              </div>
              <v-chip v-if="store.scanPhase && store.scanPhase !== 'idle'" size="small" :color="scanStatusColor" variant="flat">
                PHASE: {{ store.scanPhase.toUpperCase() }}
              </v-chip>
            </div>
          </v-alert>

          <!-- Row 1: Sequential Process Buttons -->
          <div class="action-buttons mb-3 d-flex gap-2">
            <!-- 1. START SCAN (PREPARE) -->
            <v-btn 
              color="primary" 
              size="large" 
              :disabled="(store.scanPhase !== 'idle' && store.scanPhase !== 'error' && !!store.scanPhase) && !store.eStopActive"
              @click="handleStart"
              prepend-icon="mdi-play-circle-outline"
              class="flex-grow-1"
            >
              {{ store.scanPhase === 'error' ? 'RESTART' : 'START SCAN' }}
            </v-btn>

            <!-- 2. ENABLE -->
            <v-btn 
              color="indigo" 
              size="large" 
              :disabled="store.scanPhase !== 'prepared' || store.eStopActive"
              @click="store.enableScan"
              :loading="store.scanPhase === 'enabling'"
              prepend-icon="mdi-power-plug"
              class="flex-grow-1"
            >
              使 能 (ENABLE)
            </v-btn>

            <!-- 3. EXPOSURE -->
            <v-btn 
              color="deep-orange" 
              size="large" 
              :disabled="store.scanPhase !== 'enabled' || store.eStopActive"
              @click="store.startExposure"
              :loading="store.scanPhase === 'exposing'"
              prepend-icon="mdi-ray-start"
              class="flex-grow-1"
            >
              曝 光 (EXPOSURE)
            </v-btn>

            <!-- 4. RECONSTRUCTION -->
            <v-btn 
              color="teal" 
              size="large" 
              :disabled="store.scanPhase !== 'exposed' || store.eStopActive"
              @click="store.startRecon"
              :loading="store.scanPhase === 'reconstructing'"
              prepend-icon="mdi-image-filter-hdr"
              class="flex-grow-1"
            >
              出 图 (RECON)
            </v-btn>
          </div>

          <!-- Row 2: Safety -->
          <div class="action-buttons mb-6 d-flex gap-2">
            <v-menu location="top">
              <template v-slot:activator="{ props }">
                <v-btn
                  color="warning"
                  variant="tonal"
                  size="large"
                  prepend-icon="mdi-bug"
                  v-bind="props"
                  :disabled="!store.scanPhase || store.scanPhase === 'idle' || store.scanPhase === 'error'"
                  class="flex-grow-1"
                >
                  故障模拟 (FAULT SIM)
                </v-btn>
              </template>
              <v-list density="compact">
                <v-list-item @click="store.failScan">
                  <template v-slot:prepend><v-icon color="error">mdi-flash-off</v-icon></template>
                  <v-list-item-title>模拟硬件链路故障</v-list-item-title>
                </v-list-item>
                <v-list-item @click="store.failScan">
                  <template v-slot:prepend><v-icon color="error">mdi-rays-close</v-icon></template>
                  <v-list-item-title>模拟射线发生器报警</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>

            <v-btn 
              color="error" 
              size="large" 
              @click="store.triggerEStop"
              prepend-icon="mdi-stop"
              class="flex-grow-1"
            >
              STOP / E-STOP
            </v-btn>
          </div>

        </div>
      </div>

      <div class="scan-history mt-6">
        <h4 class="history-title mb-3">RECENT ACTIVITY</h4>
        <v-table density="compact" class="history-table">
          <thead>
            <tr>
              <th class="text-left">Time</th>
              <th class="text-left">Protocol</th>
              <th class="text-left">Patient ID</th>
              <th class="text-left">Dose (CTDIvol)</th>
              <th class="text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in historyData" :key="item.key">
              <td>{{ item.time }}</td>
              <td>{{ item.protocol }}</td>
              <td><code class="pid-code">{{ item.patientId }}</code></td>
              <td>{{ item.dose }}</td>
              <td>
                <v-chip
                  size="x-small"
                  :color="item.status === 'Completed' ? 'success' : 'error'"
                  variant="flat"
                >
                  {{ item.status }}
                </v-chip>
              </td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.scan-card {
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}

.card-title-container {
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: bold;
}

.scan-main {
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
}

.scan-visualizer {
  flex: 0 0 240px;
  height: 240px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(var(--v-theme-on-surface), 0.05);
  border-radius: 50%;
  border: 4px solid rgba(var(--v-theme-on-surface), 0.1);
  transition: all 0.5s;
}

.scan-visualizer.is-scanning {
  border-color: rgb(var(--v-theme-success));
  box-shadow: 0 0 30px rgba(var(--v-theme-success), 0.2);
  animation: pulse-green 2s infinite;
}

.exposure-indicator, .recon-indicator, .finish-indicator {
  position: absolute;
  top: -10px;
  color: #fff;
  font-size: 0.65rem;
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: bold;
  z-index: 1;
}

.exposure-indicator {
  background: rgb(var(--v-theme-error));
}

.recon-indicator {
  background: rgb(var(--v-theme-primary));
  animation: pulse-blue 1.5s infinite;
}

.finish-indicator {
  background: rgb(var(--v-theme-success));
}

.scan-visualizer.is-reconstructing {
  border-color: rgb(var(--v-theme-primary));
  box-shadow: 0 0 20px rgba(var(--v-theme-primary), 0.2);
}

@keyframes pulse-blue {
  0% { box-shadow: 0 0 0 0 rgba(var(--v-theme-primary), 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(var(--v-theme-primary), 0); }
  100% { box-shadow: 0 0 0 0 rgba(var(--v-theme-primary), 0); }
}

.slice-counter {
  position: absolute;
  bottom: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
}

.slice-counter .current {
  font-size: 2rem;
  font-weight: bold;
  line-height: 1;
}

.slice-counter .separator {
  opacity: 0.2;
}

.slice-counter .total {
  font-size: 0.7rem;
  opacity: 0.5;
}

.progress-percent {
  font-size: 1.5rem;
  font-weight: 300;
}

.scan-controls {
  flex: 1;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.status-banner .label {
  font-size: 0.8rem;
  opacity: 0.6;
}

.status-banner .value {
  font-size: 1.2rem;
  font-weight: bold;
  letter-spacing: 1px;
}

.action-buttons {
  display: flex;
  gap: 12px;
}

.pid-code {
  background: rgba(var(--v-theme-on-surface), 0.05);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Consolas', monospace;
  font-size: 0.8rem;
  color: rgb(var(--v-theme-primary));
}

@keyframes pulse-green {
  0% { box-shadow: 0 0 0 0 rgba(var(--v-theme-success), 0.4); }
  70% { box-shadow: 0 0 0 20px rgba(var(--v-theme-success), 0); }
  100% { box-shadow: 0 0 0 0 rgba(var(--v-theme-success), 0); }
}
</style>
