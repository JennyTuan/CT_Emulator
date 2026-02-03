<script setup lang="ts">
import { useSimulatorStore } from '../../store/simulator';
import { ref } from 'vue';

const store = useSimulatorStore();

const options = {
  rotationSpeed: [1, 2, 0.75],
  focalSpot: ['small', 'big'],
  voltage: [80, 100, 120, 140],
  collimatorWidth: ['32*0.6']
};

const selectedParams = ref({
  speed: 1,
  spot: 'small',
  kv: 120,
  width: '32*0.6'
});
</script>

<template>
  <div class="air-cal-panel">
    <v-row class="params-grid">
      <v-col cols="6" v-for="(vals, label) in { '旋转速度': options.rotationSpeed, '焦点': options.focalSpot, '电压': options.voltage, '准直器宽度': options.collimatorWidth }" :key="label">
        <v-card class="param-card pa-4" variant="tonal">
          <h4 class="param-title mb-4">{{ label }}</h4>
          <v-radio-group inline hide-details density="compact">
            <v-radio v-for="val in vals" :key="val" :label="String(val)" :value="val" color="primary"></v-radio>
          </v-radio-group>
        </v-card>
      </v-col>
    </v-row>

    <div class="summary-line my-8 pa-4">
      <div class="summary-info">
        当前组合数：<span class="highlight">24</span> 
        (已完成 <span class="highlight success">0</span>, 
        待校正 <span class="highlight warning">24</span>)
      </div>
      <v-btn variant="text" size="small" class="clear-btn" @click="store.clearAirCalRecords">
        清空记录
      </v-btn>
    </div>

    <div class="panel-footer">
      <v-btn 
        color="primary" 
        size="large" 
        class="start-button" 
        @click="store.startAirCal"
        :loading="store.isAirCalibrating"
        prepend-icon="mdi-circle-medium"
      >
        开始校正
      </v-btn>
    </div>
  </div>
</template>

<style scoped>
.air-cal-panel {
  padding: 24px;
}

.param-card {
  border: 1px solid rgba(var(--v-theme-on-surface), 0.05);
}

.param-title {
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
}

.param-title::before {
  content: '';
  width: 4px;
  height: 16px;
  background: rgb(var(--v-theme-primary));
  border-radius: 2px;
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
  opacity: 0.4;
}

.clear-btn:hover {
  opacity: 1;
  color: rgb(var(--v-theme-error));
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
