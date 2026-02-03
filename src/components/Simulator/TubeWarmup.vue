<script setup lang="ts">
import { Button, InputNumber, Card } from 'ant-design-vue';
import { useSimulatorStore } from '../../store/simulator';
import { Thermometer } from 'lucide-vue-next';

const store = useSimulatorStore();
</script>

<template>
  <div class="warm-up-panel">
    <div class="hint-banner">
      提示：热容量低于20%时建议进行预热
    </div>

    <div class="form-content">
      <div class="form-item">
        <label>当前热容量：</label>
        <div class="input-container">
          <InputNumber 
            :value="(Number(store.currentHeatCapacity) || 0).toFixed(2)" 
            disabled 
            class="custom-input" 
          />
          <span class="unit">%</span>
        </div>
      </div>

      <div class="form-item">
        <label>目标热容量：</label>
        <div class="input-container">
          <InputNumber 
            v-model:value="store.targetHeatCapacity" 
            :min="0" 
            :max="100" 
            class="custom-input" 
          />
          <span class="unit">%</span>
        </div>
      </div>
    </div>

    <div class="panel-footer">
      <Button 
        type="primary" 
        size="large" 
        class="start-button" 
        @click="store.startWarmUp"
        :loading="store.isWarmingUp"
      >
        <template #icon><span class="dot"></span></template>
        开始预热
      </Button>
    </div>
  </div>
</template>

<style scoped>
.warm-up-panel {
  color: #fff;
  padding: 24px;
}

.hint-banner {
  background: rgba(250, 173, 20, 0.1);
  border: 1px solid rgba(250, 173, 20, 0.3);
  border-radius: 4px;
  padding: 12px 16px;
  color: #faad14;
  font-size: 0.9rem;
  margin-bottom: 32px;
}

.form-content {
  display: flex;
  flex-direction: column;
  gap: 32px;
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
  color: rgba(255, 255, 255, 0.85);
}

.input-container {
  display: flex;
  align-items: center;
  gap: 12px;
}

:deep(.ant-input-number) {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  width: 120px;
}

:deep(.ant-input-number-input) {
  color: #fff !important;
}

:deep(.ant-input-number-handler-wrap) {
  background: rgba(255, 255, 255, 0.05);
}

.unit {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1890ff;
}

.panel-footer {
  margin-top: 64px;
  display: flex;
  justify-content: flex-end;
}

.start-button {
  height: 48px;
  padding: 0 40px;
  font-size: 1.1rem;
  border-radius: 8px;
  background: #1890ff;
  border: none;
  display: flex;
  align-items: center;
  gap: 10px;
}

.dot {
  width: 8px;
  height: 8px;
  background: #fff;
  border-radius: 50%;
  display: inline-block;
  box-shadow: 0 0 8px #fff;
}
</style>
