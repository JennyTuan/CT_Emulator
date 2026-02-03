<script setup lang="ts">
import { Button, Card, Radio } from 'ant-design-vue';
import { useSimulatorStore } from '../../store/simulator';

const store = useSimulatorStore();

const options = {
  rotationSpeed: [1, 2, 0.75],
  focalSpot: ['small', 'big'],
  voltage: [80, 100, 120, 140],
  collimatorWidth: ['32*0.6']
};
</script>

<template>
  <div class="air-cal-panel">
    <div class="params-grid">
      <div class="param-card">
        <h4 class="param-title">旋转速度</h4>
        <Radio.Group class="custom-radio-group">
          <Radio v-for="val in options.rotationSpeed" :key="val" :value="val">
            {{ val }}
          </Radio>
        </Radio.Group>
      </div>

      <div class="param-card">
        <h4 class="param-title">焦点</h4>
        <Radio.Group class="custom-radio-group">
          <Radio v-for="val in options.focalSpot" :key="val" :value="val">
            {{ val }}
          </Radio>
        </Radio.Group>
      </div>

      <div class="param-card">
        <h4 class="param-title">电压</h4>
        <Radio.Group class="custom-radio-group">
          <Radio v-for="val in options.voltage" :key="val" :value="val">
            {{ val }}
          </Radio>
        </Radio.Group>
      </div>

      <div class="param-card">
        <h4 class="param-title">准直器宽度</h4>
        <Radio.Group class="custom-radio-group">
          <Radio v-for="val in options.collimatorWidth" :key="val" :value="val">
            {{ val }}
          </Radio>
        </Radio.Group>
      </div>
    </div>

    <div class="summary-line">
      <div class="summary-info">
        当前组合数：<span class="highlight">24</span> 
        (已完成 <span class="highlight success">0</span>, 
        待校正 <span class="highlight warning">24</span>)
      </div>
      <Button type="link" class="clear-btn" @click="store.clearAirCalRecords">
        清空记录
      </Button>
    </div>

    <div class="panel-footer">
      <Button 
        type="primary" 
        size="large" 
        class="start-button" 
        @click="store.startAirCal"
        :loading="store.isAirCalibrating"
      >
        <template #icon><span class="dot"></span></template>
        开始校正
      </Button>
    </div>
  </div>
</template>

<style scoped>
.air-cal-panel {
  color: #fff;
  padding: 24px;
}

.params-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 32px;
}

.param-card {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.param-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.85);
}

.param-title::before {
  content: '';
  width: 4px;
  height: 16px;
  background: #1890ff;
  border-radius: 2px;
}

.custom-radio-group {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

:deep(.ant-radio-wrapper) {
  color: rgba(255, 255, 255, 0.85);
  font-weight: 500;
}

.summary-line {
  background: rgba(255, 255, 255, 0.02);
  border: 1px dashed rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 12px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.summary-info {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.45);
}

.highlight {
  font-weight: 700;
  color: #1890ff;
  margin: 0 4px;
}

.highlight.success { color: #52c41a; }
.highlight.warning { color: #faad14; }

.clear-btn {
  color: rgba(255, 255, 255, 0.3);
  font-size: 0.85rem;
}

.clear-btn:hover {
  color: #f5222d;
}

.panel-footer {
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
