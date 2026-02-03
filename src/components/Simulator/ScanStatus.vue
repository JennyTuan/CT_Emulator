<script setup lang="ts">
import { useSimulatorStore } from '../../store/simulator';
import { Card, Button, Progress, Table, Tag } from 'ant-design-vue';
import { Play, Square, Pause, AlertCircle, Scan } from 'lucide-vue-next';
import { computed, h } from 'vue';

const store = useSimulatorStore();

const progressPercent = computed(() => {
  return Math.round((store.currentSlice / store.totalSlices) * 100);
});

const scanStatusColor = computed(() => {
  switch (store.scanStatus) {
    case 'scanning': return '#52c41a';
    case 'error': return '#f5222d';
    case 'ready': return '#1890ff';
    default: return '#666';
  }
});

const historyData = [
  { key: '1', time: '10:45:12', protocol: 'Chest Routine', dose: '12.4 mGy', status: 'Completed' },
  { key: '2', time: '10:30:45', protocol: 'Head Non-Contrast', dose: '45.2 mGy', status: 'Completed' },
  { key: '3', time: '10:15:22', protocol: 'Abdomen/Pelvis', dose: '18.1 mGy', status: 'Cancelled' },
];

const columns = [
  { title: 'Time', dataIndex: 'time', key: 'time' },
  { title: 'Protocol', dataIndex: 'protocol', key: 'protocol' },
  { title: 'Dose (CTDIvol)', dataIndex: 'dose', key: 'dose' },
  { title: 'Status', dataIndex: 'status', key: 'status', customRender: ({ text }: any) => {
    let color = text === 'Completed' ? 'green' : 'red';
    return h(Tag, { color: color }, { default: () => text });
  }},
];
</script>

<template>
  <Card class="scan-card" :bordered="false">
    <template #title>
      <div class="card-title-container">
        <Scan :size="20" />
        <span>SCAN STATE MACHINE</span>
      </div>
    </template>
    
    <div class="scan-main">
      <div class="scan-visualizer" :class="{ 'is-scanning': store.exposureActive }">
        <div class="exposure-indicator" v-if="store.exposureActive">
          EXPOSURE ACTIVE
        </div>
        <div class="slice-counter">
          <span class="current">{{ store.currentSlice }}</span>
          <span class="separator">/</span>
          <span class="total">{{ store.totalSlices }} SLICES</span>
        </div>
        <Progress 
          type="circle" 
          :percent="progressPercent" 
          :stroke-color="scanStatusColor"
          :width="180"
          :stroke-width="8"
        >
          <template #format="percent">
            <span class="progress-percent">{{ percent }}%</span>
          </template>
        </Progress>
      </div>

      <div class="scan-controls">
        <div class="status-banner" :style="{ borderLeftColor: scanStatusColor }">
          <span class="label">CURRENT STATE:</span>
          <span class="value">{{ store.scanStatus.toUpperCase() }}</span>
        </div>

        <div class="action-buttons">
          <Button 
            type="primary" 
            size="large" 
            :disabled="store.scanStatus === 'scanning' || store.eStopActive"
            @click="store.startScan"
          >
            <template #icon><Play :size="18" /></template>
            START SCAN
          </Button>
          <Button size="large" :disabled="store.scanStatus !== 'scanning'">
            <template #icon><Pause :size="18" /></template>
            PAUSE
          </Button>
          <Button danger size="large" @click="store.triggerEStop">
            <template #icon><Square :size="18" /></template>
            STOP / E-STOP
          </Button>
        </div>

        <div class="scan-params">
          <div class="param-item">
            <span class="label">KV</span>
            <span class="value">120</span>
          </div>
          <div class="param-item">
            <span class="label">mA</span>
            <span class="value">250</span>
          </div>
          <div class="param-item">
            <span class="label">Pitch</span>
            <span class="value">0.98</span>
          </div>
          <div class="param-item">
            <span class="label">Rot. Time</span>
            <span class="value">0.5s</span>
          </div>
        </div>
      </div>
    </div>

    <div class="scan-history">
      <h4 class="history-title">RECENT ACTIVITY</h4>
      <Table :dataSource="historyData" :columns="columns" size="small" :pagination="false" />
    </div>
  </Card>
</template>

<style scoped>
.scan-card {
  background: #001529 !important;
  color: #fff;
  height: 100%;
}

.card-title-container {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #1890ff;
}

.scan-main {
  display: flex;
  gap: 32px;
  margin-bottom: 32px;
}

.scan-visualizer {
  flex: 0 0 240px;
  height: 240px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,0.3);
  border-radius: 50%;
  border: 4px solid #1f1f1f;
  transition: all 0.5s;
}

.scan-visualizer.is-scanning {
  border-color: #52c41a;
  box-shadow: 0 0 30px rgba(82, 196, 26, 0.2);
  animation: pulse-green 2s infinite;
}

.exposure-indicator {
  position: absolute;
  top: -10px;
  background: #f5222d;
  color: #fff;
  font-size: 0.65rem;
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: bold;
}

.slice-counter {
  position: absolute;
  bottom: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.slice-counter .current {
  font-size: 2rem;
  font-weight: bold;
  line-height: 1;
}

.slice-counter .separator {
  color: rgba(255,255,255,0.2);
}

.slice-counter .total {
  font-size: 0.7rem;
  color: rgba(255,255,255,0.45);
}

.progress-percent {
  font-size: 1.5rem;
  font-weight: 300;
  color: #fff;
}

.scan-controls {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.status-banner {
  background: rgba(255,255,255,0.03);
  border-left: 4px solid #666;
  padding: 12px 20px;
  margin-bottom: 24px;
}

.status-banner .label {
  font-size: 0.8rem;
  color: rgba(255,255,255,0.45);
  margin-right: 12px;
}

.status-banner .value {
  font-size: 1.2rem;
  font-weight: bold;
  letter-spacing: 1px;
}

.action-buttons {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
}

.scan-params {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.param-item {
  background: rgba(255,255,255,0.02);
  padding: 8px;
  border-radius: 4px;
  text-align: center;
}

.param-item .label {
  display: block;
  font-size: 0.7rem;
  color: rgba(255,255,255,0.4);
  margin-bottom: 4px;
}

.param-item .value {
  font-weight: 600;
  font-size: 1.1rem;
}

.history-title {
  font-size: 0.8rem;
  color: rgba(255,255,255,0.45);
  margin-bottom: 12px;
}

:deep(.ant-table) {
  background: transparent !important;
}

:deep(.ant-table-thead > tr > th) {
  background: rgba(255,255,255,0.03) !important;
  color: rgba(255,255,255,0.45) !important;
  border-bottom: 1px solid #1f1f1f !important;
}

:deep(.ant-table-tbody > tr > td) {
  border-bottom: 1px solid #1f1f1f !important;
}

:deep(.ant-table-tbody > tr:hover > td) {
  background: rgba(255,255,255,0.02) !important;
}
</style>
