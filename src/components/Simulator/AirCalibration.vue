<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { useSimulatorStore } from '../../store/simulator'

const store = useSimulatorStore()

const airCalParams = {
  rotationSpeed: { label: '旋转速度', values: [1, 2, 0.75] },
  focalSpot: { label: '焦点', values: ['small', 'big'] },
  voltage: { label: '电压', values: [80, 100, 120, 140] },
  collimatorWidth: { label: '准直器宽度', values: ['32*0.6'] }
}

type AirCalQueueItem = {
  id: string
  rotationSpeed: number
  focalSpot: string
  voltage: number
  collimatorWidth: string
  label: string
}

const airCalQueue = computed<AirCalQueueItem[]>(() => {
  const queue: AirCalQueueItem[] = []
  const rotations = airCalParams.rotationSpeed.values
  const focalSpots = airCalParams.focalSpot.values
  const voltages = airCalParams.voltage.values
  const collimators = airCalParams.collimatorWidth.values

  rotations.forEach((rotation) => {
    focalSpots.forEach((focal) => {
      voltages.forEach((voltage) => {
        collimators.forEach((collimator) => {
          const label = `${airCalParams.rotationSpeed.label} ${rotation} | ${airCalParams.focalSpot.label} ${focal} | ${airCalParams.voltage.label} ${voltage} | ${airCalParams.collimatorWidth.label} ${collimator}`
          queue.push({
            id: `${rotation}-${focal}-${voltage}-${collimator}`,
            rotationSpeed: rotation,
            focalSpot: focal,
            voltage,
            collimatorWidth: collimator,
            label
          })
        })
      })
    })
  })

  return queue
})

const confirmedQueue = ref<AirCalQueueItem[]>([])
const queueReady = computed(() => confirmedQueue.value.length > 0)
const displayQueue = computed(() =>
  confirmedQueue.value.length > 0 ? confirmedQueue.value : airCalQueue.value
)

const queueListRef = ref<HTMLElement | null>(null)

const currentQueueIndex = computed(() => {
  if (!displayQueue.value.length) return -1
  const idx = Math.min(store.completedAirCalCombinations, displayQueue.value.length - 1)
  return store.airCalStatus === 'running' ? idx : -1
})

const errorQueueIndex = computed(() => {
  if (store.airCalStatus !== 'error') return -1
  if (!displayQueue.value.length) return -1
  return Math.min(store.completedAirCalCombinations, displayQueue.value.length - 1)
})

watch(currentQueueIndex, async (index) => {
  if (index < 0) return
  await nextTick()
  const list = queueListRef.value
  if (!list) return
  const item = list.querySelectorAll<HTMLElement>('.queue-item')[index]
  if (item) item.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
})

const confirmQueue = () => {
  confirmedQueue.value = airCalQueue.value
  store.addLog('info', `空气校正执行队列已确认：共 ${confirmedQueue.value.length} 项`)
}

const clearQueueConfirmation = () => {
  confirmedQueue.value = []
}

const airCalFaultOptions = [
  { title: '清空选择', code: 'clear' },
  { title: '空气扫描缺失/无效', code: 'air_scan_missing' },
  { title: '探测器校正失败', code: 'detector_cal_fail' },
  { title: '探测器通道掉线/信号中断', code: 'detector_dropout' },
  { title: 'X线管输出不稳定/波动', code: 'tube_output_unstable' },
  { title: '高压波动/失稳', code: 'hv_fluctuation' },
  { title: '准直器位置异常', code: 'collimator_position_error' },
  { title: '滤过器/弓形滤器不匹配', code: 'bowtie_mismatch' },
  { title: '机架温度漂移过大', code: 'gantry_temp_drift' },
  { title: '机架运动编码器异常', code: 'gantry_motion_encoder_error' }
]

const selectedAirCalFault = ref<string | null>(null)
const airCalFaultLabel = computed(() =>
  selectedAirCalFault.value ? '模拟故障：已选择' : '模拟故障'
)

const statusColor = computed(() => {
  switch (store.airCalStatus) {
    case 'running': return 'success'
    case 'paused': return 'warning'
    case 'finished': return 'primary'
    case 'error': return 'error'
    default: return 'grey'
  }
})
</script>

<template>
  <div class="air-cal-panel">
    <v-alert
      :type="store.airCalStatus === 'error' ? 'error' : 'info'"
      variant="tonal"
      class="mb-6"
      border="start"
    >
      <div class="d-flex justify-space-between align-center">
        <span>{{ store.airCalStatus === 'error' ? '校正过程异常中断' : '请确认执行队列后开始校正' }}</span>
        <v-chip size="small" :color="statusColor" variant="flat">
          {{ store.airCalStatus.toUpperCase() }}
        </v-chip>
      </div>
    </v-alert>

    <div class="queue-header">
      <div class="queue-title">
        <div class="queue-title-icon">
          <v-icon size="16">mdi-format-list-bulleted</v-icon>
        </div>
        <div class="queue-title-text">
          <div class="queue-title-main">执行队列</div>
          <div class="queue-title-sub">全组合预生成，确认后开始模拟</div>
        </div>
      </div>
      <div class="queue-actions">
        <v-btn
          color="primary"
          variant="flat"
          size="small"
          prepend-icon="mdi-check"
          :disabled="store.airCalStatus === 'running'"
          @click="confirmQueue"
        >
          确认队列
        </v-btn>
        <v-btn
          color="success"
          variant="flat"
          size="small"
          prepend-icon="mdi-play"
          v-if="store.airCalStatus === 'idle' || store.airCalStatus === 'error' || store.airCalStatus === 'finished'"
          :disabled="!queueReady"
          @click="store.startAirCal"
        >
          开始
        </v-btn>
        <v-btn
          v-if="store.airCalStatus === 'running'"
          color="warning"
          variant="flat"
          size="small"
          prepend-icon="mdi-pause"
          @click="store.pauseAirCal"
        >
          暂停
        </v-btn>
        <v-btn
          v-if="store.airCalStatus === 'paused'"
          color="success"
          variant="flat"
          size="small"
          prepend-icon="mdi-play-pause"
          @click="store.resumeAirCal"
        >
          恢复
        </v-btn>
        <v-menu
          v-if="store.airCalStatus === 'running' || store.airCalStatus === 'paused'"
          location="bottom end"
        >
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              color="error"
              variant="tonal"
              size="small"
              prepend-icon="mdi-alert-circle"
            >
              {{ airCalFaultLabel }}
            </v-btn>
          </template>
          <v-list density="compact" class="fault-menu">
            <v-list-item
              v-for="item in airCalFaultOptions"
              :key="item.code"
              @click="
                selectedAirCalFault = item.code === 'clear' ? null : item.title;
                if (item.code === 'clear') {
                  store.addLog('info', '空气校正故障选择已清空');
                } else {
                  store.addLog('error', `空气校正模拟故障：${item.title}`);
                  store.failAirCal();
                }
              "
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
              <template v-slot:append>
                <v-icon v-if="selectedAirCalFault === item.title">mdi-check</v-icon>
              </template>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn
          variant="text"
          size="small"
          prepend-icon="mdi-restore"
          @click="
            store.resetAirCal();
            clearQueueConfirmation();
            store.addLog('info', '空气校正队列已重置');
          "
        >
          重置
        </v-btn>
      </div>
    </div>

    <div class="queue-body">
      <div class="queue-meta">
        <div class="queue-count">
          共 <span class="queue-count-number">{{ displayQueue.length }}</span> 项
        </div>
        <div class="queue-status">
          <v-chip size="x-small" :color="queueReady ? 'success' : 'default'" variant="flat">
            {{ queueReady ? '已确认' : '未确认' }}
          </v-chip>
        </div>
      </div>

      <div class="queue-list" ref="queueListRef">
        <div
          v-for="(item, index) in displayQueue"
          :key="item.id"
          class="queue-item"
          :class="{
            'is-current': index === currentQueueIndex,
            'is-completed': index < store.completedAirCalCombinations,
            'is-error': index === errorQueueIndex
          }"
        >
          <div class="queue-index">
            <span>{{ index + 1 }}</span>
          </div>
          <div class="queue-content">
            <div class="queue-item-title">{{ item.label }}</div>
            <div class="queue-item-tags">
              <v-chip size="x-small" variant="outlined">{{ item.rotationSpeed }}</v-chip>
              <v-chip size="x-small" variant="outlined">{{ item.focalSpot }}</v-chip>
              <v-chip size="x-small" variant="outlined">{{ item.voltage }}</v-chip>
              <v-chip size="x-small" variant="outlined">{{ item.collimatorWidth }}</v-chip>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="summary-line my-6 pa-4">
      <div class="summary-info">
        队列总数：<span class="highlight">{{ displayQueue.length }}</span>
        (已完成 <span class="highlight success">{{ store.completedAirCalCombinations }}</span>,
        待校正 <span class="highlight warning">{{ displayQueue.length - store.completedAirCalCombinations }}</span>)
      </div>
      <v-btn
        variant="tonal"
        size="small"
        class="clear-btn"
        prepend-icon="mdi-broom"
        @click="store.resetAirCal"
      >
        清空记录
      </v-btn>
    </div>

    <v-progress-linear
      :model-value="store.airCalProgress"
      :color="statusColor"
      height="10"
      rounded
      striped
      :indeterminate="store.airCalStatus === 'running'"
      class="mb-8"
    ></v-progress-linear>

  </div>
</template>

<style scoped>
.air-cal-panel {
  padding: 24px;
}

.queue-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.queue-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.queue-title {
  display: flex;
  align-items: center;
  gap: 12px;
}

.queue-title-icon {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(var(--v-theme-primary), 0.12);
  color: rgb(var(--v-theme-primary));
}

.queue-title-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.queue-title-main {
  font-size: 1rem;
  font-weight: 600;
  color: rgba(var(--v-theme-on-surface), 0.88);
}

.queue-title-sub {
  font-size: 0.75rem;
  opacity: 0.6;
}

.queue-body {
  background: rgba(var(--v-theme-on-surface), 0.02);
  border: 1px solid rgba(var(--v-theme-on-surface), 0.08);
  border-radius: 10px;
  padding: 12px;
  margin-bottom: 16px;
}

.queue-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.queue-count {
  font-size: 0.85rem;
  opacity: 0.7;
}

.queue-count-number {
  font-weight: 700;
  color: rgb(var(--v-theme-primary));
  margin: 0 4px;
}

.queue-list {
  max-height: 320px;
  overflow: auto;
  border-radius: 8px;
  background: rgba(var(--v-theme-on-surface), 0.015);
}

.queue-item {
  display: grid;
  grid-template-columns: 42px 1fr;
  gap: 12px;
  padding: 10px 12px;
  border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.06);
  border-left: 4px solid transparent;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.queue-item:last-child {
  border-bottom: none;
}

.queue-item.is-current {
  background: rgba(var(--v-theme-primary), 0.08);
  border-color: rgba(var(--v-theme-primary), 0.25);
  border-left-color: rgba(var(--v-theme-primary), 0.9);
}

.queue-item.is-completed {
  background: rgba(var(--v-theme-success), 0.08);
  border-left-color: rgba(var(--v-theme-success), 0.9);
}

.queue-item.is-error {
  background: rgba(var(--v-theme-error), 0.1);
  border-left-color: rgba(var(--v-theme-error), 0.9);
}

.queue-item.is-error .queue-item-title {
  color: rgb(var(--v-theme-error));
}

.queue-index {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: rgba(var(--v-theme-primary), 0.12);
  color: rgb(var(--v-theme-primary));
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.queue-content {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.queue-item-title {
  font-size: 0.9rem;
  font-weight: 600;
}

.queue-item-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  opacity: 0.85;
}

.summary-line {
  background: rgba(var(--v-theme-on-surface), 0.02);
  border: 1px dashed rgba(var(--v-theme-on-surface), 0.1);
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.summary-info {
  font-size: 0.9rem;
  opacity: 0.6;
}

.highlight {
  font-weight: 700;
  color: rgb(var(--v-theme-primary));
  margin: 0 4px;
}

.highlight.success { color: rgb(var(--v-theme-success)); }
.highlight.warning { color: rgb(var(--v-theme-warning)); }

.clear-btn {
  opacity: 0.8;
}

.clear-btn:hover {
  opacity: 1;
}

.fault-menu {
  min-width: 280px;
}
</style>
