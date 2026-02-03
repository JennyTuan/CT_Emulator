<script setup lang="ts">
import { useSimulatorStore } from '../../store/simulator';
import { ref } from 'vue';
import TubeWarmup from './TubeWarmup.vue';
import AirCalibration from './AirCalibration.vue';
import DailyQA from './DailyQA.vue';

const store = useSimulatorStore();
const activeKey = ref('warmup');

const maintenanceTasks = [
  { title: 'System Calibration', status: 'success', lastRun: '2 hours ago' },
  { title: 'Tube Heat Load Check', status: 'warning', lastRun: '2 days ago' },
  { title: 'Detector Alignment', status: 'default', lastRun: '1 week ago' },
  { title: 'Gantry Balance Test', status: 'success', lastRun: '24 hours ago' },
];
</script>

<template>
  <v-card class="maintenance-card" variant="flat">
    <v-card-title class="card-title-container pa-4">
      <v-icon color="primary" class="mr-2">mdi-wrench</v-icon>
      <span>MAINTENANCE & CALIBRATION</span>
    </v-card-title>

    <v-card-text class="pa-4">
      <div class="maintenance-content">
        <div class="workflow-section">
          <v-tabs v-model="activeKey" color="primary" class="custom-tabs-nav mb-4">
            <v-tab value="warmup">球管预热</v-tab>
            <v-tab value="aircal">空气校正</v-tab>
            <v-tab value="dailyqa">日常QA</v-tab>
          </v-tabs>
          
          <v-tabs-window v-model="activeKey" class="custom-tabs-content">
            <v-tabs-window-item value="warmup">
              <TubeWarmup />
            </v-tabs-window-item>
            <v-tabs-window-item value="aircal">
              <AirCalibration />
            </v-tabs-window-item>
            <v-tabs-window-item value="dailyqa">
              <DailyQA />
            </v-tabs-window-item>
          </v-tabs-window>
        </div>

        <div class="tasks-section">
          <h4 class="section-subtitle">SUBSYSTEM HEALTH</h4>
          <v-list density="compact" class="transparent">
            <v-list-item v-for="(item, index) in maintenanceTasks" :key="index" class="task-item px-0">
              <template v-slot:prepend>
                <div class="dot mr-2" :class="item.status === 'success' ? 'success' : (item.status === 'warning' ? 'warning' : 'grey')"></div>
              </template>
              <v-list-item-title class="task-title">{{ item.title }}</v-list-item-title>
              <template v-slot:append>
                <div class="task-meta d-flex align-center">
                  <v-icon size="x-small" class="mr-1">mdi-clock-outline</v-icon>
                  <span class="mr-2">{{ item.lastRun }}</span>
                  <v-btn variant="text" size="x-small" color="primary">RUN</v-btn>
                </div>
              </template>
            </v-list-item>
          </v-list>
        </div>

        <div class="logs-section">
          <h4 class="section-subtitle">SYSTEM LOGS (REAL-TIME)</h4>
          <div class="log-viewport">
            <div class="log-entry info">[10:45:12] Scan sequence 'CHEST_01' initiated.</div>
            <div class="log-entry info">[10:46:05] Exposure completed. Dose: 12.4mGy.</div>
            <div class="log-entry warn">[11:01:28] Tube temperature approaching threshold (75°C).</div>
            <div class="log-entry info">[11:02:15] Motion controller heartbeat OK.</div>
            <div class="log-entry error" v-if="store.eStopActive">[11:03:00] FATAL: Communication lost with Gantry PLC.</div>
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.maintenance-card {
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}

.card-title-container {
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: bold;
}

.maintenance-content {
  display: flex;
  gap: 32px;
}

.workflow-section {
  flex: 2;
  min-width: 0;
}

.tasks-section {
  flex: 1;
  min-width: 0;
}

.logs-section {
  flex: 1.2;
  min-width: 0;
}

.custom-tabs-nav {
  border-bottom: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}

.custom-tabs-content {
  height: 400px;
  overflow-y: auto;
}

.section-subtitle {
  font-size: 0.75rem;
  opacity: 0.5;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.task-item {
  border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.05);
}

.task-title {
  font-size: 0.85rem;
}

.task-meta {
  font-size: 0.7rem;
  opacity: 0.5;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.dot.success { background-color: rgb(var(--v-theme-success)); }
.dot.warning { background-color: rgb(var(--v-theme-warning)); }
.dot.grey { background-color: #666; }

.log-viewport {
  background: rgba(var(--v-theme-on-surface), 0.05);
  border: 1px solid rgba(var(--v-theme-on-surface), 0.1);
  border-radius: 4px;
  padding: 12px;
  height: 400px;
  overflow-y: auto;
  font-family: 'Consolas', monospace;
  font-size: 0.75rem;
}

.log-entry {
  margin-bottom: 4px;
  border-left: 2px solid transparent;
  padding-left: 8px;
}

.log-entry.info { opacity: 0.6; border-left-color: rgb(var(--v-theme-primary)); }
.log-entry.warn { color: rgb(var(--v-theme-warning)); border-left-color: rgb(var(--v-theme-warning)); }
.log-entry.error { color: rgb(var(--v-theme-error)); border-left-color: rgb(var(--v-theme-error)); background: rgba(var(--v-theme-error), 0.05); }

@media (max-width: 1200px) {
  .maintenance-content {
    flex-direction: column;
  }
}
</style>
