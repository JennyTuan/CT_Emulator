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
const showPhaseChip = computed(() => store.scanPhase !== 'idle')
const isScanning = computed(() => store.exposureActive)
const isScouting = computed(() => store.scanPhase === 'scouting')
const isReconstructing = computed(() => store.scanPhase === 'reconstructing')
const isFinishing = computed(() => store.scanPhase === 'finishing')

const handleStart = () => {
  store.prepareScan()
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
      <v-icon color="primary" class="mr-2">mdi-barcode-scan</v-icon>
      <span>SCAN STATE MACHINE</span>
      <v-spacer></v-spacer>
      <v-btn size="x-small" color="error" variant="text" @click="store.resetSystem">FORCE RESET SYSTEM</v-btn>
    </v-card-title>
    
    <v-card-text class="pa-4">
      <div class="scan-main">
          <div class="scan-visualizer" :class="{ 'is-scanning': isScanning, 'is-reconstructing': isReconstructing }">
          <div class="exposure-indicator" v-if="isScanning">
            {{ isScouting ? 'SCOUT ACTIVE' : 'EXPOSURE ACTIVE' }}
          </div>
          <div class="recon-indicator" v-if="isReconstructing">
            RECONSTRUCTING...
          </div>
          <div class="finish-indicator" v-if="isFinishing">
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

          <!-- Workflow Confirmation Flow -->
          <div class="workflow-stepper mb-6 d-flex justify-space-between align-center px-2 py-3 rounded-lg border">
            <div class="step-item" :class="{ 'is-completed': store.patientInfoComplete }">
              <v-icon size="small" :color="store.patientInfoComplete ? 'success' : 'grey'">
                {{ store.patientInfoComplete ? 'mdi-check-circle' : 'mdi-account-circle-outline' }}
              </v-icon>
              <span class="step-text ml-2">患者信息</span>
            </div>
            <v-icon size="x-small" color="grey-lighten-1">mdi-chevron-right</v-icon>
            <div class="step-item" :class="{ 'is-completed': store.protocolComplete }">
              <v-icon size="small" :color="store.protocolComplete ? 'success' : 'grey'">
                {{ store.protocolComplete ? 'mdi-check-circle' : 'mdi-playlist-check' }}
              </v-icon>
              <span class="step-text ml-2">参数确认</span>
            </div>
            <v-icon size="x-small" color="grey-lighten-1">mdi-chevron-right</v-icon>
            <div class="step-item" :class="{ 'is-completed': store.scoutComplete }">
              <v-icon size="small" :color="store.scoutComplete ? 'success' : 'grey'">
                {{ store.scoutComplete ? 'mdi-check-circle' : 'mdi-vector-line' }}
              </v-icon>
              <span class="step-text ml-2">定位像</span>
            </div>
            <v-icon size="x-small" color="grey-lighten-1">mdi-chevron-right</v-icon>
            <div class="step-item" :class="{ 'is-completed': store.scanPhase === 'exposed' || store.scanPhase === 'reconstructing' || store.reconComplete }">
              <v-icon size="small" :color="(store.scanPhase === 'exposed' || store.scanPhase === 'reconstructing' || store.reconComplete) ? 'success' : 'grey'">
                {{ (store.scanPhase === 'exposed' || store.scanPhase === 'reconstructing' || store.reconComplete) ? 'mdi-check-circle' : 'mdi-axis-z-arrow' }}
              </v-icon>
              <span class="step-text ml-2">螺旋/断层</span>
            </div>
            <v-icon size="x-small" color="grey-lighten-1">mdi-chevron-right</v-icon>
            <div class="step-item" :class="{ 'is-completed': store.reconComplete }">
              <v-icon size="small" :color="store.reconComplete ? 'success' : 'grey'">
                {{ store.reconComplete ? 'mdi-check-circle' : 'mdi-image-multiple' }}
              </v-icon>
              <span class="step-text ml-2">重建</span>
            </div>
          </div>



          <!-- Row 1: Sequential Process Buttons -->
          <div class="action-buttons mb-3 d-flex gap-2">
            <!-- 1. START SCAN (PREPARE) -->
            <v-btn 
              color="primary" 
              size="large" 
              :disabled="((store.scanPhase !== 'idle' && store.scanPhase !== 'error' && !!store.scanPhase) && !store.eStopActive) || store.heartbeatLost"
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
              :disabled="store.scanPhase !== 'prepared' || store.eStopActive || store.heartbeatLost"
              @click="store.enableScan"
              :loading="store.scanPhase === 'enabling'"
              prepend-icon="mdi-power-plug"
              class="flex-grow-1"
            >
              使 能 (ENABLE)
            </v-btn>

            <!-- 3. EXPOSURE (Handles Scout or Planned Scan) -->
            <v-btn 
              color="deep-orange" 
              size="large" 
              :disabled="(store.scanPhase !== 'enabled' && store.scanPhase !== 'scout_exposed') || store.eStopActive || store.heartbeatLost"
              @click="!store.scoutComplete ? store.startScout() : store.startExposure()"
              :loading="store.scanPhase === 'exposing' || store.scanPhase === 'scouting'"
              prepend-icon="mdi-ray-start"
              class="flex-grow-1"
            >
              {{ !store.scoutComplete ? '曝 光 (SCOUT)' : '曝 光 (EXPOSURE)' }}
            </v-btn>
          </div>

          <!-- Row 2: Post-Scan & Safety -->
          <div class="action-buttons mb-6 d-flex gap-2">
            <!-- 4. RECONSTRUCTION -->
            <v-btn 
              color="teal" 
              size="large" 
              :disabled="(store.scanPhase !== 'exposed' && store.scanPhase !== 'scout_exposed') || store.eStopActive || store.heartbeatLost"
              @click="store.startRecon"
              :loading="store.scanPhase === 'reconstructing'"
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
          <div style="width: 240px">
            <v-combobox
              v-model="selectedId"
              :items="displayHistory"
              item-title="patientId"
              item-value="id"
              density="compact"
              label="查询"
              prepend-inner-icon="mdi-magnify"
              hide-details
              variant="outlined"
              :return-object="false"
              clearable
            >

              <template v-slot:item="{ props, item }">
                <v-list-item v-bind="props" :subtitle="item.raw.protocol"></v-list-item>
              </template>
            </v-combobox>
          </div>
        </div>

        <v-table density="compact" class="history-table mb-4">
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
            <tr 
              v-for="item in displayHistory" 
              :key="item.id"
              :class="{ 'selected-row': selectedId === item.id }"
              @click="selectedId = item.id"
              class="clickable-row"
            >
              <td>{{ item.time }}</td>
              <td>{{ item.protocol }}</td>
              <td><code class="pid-code">{{ item.patientId }}</code></td>
              <td>{{ item.dose }}</td>
              <td>
                <v-chip
                  size="x-small"
                  :color="item.status === 'Completed' ? 'success' : (item.status === 'InProgress' ? 'info' : 'error')"
                  variant="flat"
                  :class="{ 'status-pulsing': item.status === 'InProgress' }"
                >
                  {{ item.status === 'InProgress' ? '进行中' : item.status }}
                </v-chip>
              </td>
            </tr>

          </tbody>
        </v-table>

        <!-- Protocol Details Panel -->
          <v-expand-transition>
            <div v-if="selectedActivity" class="protocol-details-panel pa-4 rounded">
              
              <!-- Patient Info Section -->
              <div class="patient-info-banner mb-6 pa-3 rounded border">
                <div class="d-flex align-center mb-2">
                  <v-icon color="primary" class="mr-2">mdi-account-details</v-icon>
                  <span class="text-subtitle-2 font-weight-bold">患者基本信息</span>
                </div>
                <v-row dense>
                  <v-col cols="3">
                    <div class="info-item">
                      <span class="info-label">姓名:</span>
                      <span class="info-value">{{ selectedActivity.patientName }}</span>
                    </div>
                  </v-col>
                  <v-col cols="3">
                    <div class="info-item">
                      <span class="info-label">性别:</span>
                      <span class="info-value">{{ selectedActivity.gender === 'M' ? '男 (Male)' : '女 (Female)' }}</span>
                    </div>
                  </v-col>
                  <v-col cols="2">
                    <div class="info-item">
                      <span class="info-label">年龄:</span>
                      <span class="info-value">{{ selectedActivity.age }}</span>
                    </div>
                  </v-col>
                  <v-col cols="2">
                    <div class="info-item">
                      <span class="info-label">体重:</span>
                      <span class="info-value">{{ selectedActivity.weight }}</span>
                    </div>
                  </v-col>
                  <v-col cols="2">
                    <div class="info-item text-right">
                      <span class="info-label">ID:</span>
                      <span class="info-value text-caption">{{ selectedActivity.patientId }}</span>
                    </div>
                  </v-col>
                </v-row>
              </div>

              <div class="d-flex align-center mb-3">
                <v-icon color="primary" class="mr-2">mdi-clipboard-text-outline</v-icon>
                <span class="text-subtitle-2 font-weight-bold">协议参数详情: {{ selectedActivity.protocol }}</span>
                <v-chip size="small" color="primary" variant="flat" class="ml-2">{{ selectedActivity.params.type }}模式</v-chip>
              </div>
            
            <v-row dense>
              <v-col cols="3">
                <div class="param-item">
                  <span class="param-label">管电压 (kV)</span>
                  <span class="param-value">{{ selectedActivity.params.kV }}</span>
                </div>
              </v-col>
              <v-col cols="3">
                <div class="param-item">
                  <span class="param-label">管电流 (mA)</span>
                  <span class="param-value">{{ selectedActivity.params.mA }}</span>
                </div>
              </v-col>
              <v-col cols="3">
                <div class="param-item">
                  <span class="param-label">旋转时间</span>
                  <span class="param-value">{{ selectedActivity.params.rotationTime }}</span>
                </div>
              </v-col>
              <v-col cols="3">
                <div class="param-item">
                  <span class="param-label">准直器宽度</span>
                  <span class="param-value">{{ selectedActivity.params.collimation }}</span>
                </div>
              </v-col>
              
              <template v-if="selectedActivity.params.type === '螺旋'">
                <v-col cols="3">
                  <div class="param-item">
                    <span class="param-label">螺旋螺距 (Pitch)</span>
                    <span class="param-value">{{ selectedActivity.params.pitch }}</span>
                  </div>
                </v-col>
                <v-col cols="3">
                  <div class="param-item">
                    <span class="param-label">进床速度</span>
                    <span class="param-value">{{ selectedActivity.params.speed }}</span>
                  </div>
                </v-col>
              </template>
              
              <template v-else>
                <v-col cols="3">
                  <div class="param-item">
                    <span class="param-label">扫描间距</span>
                    <span class="param-value">{{ selectedActivity.params.increment }}</span>
                  </div>
                </v-col>
                <v-col cols="3">
                  <div class="param-item">
                    <span class="param-label">扫描周数</span>
                    <span class="param-value">{{ selectedActivity.params.count }}</span>
                  </div>
                </v-col>
              </template>

              <v-col cols="3">
                <div class="param-item">
                  <span class="param-label">扫描视野 (FOV)</span>
                  <span class="param-value">{{ selectedActivity.params.fov }}</span>
                </div>
              </v-col>
            </v-row>

            <!-- Reconstruction Plans Section -->
            <div class="d-flex align-center mb-3 mt-6">
              <v-icon color="secondary" class="mr-2">mdi-image-edit-outline</v-icon>
              <span class="text-subtitle-2 font-weight-bold">重建方案参数</span>
            </div>
            
            <v-row dense>
              <v-col v-for="plan in selectedActivity.reconPlans" :key="plan.name" cols="6">
                <div class="recon-plan-card pa-3 border rounded">
                  <div class="d-flex align-center justify-space-between mb-2">
                    <span class="plan-name font-weight-bold">{{ plan.name }}</span>
                    <v-chip size="x-small" :color="plan.name === '骨窗' ? 'orange' : 'teal'" variant="tonal">
                      {{ plan.kernel }}
                    </v-chip>
                  </div>
                  <v-row dense>
                    <v-col cols="4"><div class="mini-param"><span class="l">层厚:</span> {{ plan.thickness }}</div></v-col>
                    <v-col cols="4"><div class="mini-param"><span class="l">间距:</span> {{ plan.interval }}</div></v-col>
                    <v-col cols="4"><div class="mini-param"><span class="l">算法:</span> {{ plan.kernel }}</div></v-col>
                    <v-col cols="6"><div class="mini-param"><span class="l">窗宽 (WW):</span> {{ plan.ww }}</div></v-col>
                    <v-col cols="6"><div class="mini-param"><span class="l">窗位 (WL):</span> {{ plan.wl }}</div></v-col>
                  </v-row>
                </div>
              </v-col>
            </v-row>


          </div>

        </v-expand-transition>
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

.clickable-row {
  cursor: pointer;
  transition: background-color 0.2s;
}

.clickable-row:hover {
  background-color: rgba(var(--v-theme-primary), 0.05) !important;
}

.selected-row {
  background-color: rgba(var(--v-theme-primary), 0.1) !important;
}

.protocol-details-panel {
  background: rgba(var(--v-theme-on-surface), 0.03);
  border: 1px solid rgba(var(--v-theme-primary), 0.1);
  border-left: 4px solid rgb(var(--v-theme-primary));
}

.param-item {
  display: flex;
  flex-direction: column;
  padding: 8px;
  background: rgba(var(--v-theme-on-surface), 0.02);
  border-radius: 4px;
}

.param-label {
  font-size: 0.7rem;
  opacity: 0.6;
  text-transform: uppercase;
  margin-bottom: 4px;
}

.param-value {
  font-size: 0.9rem;
  font-weight: bold;
  color: rgb(var(--v-theme-primary));
}

.patient-info-banner {
  background: rgba(var(--v-theme-primary), 0.05);
  border-color: rgba(var(--v-theme-primary), 0.1) !important;
}

.info-item {
  display: flex;
  flex-direction: column;
}

.info-label {
  font-size: 0.65rem;
  opacity: 0.5;
  text-transform: uppercase;
}

.info-value {
  font-size: 0.85rem;
  font-weight: 600;
}

.error-detail-text {
  font-size: 0.75rem;
  color: #fff;
  background: rgba(var(--v-theme-error), 0.8);
  padding: 4px 8px;
  border-radius: 4px;
}

.fault-menu-list {
  background: rgba(var(--v-theme-surface), 0.95);
  backdrop-filter: blur(10px);
}

.image-preview-card {
  background: #000;
  border-color: #333 !important;
}

.preview-viewport {
  position: relative;
  background: #000;
}

.grayscale-ct {
  filter: grayscale(1) contrast(1.2);
}

.dicom-tags {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.tag {
  color: #00ff00;
  font-family: 'Consolas', monospace;
  font-size: 0.65rem;
  text-shadow: 1px 1px 1px #000;
}

.tag.top-right { position: absolute; top: 8px; right: 8px; }
.tag.bottom-right { position: absolute; bottom: 8px; right: 8px; }

.recon-plan-card {
  background: rgba(var(--v-theme-on-surface), 0.02);
  border: 1px dashed rgba(var(--v-theme-on-surface), 0.1) !important;
}

.plan-name {
  font-size: 0.8rem;
  color: rgb(var(--v-theme-secondary));
}

.mini-param {
  font-size: 0.75rem;
  margin-bottom: 2px;
}

.mini-param .l {
  opacity: 0.5;
  margin-right: 4px;
}

@keyframes pulse-green {
  0% { box-shadow: 0 0 0 0 rgba(var(--v-theme-success), 0.4); }
  70% { box-shadow: 0 0 0 20px rgba(var(--v-theme-success), 0); }
  100% { box-shadow: 0 0 0 0 rgba(var(--v-theme-success), 0); }
}

.workflow-stepper {
  background: rgba(var(--v-theme-on-surface), 0.02);
  border-color: rgba(var(--v-theme-on-surface), 0.1) !important;
}

.step-item {
  display: flex;
  align-items: center;
  opacity: 0.5;
  transition: all 0.3s;
}

.step-item.is-completed {
  opacity: 1;
}

.step-text {
  font-size: 0.75rem;
  font-weight: 600;
}

.status-pulsing {
  animation: pulse-info 2s infinite;
}

@keyframes pulse-info {
  0% { opacity: 1; }
  50% { opacity: 0.6; }
  100% { opacity: 1; }
}
</style>
