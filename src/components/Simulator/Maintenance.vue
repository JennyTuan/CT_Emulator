<script setup lang="ts">
import { ref } from 'vue'
import { useSimulatorStore } from '../../store/simulator'
import AirCalibration from './AirCalibration.vue'
import DailyQA from './DailyQA.vue'
import TubeWarmup from './TubeWarmup.vue'

const store = useSimulatorStore()
const activeTab = ref('warmup')

const maintenanceTasks = Object.freeze([
  { title: 'System Calibration', status: 'success', lastRun: '2 hours ago' },
  { title: 'Tube Heat Load Check', status: 'warning', lastRun: '2 days ago' },
  { title: 'Detector Alignment', status: 'default', lastRun: '1 week ago' },
  { title: 'Gantry Balance Test', status: 'success', lastRun: '24 hours ago' },
])

const statusClass = (status: string) =>
  status === 'success' ? 'success' : status === 'warning' ? 'warning' : 'grey'
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
          <v-tabs v-model="activeTab" color="primary" class="custom-tabs-nav mb-4">
            <v-tab value="warmup">球管预热</v-tab>
            <v-tab value="aircal">空气校正</v-tab>
            <v-tab value="dailyqa">日常QA</v-tab>
          </v-tabs>
          
          <v-tabs-window v-model="activeTab" class="custom-tabs-content">
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
            <v-list-item v-for="item in maintenanceTasks" :key="item.title" class="task-item px-0">
              <template v-slot:prepend>
                <div class="dot mr-2" :class="statusClass(item.status)"></div>
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
          <div class="logs-header">
            <h4 class="section-subtitle">SYSTEM LOGS (REAL-TIME)</h4>
            <v-btn
              size="x-small"
              variant="tonal"
              prepend-icon="mdi-trash-can-outline"
              @click="store.clearLogs()"
            >
              清空
            </v-btn>
          </div>
          <div class="log-viewport">
            <div v-if="store.logs.length === 0" class="log-empty">暂无日志</div>
            <div
              v-for="entry in store.logs"
              :key="entry.id"
              class="log-entry"
              :class="entry.level"
            >
              [{{ entry.time }}] {{ entry.message }}
            </div>
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

.logs-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
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
.log-entry.success { color: rgb(var(--v-theme-success)); border-left-color: rgb(var(--v-theme-success)); }

.log-empty {
  opacity: 0.5;
}

@media (max-width: 1200px) {
  .maintenance-content {
    flex-direction: column;
  }
}
</style>
