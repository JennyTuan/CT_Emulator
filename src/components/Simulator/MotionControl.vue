<script setup lang="ts">
import { useSimulatorStore } from '../../store/simulator';
import { Card, Button, Slider, Space } from 'ant-design-vue';
import { ChevronUp, ChevronDown, Compass, ChevronLeft, ChevronRight } from 'lucide-vue-next';

const store = useSimulatorStore();

const moveStep = (axis: 'gantry' | 'v' | 'h', amount: number) => {
  if (axis === 'gantry') store.gantryPosition += amount;
  if (axis === 'v') store.tableVertical += amount;
  if (axis === 'h') store.tableHorizontal += amount;
};
</script>

<template>
  <Card class="motion-card" :bordered="false">
    <template #title>
      <div class="card-title-container">
        <Compass :size="20" />
        <span>MOTION CONTROL</span>
      </div>
    </template>

    <div class="axis-group">
      <div class="axis-header">
        <span class="axis-name">GANTRY TILT</span>
        <span class="axis-value">{{ store.gantryPosition.toFixed(1) }}°</span>
      </div>
      <div class="axis-controls">
        <Button size="small" @click="moveStep('gantry', -1)"><ChevronLeft :size="14" /></Button>
        <Slider v-model:value="store.gantryPosition" :min="-30" :max="30" :step="0.5" class="axis-slider" />
        <Button size="small" @click="moveStep('gantry', 1)"><ChevronRight :size="14" /></Button>
      </div>
    </div>

    <div class="axis-group">
      <div class="axis-header">
        <span class="axis-name">TABLE VERTICAL</span>
        <span class="axis-value">{{ store.tableVertical.toFixed(1) }} mm</span>
      </div>
      <div class="axis-controls">
        <Button size="small" @click="moveStep('v', -5)"><ChevronDown :size="14" /></Button>
        <Slider v-model:value="store.tableVertical" :min="0" :max="300" class="axis-slider" />
        <Button size="small" @click="moveStep('v', 5)"><ChevronUp :size="14" /></Button>
      </div>
    </div>

    <div class="axis-group">
      <div class="axis-header">
        <span class="axis-name">TABLE HORIZONTAL</span>
        <span class="axis-value">{{ store.tableHorizontal.toFixed(1) }} mm</span>
      </div>
      <div class="axis-controls">
        <Button size="small" @click="moveStep('h', -10)"><ChevronDown :size="14" /></Button>
        <Slider v-model:value="store.tableHorizontal" :min="0" :max="2000" class="axis-slider" />
        <Button size="small" @click="moveStep('h', 10)"><ChevronUp :size="14" /></Button>
      </div>
    </div>

    <div class="motion-visualizer">
      <div class="gantry-ring">
        <div class="gantry-tilt-indicator" :style="{ transform: `rotate(${store.gantryPosition}deg)` }"></div>
        <div class="table-v" :style="{ bottom: `${(store.tableVertical / 300) * 100}%` }">
          <div class="table-top"></div>
        </div>
      </div>
    </div>

    <div class="quick-positions">
      <span class="label">PRESETS</span>
      <Space>
        <Button size="small" @click="store.tableHorizontal = 0; store.tableVertical = 150">HOME</Button>
        <Button size="small" @click="store.tableHorizontal = 800; store.tableVertical = 150">CENTER</Button>
        <Button size="small" @click="store.tableHorizontal = 1800">UNLOAD</Button>
      </Space>
    </div>
  </Card>
</template>

<style scoped>
.motion-card {
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

.axis-group {
  margin-bottom: 20px;
}

.axis-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.axis-name {
  font-size: 0.75rem;
  color: rgba(255,255,255,0.45);
}

.axis-value {
  font-family: monospace;
  font-weight: bold;
  color: #1890ff;
}

.axis-controls {
  display: flex;
  align-items: center;
  gap: 12px;
}

.axis-slider {
  flex: 1;
}

.motion-visualizer {
  height: 140px;
  background: rgba(0,0,0,0.2);
  border-radius: 8px;
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.gantry-ring {
  width: 100px;
  height: 100px;
  border: 8px solid #333;
  border-radius: 50%;
  position: relative;
}

.gantry-tilt-indicator {
  position: absolute;
  top: -12px;
  left: 50%;
  width: 4px;
  height: 20px;
  background: #1890ff;
  margin-left: -2px;
  transition: transform 0.3s;
  transform-origin: 50% 62px;
}

.table-v {
  position: absolute;
  width: 60px;
  height: 4px;
  background: #555;
  left: 50%;
  margin-left: -30px;
  transition: bottom 0.3s;
}

.table-top {
  position: absolute;
  top: -4px;
  width: 100%;
  height: 4px;
  background: #1890ff;
  border-radius: 2px;
}

.quick-positions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.quick-positions .label {
  font-size: 0.7rem;
  color: rgba(255,255,255,0.3);
}
</style>
