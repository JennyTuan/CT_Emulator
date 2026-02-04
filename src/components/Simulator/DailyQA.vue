<script setup lang="ts">
import { useSimulatorStore } from '../../store/simulator';
import { ref, computed } from 'vue';

const store = useSimulatorStore();

interface QATest {
  id: string;
  name: string;
  description: string;
  status: 'pass' | 'fail' | 'pending' | 'running';
  baseline?: number;
  measured?: number;
  tolerance?: number;
  unit?: string;
}

const qaTests = ref<QATest[]>([
  { 
    id: 'water_hu', 
    name: 'HU值准确性 (水)', 
    description: '水模CT值应在 -5 到 +5 HU',
    status: 'pending',
    baseline: 0,
    measured: undefined,
    tolerance: 5,
    unit: 'HU'
  },
  { 
    id: 'air_hu', 
    name: 'HU值准确性 (空气)', 
    description: '空气CT值应在 -1005 到 -995 HU',
    status: 'pending',
    baseline: -1000,
    measured: undefined,
    tolerance: 5,
    unit: 'HU'
  },
  { 
    id: 'noise', 
    name: '图像噪声', 
    description: '标准差应小于 4 HU',
    status: 'pending',
    baseline: 3,
    measured: undefined,
    tolerance: 1,
    unit: 'HU'
  },
  { 
    id: 'uniformity', 
    name: '均匀性', 
    description: 'ROI间HU值差异应小于 5 HU',
    status: 'pending',
    baseline: 0,
    measured: undefined,
    tolerance: 5,
    unit: 'HU'
  },
  { 
    id: 'spatial_res', 
    name: '空间分辨率', 
    description: '应能分辨 6 lp/cm',
    status: 'pending',
    baseline: 6,
    measured: undefined,
    tolerance: 0.5,
    unit: 'lp/cm'
  },
  { 
    id: 'slice_width', 
    name: '层厚准确性', 
    description: '实测层厚与标称层厚偏差 < 0.5mm',
    status: 'pending',
    baseline: 5.0,
    measured: undefined,
    tolerance: 0.5,
    unit: 'mm'
  },
]);

const dailyQaFaultOptions = [
  { title: '清空选择', code: 'clear' },
  { title: '水模定位偏差/未居中', code: 'phantom_position_error' },
  { title: '水HU超范围', code: 'water_hu_out_of_range' },
  { title: '空气HU超范围', code: 'air_hu_out_of_range' },
  { title: '噪声偏高', code: 'noise_high' },
  { title: '均匀性不合格', code: 'uniformity_fail' },
  { title: '环形伪影明显', code: 'ring_artifact' },
  { title: '空间分辨率下降', code: 'spatial_resolution_low' },
  { title: '层厚偏差超限', code: 'slice_thickness_error' },
  { title: '床板运动误差/抖动', code: 'table_motion_error' }
];

const selectedDailyQaFault = ref<string | null>(null);
const dailyQaFaultLabel = computed(() =>
  selectedDailyQaFault.value ? '模拟故障：已选择' : '模拟故障'
);

const runningQA = ref(false);
const currentTestIndex = ref(-1);

const allTestsPassed = computed(() => {
  return qaTests.value.every(test => test.status === 'pass');
});

const completedTests = computed(() => {
  return qaTests.value.filter(test => test.status === 'pass' || test.status === 'fail').length;
});

const totalTests = computed(() => qaTests.value.length);

const progressPercent = computed(() => {
  if (totalTests.value === 0) return 0;
  return Math.round((completedTests.value / totalTests.value) * 100);
});

const startQA = async () => {
  runningQA.value = true;
  currentTestIndex.value = 0;
  
  // Reset all tests
  qaTests.value.forEach(test => {
    test.status = 'pending';
    test.measured = undefined;
  });
  
  // Run tests sequentially
  for (let i = 0; i < qaTests.value.length; i++) {
    currentTestIndex.value = i;
    await runTest(qaTests.value[i]);
  }
  
  runningQA.value = false;
  currentTestIndex.value = -1;
};

const runTest = async (test: QATest): Promise<void> => {
  test.status = 'running';
  
  // Simulate test execution (1-2 seconds)
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
  
  // Simulate measurement with some random variation
  const variation = (Math.random() - 0.5) * 2 * (test.tolerance || 1);
  test.measured = Number(((test.baseline || 0) + variation).toFixed(2));
  
  // Check if test passes
  const diff = Math.abs((test.measured || 0) - (test.baseline || 0));
  test.status = diff <= (test.tolerance || 0) ? 'pass' : 'fail';
};

const runSingleTest = async (test: QATest) => {
  if (runningQA.value) return;
  await runTest(test);
};

const resetQA = () => {
  qaTests.value.forEach(test => {
    test.status = 'pending';
    test.measured = undefined;
  });
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pass': return 'success';
    case 'fail': return 'error';
    case 'running': return 'primary';
    default: return 'grey';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'pass': return 'mdi-check-circle';
    case 'fail': return 'mdi-close-circle';
    case 'running': return 'mdi-loading';
    default: return 'mdi-circle-outline';
  }
};
</script>

<template>
  <div class="daily-qa-container">
    <!-- Header Alert -->
    <v-alert
      variant="tonal"
      :color="allTestsPassed && completedTests === totalTests ? 'success' : 'info'"
      density="compact"
      class="mb-4"
    >
      <div class="d-flex align-center justify-space-between">
        <div>
          <v-icon class="mr-2">mdi-clipboard-check-outline</v-icon>
          <span class="font-weight-bold">日常质量保证 (Daily QA)</span>
        </div>
        <v-chip 
          size="small" 
          :color="allTestsPassed && completedTests === totalTests ? 'success' : 'default'"
          variant="flat"
        >
          {{ completedTests }} / {{ totalTests }} 完成
        </v-chip>
      </div>
    </v-alert>

    <!-- Progress Bar -->
    <v-progress-linear
      v-if="runningQA"
      :model-value="progressPercent"
      color="primary"
      height="6"
      class="mb-4"
      striped
    />

    <!-- QA Tests List -->
    <v-list density="compact" class="qa-test-list mb-4">
      <v-list-item
        v-for="(test, index) in qaTests"
        :key="test.id"
        class="qa-test-item"
        :class="{ 'is-running': test.status === 'running' }"
      >
        <template v-slot:prepend>
          <v-icon 
            :color="getStatusColor(test.status)"
            :class="{ 'rotating': test.status === 'running' }"
          >
            {{ getStatusIcon(test.status) }}
          </v-icon>
        </template>

        <v-list-item-title class="test-name">
          {{ test.name }}
        </v-list-item-title>
        <v-list-item-subtitle class="test-description">
          {{ test.description }}
        </v-list-item-subtitle>

        <template v-slot:append>
          <div class="test-results">
            <div v-if="test.measured !== undefined" class="measurement-display">
              <span class="label">实测值:</span>
              <span 
                class="value" 
                :class="test.status === 'fail' ? 'error-value' : 'success-value'"
              >
                {{ test.measured }} {{ test.unit }}
              </span>
              <span class="baseline">(基准: {{ test.baseline }} {{ test.unit }})</span>
            </div>
            <v-btn
              v-else-if="!runningQA"
              size="x-small"
              variant="tonal"
              rounded="pill"
              class="run-test-btn"
              color="primary"
              @click="runSingleTest(test)"
            >
              运行
            </v-btn>
          </div>
        </template>
      </v-list-item>
    </v-list>

    <!-- Control Buttons -->
    <div class="qa-controls d-flex gap-2">
      <v-btn
        color="primary"
        size="large"
        variant="flat"
        rounded="pill"
        class="flex-grow-1 qa-primary-btn"
        :disabled="runningQA"
        :loading="runningQA"
        @click="startQA"
        prepend-icon="mdi-play-circle-outline"
      >
        开始全部QA测试
      </v-btn>
      <v-menu location="bottom end">
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            color="error"
            size="large"
            variant="tonal"
            rounded="pill"
            class="qa-fault-btn"
            :disabled="runningQA"
            prepend-icon="mdi-alert-circle"
          >
            {{ dailyQaFaultLabel }}
          </v-btn>
        </template>
        <v-list density="compact" class="fault-menu">
          <v-list-item
            v-for="item in dailyQaFaultOptions"
            :key="item.code"
            @click="
              selectedDailyQaFault = item.code === 'clear' ? null : item.title;
              if (item.code === 'clear') {
                store.addLog('info', '日常QA故障选择已清空');
              } else {
                store.addLog('warn', `日常QA模拟故障：${item.title}`);
              }
            "
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
            <template v-slot:append>
              <v-icon v-if="selectedDailyQaFault === item.title">mdi-check</v-icon>
            </template>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn
        color="grey"
        size="large"
        variant="tonal"
        rounded="pill"
        class="qa-secondary-btn"
        :disabled="runningQA || completedTests === 0"
        @click="resetQA"
        prepend-icon="mdi-refresh"
      >
        重置
      </v-btn>
    </div>

    <!-- Summary Card -->
    <v-card
      v-if="completedTests === totalTests && completedTests > 0"
      class="mt-4 summary-card"
      :color="allTestsPassed ? 'success' : 'error'"
      variant="tonal"
    >
      <v-card-text>
        <div class="d-flex align-center">
          <v-icon size="large" class="mr-3">
            {{ allTestsPassed ? 'mdi-check-circle' : 'mdi-alert-circle' }}
          </v-icon>
          <div>
            <div class="summary-title">
              {{ allTestsPassed ? 'QA测试通过' : 'QA测试失败' }}
            </div>
            <div class="summary-subtitle">
              {{ allTestsPassed 
                ? '所有测试项目均在容差范围内' 
                : '部分测试项目超出容差范围，请检查设备' 
              }}
            </div>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<style scoped>
.daily-qa-container {
  padding: 0;
}

.qa-test-list {
  background: rgba(var(--v-theme-on-surface), 0.02);
  border: 1px solid rgba(var(--v-theme-on-surface), 0.1);
  border-radius: 4px;
}

.qa-test-item {
  border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.05);
  transition: background-color 0.2s;
}

.qa-test-item:last-child {
  border-bottom: none;
}

.qa-test-item.is-running {
  background: rgba(var(--v-theme-primary), 0.05);
}

.test-name {
  font-size: 0.9rem;
  font-weight: 500;
}

.test-description {
  font-size: 0.75rem;
  opacity: 0.6;
  margin-top: 2px;
}

.test-results {
  min-width: 250px;
  text-align: right;
}

.measurement-display {
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
}

.measurement-display .label {
  opacity: 0.6;
  font-size: 0.75rem;
}

.measurement-display .value {
  font-weight: bold;
  font-size: 0.85rem;
}

.measurement-display .value.success-value {
  color: rgb(var(--v-theme-success));
}

.measurement-display .value.error-value {
  color: rgb(var(--v-theme-error));
}

.measurement-display .baseline {
  opacity: 0.5;
  font-size: 0.7rem;
}

.rotating {
  animation: rotate 1s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.summary-card {
  border-width: 2px;
}

.summary-title {
  font-size: 1rem;
  font-weight: bold;
}

.summary-subtitle {
  font-size: 0.85rem;
  opacity: 0.8;
  margin-top: 4px;
}

.qa-controls {
  margin-top: 16px;
  gap: 12px;
}

.qa-primary-btn {
  font-weight: 600;
  letter-spacing: 0.2px;
  text-transform: none;
  box-shadow: 0 10px 20px rgba(var(--v-theme-primary), 0.25);
}

.qa-secondary-btn {
  font-weight: 600;
  text-transform: none;
  box-shadow: none;
}

.run-test-btn {
  font-weight: 600;
  text-transform: none;
  box-shadow: none;
}

.qa-fault-btn {
  font-weight: 600;
  text-transform: none;
  box-shadow: 0 8px 18px rgba(var(--v-theme-error), 0.2);
}

.fault-menu {
  min-width: 280px;
}
</style>
