<script setup lang="ts">
import { computed, ref } from 'vue'
import { useSimulatorStore } from '../../store/simulator'

const store = useSimulatorStore()

const progressPercent = computed(() => {
  if (!store.totalSlices) return 0
  return Math.round((store.currentSlice / store.totalSlices) * 100)
})

const scanStatusColor = computed(() => {
  const status = store.scanStatus || 'idle'
  switch (status) {
    case 'scanning': return 'success'
    case 'error': return 'error'
    case 'ready': return 'primary'
    default: return 'grey'
  }
})

const scanStatusLabel = computed(() =>
  store.scanStatus === 'error' ? 'ALARM / ERROR' : (store.scanStatus || 'idle').toUpperCase()
)
const scanPhaseLabel = computed(() => store.scanPhase.toUpperCase())
const showPhaseChip = computed(() => store.scanPhase !== 'Init')
const isScanning = computed(() => store.exposureActive)
const isFinishing = computed(() => store.scanPhase === 'SendImage')

const handleStart = () => {
  store.prepareScan()
}

const steps = [
  { key: 'Init', label: 'Init' },
  { key: 'ScanRequest', label: 'ScanRequest' },
  { key: 'ScanStart', label: 'ScanStart' },
  { key: 'MoveWait', label: 'MoveWait' },
  { key: 'ScanWait', label: 'ScanWait' },
  { key: 'ExposureStart', label: 'ExposureStart' },
  { key: 'SendImage', label: 'SendImage' }
]

const getStepCompleted = (stepKey: string) => {
  const currentStepIdx = steps.findIndex(s => s.key === store.scanPhase)
  const targetStepIdx = steps.findIndex(s => s.key === stepKey)
  if (currentStepIdx === -1) return false
  return currentStepIdx >= targetStepIdx
}

const historyData = ref([
  { 
    id: '1', 
    time: '10:45:12', 
    protocol: 'Chest Routine', 
    patientId: 'PID-2024-001', 
    patientName: 'ZHANG SAN',
    gender: 'M',
    age: '45Y',
    weight: '75kg',
    dose: '12.4 mGy', 
    status: 'Completed',
    params: { type: '螺旋', kV: '120', mA: '250', rotationTime: '0.5s', collimation: '64x0.6mm', pitch: '0.985', speed: '39.4mm/s', fov: '350mm' },
    reconPlans: [ { name: '软组织窗', thickness: '5.0mm', interval: '5.0mm', kernel: 'Standard', ww: '400', wl: '40' }, { name: '骨窗', thickness: '1.25mm', interval: '1.25mm', kernel: 'Bone', ww: '1500', wl: '450' } ]
  },
  { 
    id: '2', 
    time: '10:30:45', 
    protocol: 'Head Non-Contrast', 
    patientId: 'PID-2024-002', 
    patientName: 'LI SI',
    gender: 'F',
    age: '62Y',
    weight: '58kg',
    dose: '45.2 mGy', 
    status: 'Completed',
    params: { type: '断层', kV: '120', mA: '300', rotationTime: '1.0s', collimation: '24x1.2mm', increment: '5.0mm', count: '24', fov: '220mm' },
    reconPlans: [ { name: '软组织窗', thickness: '5.0mm', interval: '5.0mm', kernel: 'Brain', ww: '80', wl: '40' }, { name: '骨窗', thickness: '1.0mm', interval: '1.0mm', kernel: 'Sharp', ww: '2000', wl: '500' } ]
  },
  { 
    id: '3', 
    time: '10:15:22', 
    protocol: 'Abdomen/Pelvis', 
    patientId: 'PID-2024-003', 
    patientName: 'WANG WU',
    gender: 'M',
    age: '30Y',
    weight: '82kg',
    dose: '18.1 mGy', 
    status: 'Cancelled',
    params: { type: '螺旋', kV: '100', mA: '200', rotationTime: '0.75s', collimation: '32x1.2mm', pitch: '1.2', speed: '25.6mm/s', fov: '400mm' },
    reconPlans: [ { name: '软组织窗', thickness: '5.0mm', interval: '5.0mm', kernel: 'Standard', ww: '400', wl: '40' }, { name: '骨窗', thickness: '2.0mm', interval: '2.0mm', kernel: 'Bone', ww: '1200', wl: '300' } ]
  },
]);

const displayHistory = computed(() => {
  const list = [...historyData.value];
  if (store.patientStatus !== 'idle') {
    const activeIdx = list.findIndex(p => p.id === store.activePatient.id);
    const activeItem = {
      id: store.activePatient.id,
      time: 'NOW',
      protocol: store.activePatient.protocol,
      patientId: store.activePatient.id,
      patientName: store.activePatient.name,
      gender: store.activePatient.gender,
      age: store.activePatient.age,
      weight: store.activePatient.weight,
      dose: '0.0 mGy',
      status: store.patientStatus === 'inProgress' ? 'InProgress' : 'Completed',
      params: { type: '螺旋', kV: '120', mA: '250', rotationTime: '0.5s', collimation: '64x0.6mm', pitch: '0.985', speed: '39.4mm/s', fov: '350mm' },
      reconPlans: [ { name: '软组织窗', thickness: '5.0mm', interval: '5.0mm', kernel: 'Standard', ww: '400', wl: '40' }, { name: '骨窗', thickness: '1.25mm', interval: '1.25mm', kernel: 'Bone', ww: '1500', wl: '450' } ]
    };
    if (activeIdx >= 0) {
      list[activeIdx] = activeItem;
    } else {
      list.unshift(activeItem);
    }
  }
  return list;
});

const selectedId = ref<string>(displayHistory.value[0]?.id ?? '1')
const selectedActivity = computed(() => displayHistory.value.find(item => item.id === selectedId.value))

const faultCategories = [
  {
    title: '1. 流程前置连锁类 (Interlock & Ready)',
    errors: [
      { label: 'Door Open (中途开门)', msg: '请关闭扫描间门 (Interlock Fault)' },
      { label: 'E-Stop Active (物理急停)', msg: '机架/手控盒急停已被按下' },
      { label: 'Tube Cold (球管未预热)', msg: '球管热容量过低，请先执行预热' },
      { label: 'Collision Sensor (防碰撞触发)', msg: '床位防碰撞传感器检测到障碍物' }
    ]
  },
  {
    title: '2. 执行与放射安全类 (Execution & Radiation)',
    errors: [
      { label: 'HV Generator Fault (高压发生器故障)', msg: '高压发生器严重击穿 (Critical Hardware Failure)' },
      { label: 'Exposure Timeout (曝光超时)', msg: '曝光反馈信号丢失 (Feedback Timeout)' },
      { label: 'KVP/mA Out of Range (参数超差)', msg: '实际管电压/电流输出严重偏离设定值' },
      { label: 'Rotation Sync Error (旋转同步错误)', msg: '机架旋转脉冲同步丢失' }
    ]
  },
  {
    title: '3. 激光灯系统 (Laser System)',
    errors: [
      { label: 'Laser Power Failure (激光电源故障)', msg: '激光灯电源模块异常 (Power Module Fault)' },
      { label: 'Laser Alignment Error (激光对准失败)', msg: '激光灯校准数据丢失或偏移' },
      { label: 'Laser Interlock (激光安全联锁)', msg: '激光安全门未关闭或传感器故障' }
    ]
  },
  {
    title: '4. 图像与数据链路类 (Data & Recon)',
    errors: [
      { label: 'Slip-Ring Data Drop (滑环丢包)', msg: '滑环光纤通讯干扰导致View丢失' },
      { label: 'DAS Buffer Overflow (采集缓存溢出)', msg: 'DAS数据流拥塞 (Buffer Overflow)' },
      { label: 'Recon Heartbeat Lost (重建节点断连)', msg: '重建服务器失去心跳' }
    ]
  },
  {
    title: '5. 系统全局与紧急状态 (Systemic)',
    errors: [
      { label: 'Bus Communication Error (总线通讯错误)', msg: 'CAN-Bus/Ethernet总线瘫痪 (Disconnection)' },
      { label: 'Fatal Power Error (系统掉电)', msg: '底层板卡意外掉电，状态重置' }
    ]
  }
];

</script>


<template>
  <v-card class="scan-card mb-4" variant="flat">
    <v-card-title class="card-title-container pa-4">
      <v-icon color="primary" class="mr-2">mdi-scan-helper</v-icon>
      <span class="mr-4">SCAN STATE MACHINE</span>
      
      <div class="auto-scan-chip d-flex align-center ml-2">
        <v-chip
          size="small"
          :color="store.autoScan ? 'success' : 'grey-lighten-1'"
          variant="tonal"
          class="font-weight-black pr-1"
        >
          <template v-slot:prepend>
            <v-icon size="14" class="mr-1">{{ store.autoScan ? 'mdi-robot' : 'mdi-robot-off' }}</v-icon>
          </template>
          AUTO SCAN
          <v-switch
            v-model="store.autoScan"
            hide-details
            density="compact"
            color="success"
            inset
            class="ml-2 mt-0 custom-mini-switch"
          ></v-switch>
        </v-chip>
      </div>

      <v-spacer></v-spacer>
      <v-btn variant="text" size="x-small" color="error" class="font-weight-bold" @click="store.resetSystem()">FORCE RESET SYSTEM</v-btn>
    </v-card-title>

    <v-card-text class="pa-4 pt-2">
      <div class="scan-container">
        
        <!-- Left: State & Visualizer -->
        <div class="scan-visual-panel">
          <v-alert
            :color="scanStatusColor"
            variant="tonal"
            class="mb-6 state-alert"
            density="compact"
          >
            <div class="d-flex align-center justify-space-between">
              <div class="d-flex align-center">
                <span class="label mr-3">CURRENT STATE:</span>
                <span class="value">{{ scanStatusLabel }}</span>
              </div>
              <v-chip v-if="showPhaseChip" size="small" :color="scanStatusColor" variant="flat">
                PHASE: {{ scanPhaseLabel }}
              </v-chip>
            </div>
            <div v-if="store.errorMessage" class="error-detail-text mt-1 text-uppercase font-weight-bold">
              <v-icon size="small" class="mr-1">mdi-alert-circle</v-icon>
              {{ store.errorMessage }}
            </div>
          </v-alert>

          <div class="scan-main">
            <div class="scan-visualizer" :class="{ 'is-scanning': isScanning }">
              <div class="exposure-indicator" v-if="isScanning">
                EXPOSURE ACTIVE
              </div>
              <div class="finish-indicator" v-if="isFinishing">
                PROCESSING...
              </div>
              
              <!-- Progress Ring -->
              <div class="progress-ring-container">
                <v-progress-circular
                  :model-value="progressPercent"
                  :size="200"
                  :width="12"
                  :color="scanStatusColor"
                  class="pulse-ring"
                >
                  <div class="progress-content">
                    <div class="percent">{{ progressPercent }}%</div>
                    <div class="slices">{{ store.currentSlice }} / {{ store.totalSlices }}</div>
                    <div class="label">SLICES</div>
                  </div>
                </v-progress-circular>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Controls & Workflow -->
        <div class="scan-controls-panel">
          
          <!-- Technical Workflow Stepper -->
          <div class="technical-workflow mb-6 d-flex justify-space-between align-center px-1 py-4 rounded-lg border">
            <template v-for="(step, index) in steps" :key="step.key">
              <div class="step-column d-flex flex-column align-center" :class="{ 'is-active': store.scanPhase === step.key, 'is-completed': getStepCompleted(step.key) }">
                <div class="step-node mb-2">
                  <v-icon v-if="getStepCompleted(step.key)" size="x-small" color="white">mdi-check</v-icon>
                  <span v-else class="step-index">{{ index + 1 }}</span>
                </div>
                <span class="step-label">{{ step.label }}</span>
              </div>
              <div v-if="index < steps.length - 1" class="step-connector"></div>
            </template>
          </div>

          <!-- Sequential Process Buttons -->
          <div class="action-buttons mb-3 d-flex gap-2">
            <!-- 1. START SCAN -->
            <v-btn 
              color="primary" 
              size="large" 
              :disabled="(store.scanPhase !== 'Init' && store.scanPhase !== 'SendImage') || store.eStopActive || store.heartbeatLost"
              @click="handleStart"
              prepend-icon="mdi-play-circle-outline"
              class="flex-grow-1"
            >
              START SCAN
            </v-btn>

            <!-- 2. ENABLE -->
            <v-btn 
              color="indigo" 
              size="large" 
              :disabled="store.scanPhase !== 'ScanRequest' || store.eStopActive || store.heartbeatLost"
              @click="store.enableScan"
              :loading="store.scanPhase === 'ScanStart' || store.scanPhase === 'MoveWait' || store.scanPhase === 'ScanWait' && store.scanStatus === 'ready'"
              prepend-icon="mdi-power-plug"
              class="flex-grow-1"
            >
              使 能 (ENABLE)
            </v-btn>

            <!-- 3. EXPOSURE -->
            <v-btn 
              color="deep-orange" 
              size="large" 
              :disabled="store.scanPhase !== 'ScanWait' || store.eStopActive || store.heartbeatLost"
              @click="store.startExposure()"
              :loading="store.scanPhase === 'ExposureStart'"
              prepend-icon="mdi-ray-start"
              class="flex-grow-1"
            >
              曝 光 (EXPOSURE)
            </v-btn>
          </div>

          <!-- Row 2: Post-Scan & Safety -->
          <div class="action-buttons mb-6 d-flex gap-2">
            <!-- 4. RECONSTRUCTION -->
            <v-btn 
              color="teal" 
              size="large" 
              :disabled="store.scanPhase !== 'SendImage' || store.eStopActive || store.heartbeatLost"
              @click="store.startRecon"
              prepend-icon="mdi-image-filter-hdr"
              class="flex-grow-1"
            >
              出 图 (RECON)
            </v-btn>

            <v-menu location="top" width="350">
              <template v-slot:activator="{ props }">
                <v-btn
                  :color="store.faultSimActive ? 'error' : 'warning'"
                  :variant="store.faultSimActive ? 'elevated' : 'tonal'"
                  size="large"
                  prepend-icon="mdi-bug"
                  v-bind="props"
                  class="flex-grow-1"
                >
                  故障模拟 (FAULT SIM)
                </v-btn>
              </template>
              <v-list density="compact" class="fault-menu-list">
                <template v-for="(cat, idx) in faultCategories" :key="idx">
                  <v-list-subheader class="font-weight-bold text-primary">{{ cat.title }}</v-list-subheader>
                  <v-list-item v-for="err in cat.errors" :key="err.label" @click="store.failScan(err.msg)">
                    <template v-slot:prepend><v-icon color="error" size="small">mdi-alert-outline</v-icon></template>
                    <v-list-item-title class="text-caption">{{ err.label }}</v-list-item-title>
                  </v-list-item>
                  <v-divider v-if="idx < faultCategories.length - 1"></v-divider>
                </template>
              </v-list>
            </v-menu>

            <v-btn 
              :color="store.eStopActive ? 'success' : 'error'" 
              size="large" 
              @click="store.eStopActive ? store.resetEStop() : store.triggerEStop()"
              :prepend-icon="store.eStopActive ? 'mdi-refresh' : 'mdi-stop'"
              class="flex-grow-1"
            >
              {{ store.eStopActive ? 'RESET / 解除急停' : 'STOP / E-STOP' }}
            </v-btn>
          </div>
        </div>
      </div>

      <div class="scan-history mt-6">
        <div class="d-flex align-center justify-space-between mb-3">
          <h4 class="history-title">最近活动</h4>
          <v-select
            v-model="selectedId"
            :items="displayHistory"
            item-title="patientId"
            item-value="id"
            density="compact"
            variant="outlined"
            label="查阅"
            hide-details
            style="width: 200px"
          >
            <template v-slot:prepend-inner>
              <v-icon size="small">mdi-magnify</v-icon>
            </template>
          </v-select>
        </div>

        <v-table density="compact" class="history-table border rounded">
          <thead>
            <tr>
              <th class="text-left font-weight-bold">Time</th>
              <th class="text-left font-weight-bold">Protocol</th>
              <th class="text-left font-weight-bold">Patient ID</th>
              <th class="text-left font-weight-bold">Dose (CTDIvol)</th>
              <th class="text-left font-weight-bold">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="item in displayHistory" 
              :key="item.id" 
              :class="{ 'active-row': item.id === selectedId }"
              @click="selectedId = item.id"
            >
              <td>{{ item.time }}</td>
              <td>{{ item.protocol }}</td>
              <td class="text-primary font-weight-bold">{{ item.patientId }}</td>
              <td>{{ item.dose }}</td>
              <td>
                <v-chip size="x-small" :color="item.status === 'Completed' ? 'success' : item.status === 'Cancelled' ? 'error' : 'info'" variant="flat">
                  {{ item.status }}
                </v-chip>
              </td>
            </tr>
          </tbody>
        </v-table>

        <v-sheet 
          v-if="selectedActivity" 
          class="history-detail-panel mt-4 pa-4 rounded-lg border-thin" 
          color="on-surface"
          style="--v-activated-opacity: 0.04"
          variant="tonal"
        >
          <div class="d-flex align-center mb-4">
             <v-icon color="primary" class="mr-2">mdi-account-details</v-icon>
             <span class="text-subtitle-2 font-weight-bold">患者基本信息</span>
          </div>
          <div class="d-flex align-center justify-space-between px-2" style="max-width: 100%;">
            <div class="detail-item">
              <div class="detail-label">姓名</div>
              <div class="detail-value text-on-surface">{{ selectedActivity.patientName }}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">性别</div>
              <div class="detail-value text-on-surface">{{ selectedActivity.gender === 'M' ? '男 (Male)' : '女 (Female)' }}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">年龄</div>
              <div class="detail-value text-on-surface">{{ selectedActivity.age }}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">体重</div>
              <div class="detail-value text-on-surface">{{ selectedActivity.weight }}</div>
            </div>
            <div class="detail-item">
              <div class="detail-label">ID</div>
              <div class="detail-value text-primary font-weight-black">{{ selectedActivity.patientId }}</div>
            </div>
          </div>
          
          <v-divider class="my-4 op-10"></v-divider>
          
          <div class="d-flex align-center mb-4">
             <v-icon color="secondary" class="mr-2">mdi-playlist-edit</v-icon>
             <span class="text-subtitle-2 font-weight-bold">协议参数详情: {{ selectedActivity.protocol }}</span>
             <v-chip size="x-small" class="ml-2" color="primary" variant="flat">{{ selectedActivity.params.type }}模式</v-chip>
          </div>
          
          <div class="d-flex flex-wrap align-center justify-space-between px-2" style="max-width: 100%;">
            <div v-for="(val, key) in selectedActivity.params" :key="key" class="detail-item" v-show="key !== 'type'">
              <div class="detail-label text-uppercase">{{ key }}</div>
              <div class="detail-value text-on-surface">{{ val }}</div>
            </div>
          </div>

          <v-divider class="my-4 op-10"></v-divider>

          <div class="d-flex align-center mb-4">
             <v-icon color="info" class="mr-2">mdi-layers-outline</v-icon>
             <span class="text-subtitle-2 font-weight-bold">重建方案参数</span>
          </div>

          <div class="d-flex gap-4">
            <v-card v-for="plan in selectedActivity.reconPlans" :key="plan.name" class="recon-plan-mini-card pa-3 border-thin flex-grow-1" flat border>
              <div class="d-flex justify-space-between align-center mb-2">
                <span class="text-caption font-weight-bold text-primary">{{ plan.name }}</span>
                <v-chip size="x-small" variant="tonal" color="success">Standard</v-chip>
              </div>
              <v-row dense>
                <v-col cols="6">
                   <div class="mini-label">层厚: {{ plan.thickness }}</div>
                </v-col>
                <v-col cols="6">
                   <div class="mini-label">间距: {{ plan.interval }}</div>
                </v-col>
                <v-col cols="12">
                   <div class="mini-label">算法: {{ plan.kernel }}</div>
                </v-col>
                <v-col cols="6">
                   <div class="mini-label">窗宽 (WW): {{ plan.ww }}</div>
                </v-col>
                <v-col cols="6">
                   <div class="mini-label">窗位 (WL): {{ plan.wl }}</div>
                </v-col>
              </v-row>
            </v-card>
          </div>
        </v-sheet>
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.scan-card {
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  background: rgba(var(--v-theme-surface), 0.7);
  backdrop-filter: blur(10px);
}

.card-title-container {
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: bold;
}

.scan-container {
  display: flex;
  gap: 24px;
}

.scan-visual-panel {
  flex: 0 0 320px;
}

.scan-controls-panel {
  flex: 1;
  min-width: 0;
}

.state-alert {
  border: 1px solid rgba(var(--v-theme-on-surface), 0.1);
}

.scan-main {
  background: rgba(var(--v-theme-on-surface), 0.03);
  border-radius: 12px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(var(--v-theme-on-surface), 0.05);
}

.scan-visualizer.is-scanning {
  background: radial-gradient(circle, rgba(var(--v-theme-success), 0.1) 0%, transparent 70%);
}

.exposure-indicator {
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgb(var(--v-theme-error));
  color: white;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 1px;
  animation: pulse-flash 1s infinite;
  z-index: 2;
}

.finish-indicator {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgb(var(--v-theme-primary));
  color: white;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 800;
  z-index: 2;
}

.progress-ring-container {
  position: relative;
}

.pulse-ring {
  filter: drop-shadow(0 0 8px rgba(var(--v-theme-primary), 0.3));
}

.scan-visualizer.is-scanning .pulse-ring {
  animation: scan-pulse 2s infinite ease-in-out;
}

.progress-content {
  text-align: center;
  line-height: 1.2;
}

.progress-content .percent {
  font-size: 2.5rem;
  font-weight: 900;
}

.progress-content .slices {
  font-size: 0.8rem;
  opacity: 0.7;
  font-weight: bold;
}

.progress-content .label {
  font-size: 0.6rem;
  letter-spacing: 2px;
  opacity: 0.5;
}

/* Technical Stepper Styles */
.technical-workflow {
  background: rgba(var(--v-theme-on-surface), 0.02);
  border: 1px solid rgba(var(--v-theme-on-surface), 0.08);
}

.step-column {
  flex: 1;
  position: relative;
  z-index: 1;
  transition: all 0.3s;
  opacity: 0.4;
}

.step-column.is-active {
  opacity: 1;
  transform: scale(1.1);
}

.step-column.is-completed {
  opacity: 0.8;
}

.step-node {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  border: 2px solid transparent;
  transition: all 0.3s;
}

.is-completed .step-node {
  background: rgb(var(--v-theme-success));
}

.is-active .step-node {
  background: rgb(var(--v-theme-primary));
  box-shadow: 0 0 10px rgba(var(--v-theme-primary), 0.5);
  border-color: white;
}

.step-index {
  font-size: 0.75rem;
  color: white;
}

.step-label {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: rgba(var(--v-theme-on-surface), 0.7);
}

.is-active .step-label {
  color: rgb(var(--v-theme-primary));
}

.step-connector {
  flex: 1;
  height: 1px;
  background: rgba(var(--v-theme-on-surface), 0.1);
  margin-top: -24px;
}

.is-completed + .step-connector {
  background: rgb(var(--v-theme-success));
}

/* Actions */
.action-buttons {
  display: flex;
  gap: 8px;
}

/* History Styles */
.history-title {
  font-size: 0.9rem;
  font-weight: bold;
  opacity: 0.8;
}

.history-table {
  background: transparent !important;
}

.history-table tr {
  cursor: pointer;
  transition: background 0.2s;
}

.history-table tr:hover {
  background: rgba(var(--v-theme-on-surface), 0.03) !important;
}

.active-row {
  background: rgba(var(--v-theme-primary), 0.08) !important;
}

.history-detail-panel {
  animation: slide-up 0.3s ease-out;
}

.detail-label {
  font-size: 0.65rem;
  opacity: 0.5;
  text-transform: uppercase;
  font-weight: bold;
  margin-bottom: 2px;
}

.detail-item {
  flex-grow: 1;
  min-width: 120px;
}

.detail-value {
  font-size: 0.85rem;
  font-weight: 700;
}

.op-10 { opacity: 0.1; }

.recon-plan-mini-card {
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  transition: transform 0.2s;
}

.mini-label {
  font-size: 0.7rem;
  opacity: 0.7;
}

/* Animations */
@keyframes pulse-flash {
  0% { opacity: 1; }
  50% { opacity: 0.4; }
  100% { opacity: 1; }
}

@keyframes scan-pulse {
  0% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.02); opacity: 1; }
  100% { transform: scale(1); opacity: 0.8; }
}

@keyframes slide-up {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.auto-scan-chip :deep(.v-chip__content) {
  display: flex;
  align-items: center;
}

.custom-mini-switch {
  display: inline-flex;
  height: 20px;
}

.custom-mini-switch :deep(.v-selection-control) {
  min-height: unset;
}

.custom-mini-switch :deep(.v-switch__track) {
  height: 14px;
  width: 28px;
  min-width: 28px;
  opacity: 0.3;
}

.custom-mini-switch :deep(.v-switch__thumb) {
  height: 10px;
  width: 10px;
  transform: translate(0, 0);
}

.custom-mini-switch :deep(.v-selection-control--dirty .v-switch__thumb) {
  transform: translate(14px, 0);
}

.gap-2 { gap: 8px; }
.gap-4 { gap: 16px; }
.gap-6 { gap: 24px; }
</style>
