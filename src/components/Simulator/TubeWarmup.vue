<script setup lang="ts">
import { useSimulatorStore } from '../../store/simulator';
import { computed } from 'vue';

const store = useSimulatorStore();

const statusColor = computed(() => {
  switch (store.warmUpStatus) {
    case 'running': return 'primary';
    case 'paused': return 'warning';
    case 'finished': return 'success';
    case 'error': return 'error';
    default: return 'grey';
  }
});
</script>

<template>
  <div class="warm-up-panel">
    <v-alert
      :type="store.warmUpStatus === 'error' ? 'error' : 'warning'"
      variant="tonal"
      class="hint-banner mb-6"
      border="start"
    >
      <div class="d-flex justify-space-between align-center">
        <span>{{ store.warmUpStatus === 'error' ? '预热发生故障，请检查硬件状态' : '提示：热容量低于20%时建议进行预热' }}</span>
        <v-chip size="small" :color="statusColor" variant="flat">
          {{ store.warmUpStatus.toUpperCase() }}
        </v-chip>
      </div>
    </v-alert>

    <div class="form-content">
      <div class="form-item mb-6">
        <label>当前热容量：</label>
        <div class="input-container d-flex align-center">
          <v-text-field
            :model-value="(Number(store.currentHeatCapacity) || 0).toFixed(2)"
            disabled
            density="compact"
            variant="outlined"
            hide-details
            class="custom-input"
          ></v-text-field>
          <span class="unit ml-3">%</span>
        </div>
      </div>

      <div class="form-item mb-6">
        <label>目标热容量：</label>
        <div class="input-container d-flex align-center">
          <v-text-field
            v-model="store.targetHeatCapacity"
            type="number"
            :min="0"
            :max="100"
            :disabled="store.warmUpStatus === 'running'"
            density="compact"
            variant="outlined"
            hide-details
            class="custom-input"
          ></v-text-field>
          <span class="unit ml-3">%</span>
        </div>
      </div>
    </div>

    <v-progress-linear
      :model-value="store.warmUpProgress"
      :color="statusColor"
      height="10"
      rounded
      striped
      :indeterminate="store.warmUpStatus === 'running'"
      class="mt-4 mb-8"
    ></v-progress-linear>

    <div class="panel-footer d-flex gap-2 justify-end">
      <v-btn
        v-if="store.warmUpStatus === 'idle' || store.warmUpStatus === 'error' || store.warmUpStatus === 'finished'"
        color="primary"
        @click="store.startWarmUp"
        prepend-icon="mdi-play"
      >
        开始预热
      </v-btn>

      <v-btn
        v-if="store.warmUpStatus === 'running'"
        color="warning"
        @click="store.pauseWarmUp"
        prepend-icon="mdi-pause"
      >
        暂停
      </v-btn>

      <v-btn
        v-if="store.warmUpStatus === 'paused'"
        color="primary"
        @click="store.resumeWarmUp"
        prepend-icon="mdi-play-pause"
      >
        恢复
      </v-btn>

      <v-btn
        v-if="store.warmUpStatus === 'running' || store.warmUpStatus === 'paused'"
        color="error"
        variant="tonal"
        @click="store.failWarmUp"
        prepend-icon="mdi-alert-circle"
      >
        模拟故障
      </v-btn>

      <v-btn
        variant="outlined"
        @click="store.resetWarmUp"
        prepend-icon="mdi-refresh"
      >
        重置
      </v-btn>
    </div>
  </div>
</template>

<style scoped>
.warm-up-panel {
  padding: 24px;
}

.form-content {
  max-width: 400px;
}

.form-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.form-item label {
  font-size: 1.1rem;
  font-weight: 500;
  opacity: 0.85;
}

.custom-input {
  width: 140px;
}

.unit {
  font-size: 1.5rem;
  font-weight: 600;
  color: rgb(var(--v-theme-primary));
}

.panel-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  row-gap: 12px;
  flex-wrap: wrap;
}

.start-button {
  height: 48px;
  padding: 0 40px;
  font-size: 1.1rem;
}
</style>
