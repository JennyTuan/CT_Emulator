<script setup lang="ts">
import { useSimulatorStore } from '../../store/simulator';

const store = useSimulatorStore();
</script>

<template>
  <div class="warm-up-panel">
    <v-alert
      type="warning"
      variant="tonal"
      class="hint-banner mb-8"
      border="start"
    >
      提示：热容量低于20%时建议进行预热
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
            density="compact"
            variant="outlined"
            hide-details
            class="custom-input"
          ></v-text-field>
          <span class="unit ml-3">%</span>
        </div>
      </div>
    </div>

    <div class="panel-footer mt-12">
      <v-btn
        color="primary"
        size="large"
        class="start-button"
        @click="store.startWarmUp"
        :loading="store.isWarmingUp"
        prepend-icon="mdi-circle-medium"
      >
        开始预热
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
}

.start-button {
  height: 48px;
  padding: 0 40px;
  font-size: 1.1rem;
}
</style>
