<script setup lang="ts">
import { Card, Steps, Button, Progress, List, Badge } from 'ant-design-vue';
import { Wrench, CheckCircle2, AlertTriangle, Clock } from 'lucide-vue-next';
import { useSimulatorStore } from '../../store/simulator';
import { ref, computed } from 'vue';

const store = useSimulatorStore();
const currentStep = ref(1);

const warmUpDescription = computed(() => {
  if (store.isWarmingUp) return `In Progress (${store.warmUpProgress}%)`;
  if (store.warmUpProgress === 100) return 'Completed';
  return 'Pending';
});

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
        <h4 class="section-subtitle">DAILY STARTUP WORKFLOW</h4>
        <Steps :current="currentStep" size="small" class="custom-steps">
          <Steps.Step title="Hardware Init" description="Completed" />
          <Steps.Step title="Tube Warm-up" :description="warmUpDescription" />
          <Steps.Step title="Air Cal" :description="currentStep > 1 ? 'Completed' : 'Pending'" />
          <Steps.Step title="Ready" :description="currentStep === 3 ? 'Ready' : 'Pending'" />
        </Steps>
        <div class="step-actions">
          <Button type="primary" size="small" @click="currentStep++">NEXT STEP</Button>
          <Button size="small" style="margin-left: 8px" @click="currentStep = 0">RESET</Button>
        </div>
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
          <div class="log-entry error" v-if="currentStep === 0">[11:03:00] FATAL: Communication lost with Gantry PLC.</div>
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

.card-title-container {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #1890ff;
}

.maintenance-content {
  display: grid;
  grid-template-columns: 1fr 1fr 1.5fr;
  gap: 32px;
}

.section-subtitle {
  font-size: 0.75rem;
  color: rgba(255,255,255,0.45);
  margin-bottom: 16px;
  letter-spacing: 1px;
}

.custom-steps {
  margin-bottom: 24px;
}

:deep(.ant-steps-item-title) {
  color: rgba(255,255,255,0.85) !important;
  font-size: 0.85rem !important;
}

:deep(.ant-steps-item-description) {
  color: rgba(255,255,255,0.45) !important;
  font-size: 0.75rem !important;
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
  background: rgba(0,0,0,0.3);
  border: 1px solid #1f1f1f;
  border-radius: 4px;
  padding: 12px;
  height: 140px;
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
