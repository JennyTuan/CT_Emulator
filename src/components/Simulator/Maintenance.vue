<script setup lang="ts">
import { Card, Button, List, Badge, Tabs } from 'ant-design-vue';
import { Wrench, Clock } from 'lucide-vue-next';
import { useSimulatorStore } from '../../store/simulator';
import { ref } from 'vue';
import TubeWarmup from './TubeWarmup.vue';
import AirCalibration from './AirCalibration.vue';

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
  <Card class="maintenance-card" :bordered="false">
    <template #title>
      <div class="card-title-container">
        <Wrench :size="20" />
        <span>MAINTENANCE & CALIBRATION</span>
      </div>
    </template>

    <div class="maintenance-content">
      <div class="workflow-section">
        <Tabs v-model:activeKey="activeKey" class="custom-tabs">
          <Tabs.TabPane key="warmup" tab="球管预热">
            <TubeWarmup />
          </Tabs.TabPane>
          <Tabs.TabPane key="aircal" tab="空气校正">
            <AirCalibration />
          </Tabs.TabPane>
        </Tabs>
      </div>

      <div class="tasks-section">
        <h4 class="section-subtitle">SUBSYSTEM HEALTH</h4>
        <List :dataSource="maintenanceTasks" size="small">
          <template #renderItem="{ item }">
            <List.Item class="task-item">
              <div class="task-main">
                <Badge :status="item.status" />
                <span class="task-title">{{ item.title }}</span>
              </div>
              <div class="task-meta">
                <Clock :size="12" />
                <span>{{ item.lastRun }}</span>
                <Button type="link" size="small">RUN</Button>
              </div>
            </List.Item>
          </template>
        </List>
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
  </Card>
</template>

<style scoped>
.maintenance-card {
  background: #001529 !important;
  color: #fff;
}

:deep(.ant-card-body) {
  padding: 0 24px 24px 24px;
}

.card-title-container {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #1890ff;
}

.maintenance-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1.2fr;
  gap: 32px;
}

.custom-tabs {
  background: transparent;
  border-radius: 8px;
  overflow: hidden;
  height: 480px;
}

:deep(.ant-tabs-nav) {
  margin: 0 !important;
  padding: 0 16px;
  background: rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

:deep(.ant-tabs-tab) {
  padding: 12px 16px !important;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.45) !important;
}

:deep(.ant-tabs-tab-active) {
  color: #1890ff !important;
}

:deep(.ant-tabs-ink-bar) {
  background: #1890ff !important;
}

.section-subtitle {
  font-size: 0.75rem;
  color: rgba(255,255,255,0.45);
  margin-top: 16px;
  margin-bottom: 16px;
  letter-spacing: 1px;
}

.task-item {
  border-bottom: 1px solid rgba(255,255,255,0.05) !important;
  padding: 8px 0 !important;
}

.task-main {
  display: flex;
  align-items: center;
  gap: 12px;
}

.task-title {
  font-size: 0.85rem;
}

.task-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.75rem;
  color: rgba(255,255,255,0.45);
}

.log-viewport {
  background: rgba(0,0,0,0.5);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 4px;
  padding: 12px;
  height: 430px;
  overflow-y: auto;
  font-family: 'Consolas', monospace;
  font-size: 0.75rem;
}

.log-entry {
  margin-bottom: 4px;
  border-left: 2px solid transparent;
  padding-left: 8px;
}

.log-entry.info { color: #888; border-left-color: #1890ff; }
.log-entry.warn { color: #faad14; border-left-color: #faad14; }
.log-entry.error { color: #f5222d; border-left-color: #f5222d; background: rgba(245, 34, 45, 0.05); }
</style>
