<script setup lang="ts">
import { useSimulatorStore } from '../../store/simulator';
import { ref, watch, computed } from 'vue';

const store = useSimulatorStore();

const visualHorizontal = ref(store.tableHorizontal);
const visualTilt = ref(store.gantryPosition);
const visualVertical = ref(store.tableVertical);
const isHoming = ref(false);
const homeProgress = ref(0);

// Watchers for delayed/sync visual feedback
watch(() => store.tableHorizontal, (val) => {
  if (store.outOfSync) return;
  setTimeout(() => {
    visualHorizontal.value = val;
  }, store.responseDelay);
});

watch(() => store.gantryPosition, (val) => {
  if (store.outOfSync) return;
  if (store.gantryStuck) return; // Value doesn't update visual if stuck
  setTimeout(() => {
    visualTilt.value = val;
  }, store.responseDelay);
});

watch(() => store.tableVertical, (val) => {
  if (store.outOfSync) return;
  setTimeout(() => {
    visualVertical.value = val;
  }, store.responseDelay);
});

const moveStep = (axis: 'gantry' | 'v' | 'h', amount: number) => {
  if (store.heartbeatLost) return;
  
  if (axis === 'gantry') {
    if (store.gantryStuck) {
      // Simulate jitter
      const original = store.gantryPosition;
      store.gantryPosition += (Math.random() - 0.5) * 2;
      setTimeout(() => store.gantryPosition = original, 50);
      return;
    }
    store.gantryPosition += amount;
  }
  
  if (axis === 'v') store.tableVertical += amount;
  
  if (axis === 'h') {
    if (store.motionLimitFault && (store.tableHorizontal + amount <= 0 || store.tableHorizontal + amount >= 2000)) {
       return;
    }
    store.tableHorizontal += amount;
  }
};

const handleSliderChange = (axis: 'gantry' | 'h', val: number) => {
  if (store.heartbeatLost) return;
  
  if (axis === 'h' && store.motionLimitFault) {
    if (val <= 10 || val >= 1990) {
      // Randomly trigger limit hit if not already active? 
      // User said "randomly trigger when reaching 1600 or 0".
      return;
    }
  }
};

const resetToZero = async () => {
  if (store.heartbeatLost) return;
  isHoming.value = true;
  homeProgress.value = 0;
  
  const interval = setInterval(() => {
    homeProgress.value += 5;
    if (homeProgress.value >= 50 && store.errorMessage.includes('归零失败')) {
      clearInterval(interval);
      isHoming.value = false;
      store.triggerEStop('归零失败: 找不到原点传感器 (Home Timeout)');
      return;
    }
    if (homeProgress.value >= 100) {
      clearInterval(interval);
      store.gantryPosition = 0;
      store.tableVertical = 0;
      store.tableHorizontal = 0;
      isHoming.value = false;
    }
  }, 100);
};

const motionFaultCategories = [
  {
    title: 'A. 极限位故障 (Boundary)',
    errors: [
      { label: 'Limit Hit (限位触发)', type: 'limit' },
      { label: 'Tilt Stuck (倾斜卡死)', type: 'stuck' }
    ]
  },
  {
    title: 'B. 同步与反馈故障 (Feedback)',
    errors: [
      { label: 'Position Out of Sync (失步)', type: 'sync' },
      { label: 'Home Failed (归零失败)', type: 'home_fail' }
    ]
  },
  {
    title: 'C. 全局通讯故障 (Global)',
    errors: [
      { label: 'Heartbeat Timeout (心跳异常)', type: 'heartbeat' },
      { label: 'Response Delay (高延迟模拟)', type: 'delay' }
    ]
  }
];

const triggerMotionFault = (type: string) => {
  if (type === 'home_fail') {
    store.errorMessage = '归零失败 (预设): 下次归零将报错';
    return;
  }
  store.setMotionFault(type);
};
</script>

<template>
  <v-card class="motion-card fill-height" variant="flat">
    <v-card-title class="card-title-container pa-4">
      <v-icon color="primary" class="mr-2">mdi-compass-outline</v-icon>
      <span>MOTION CONTROL</span>
    </v-card-title>

    <v-card-text class="pa-4">
      <!-- Gantry Tilt -->
      <div class="axis-group">
        <div class="axis-header">
          <span class="axis-name">机架倾角 (Gantry Tilt)</span>
          <span class="axis-value" :class="{ 'warning-text': Math.abs(store.gantryPosition) > 20 }">
            {{ store.gantryPosition.toFixed(1) }}°
          </span>
        </div>
        <div class="axis-controls">
          <v-btn :disabled="store.heartbeatLost" icon="mdi-menu-left" density="compact" variant="text" size="small" @click="moveStep('gantry', -0.5)"></v-btn>
          <v-slider
            v-model="store.gantryPosition"
            :min="-30"
            :max="30"
            :step="0.5"
            hide-details
            :color="store.gantryStuck ? 'error' : 'primary'"
            :disabled="store.heartbeatLost"
            class="axis-slider mx-2"
          ></v-slider>
          <v-btn :disabled="store.heartbeatLost" icon="mdi-menu-right" density="compact" variant="text" size="small" @click="moveStep('gantry', 0.5)"></v-btn>
        </div>
      </div>

      <!-- Table Vertical -->
      <div class="axis-group">
        <div class="axis-header">
          <span class="axis-name">检查床高度 (Table Vertical)</span>
          <span class="axis-value">{{ (store.tableVertical).toFixed(1) }} mm</span>
        </div>
        <div class="axis-controls">
          <v-btn :disabled="store.heartbeatLost" icon="mdi-chevron-down" density="compact" variant="text" size="small" @click="moveStep('v', -2)"></v-btn>
          <v-slider
            v-model="store.tableVertical"
            :min="0"
            :max="300"
            hide-details
            color="primary"
            :disabled="store.heartbeatLost"
            class="axis-slider mx-2"
          ></v-slider>
          <v-btn :disabled="store.heartbeatLost" icon="mdi-chevron-up" density="compact" variant="text" size="small" @click="moveStep('v', 2)"></v-btn>
        </div>
      </div>

      <!-- Table Horizontal -->
      <div class="axis-group">
        <div class="axis-header">
          <span class="axis-name">水平进床位置 (Table Horizontal)</span>
          <span class="axis-value">{{ store.tableHorizontal.toFixed(1) }} mm</span>
        </div>
        <div class="axis-controls">
          <v-btn :disabled="store.heartbeatLost" icon="mdi-chevron-double-left" density="compact" variant="text" size="small" @click="moveStep('h', -10)"></v-btn>
          <v-slider
            v-model="store.tableHorizontal"
            :min="0"
            :max="2000"
            hide-details
            :color="store.motionLimitFault ? 'error' : 'primary'"
            :disabled="store.heartbeatLost"
            class="axis-slider mx-2"
            @update:model-value="(v: number) => handleSliderChange('h', v)"
          ></v-slider>
          <v-btn :disabled="store.heartbeatLost" icon="mdi-chevron-double-right" density="compact" variant="text" size="small" @click="moveStep('h', 10)"></v-btn>
        </div>
      </div>

      <!-- Schematic View -->
      <div class="motion-visualizer mt-4">
        <div class="visualizer-container">
          <div class="floor"></div>
          
          <!-- Realistic 3D Angled Gantry -->
          <div class="gantry-3d-wrap" :style="{ transform: `rotateY(-25deg) rotateZ(${visualTilt}deg)` }">
            <div class="gantry-housing">
              <div class="gantry-front">
                <div class="aperture-rim">
                  <div class="aperture-tunnel">
                    <div class="laser-line-v" v-if="store.laserOn"></div>
                    <div class="laser-line-h" v-if="store.laserOn"></div>
                    <div class="exposure-glow" v-if="store.exposureActive"></div>
                  </div>
                </div>
                <div class="gantry-controls">
                  <div class="mini-screen"></div>
                  <div class="mini-btns"></div>
                </div>
              </div>
              <div class="gantry-side-panel"></div>
            </div>
          </div>
          
          <!-- Moving Table - Corrected Path -->
          <div class="table-system-3d" :style="{ 
            bottom: `${25 + (visualVertical / 300) * 30}px`,
            left: `${-60 + (visualHorizontal / 2000) * 280}px`,
            transform: 'rotateY(-25deg)'
          }">
            <div class="table-bed-3d">
              <div class="patient-silhouette">
                <div class="body"></div>
                <div class="head"></div>
              </div>
            </div>
            <div class="table-lift-base" :style="{ height: `${15 + (visualVertical / 300) * 30}px` }">
              <div class="scissor-segment"></div>
              <div class="scissor-segment reverse"></div>
            </div>
          </div>
        </div>
        <div class="visualizer-label">实时扫描运动预览 (LIVE MOTION PREVIEW)</div>
      </div>

      <!-- Fault Sim & Reset -->
      <div class="quick-positions pt-4 d-flex gap-2">
        <v-btn 
          color="secondary" 
          variant="outlined" 
          prepend-icon="mdi-restore" 
          @click="resetToZero"
          :loading="isHoming"
          :disabled="store.heartbeatLost"
          class="flex-grow-1"
        >
          系统归零
        </v-btn>

        <v-menu location="top" width="300">
          <template v-slot:activator="{ props }">
            <v-btn
              color="error"
              variant="tonal"
              prepend-icon="mdi-bug"
              v-bind="props"
              :disabled="store.heartbeatLost && !store.errorMessage.includes('Heartbeat')"
              class="flex-grow-1"
            >
              故障模拟
            </v-btn>
          </template>
          <v-list density="compact" class="fault-menu-list">
             <template v-for="(cat, idx) in motionFaultCategories" :key="idx">
                <v-list-subheader class="font-weight-bold text-error">{{ cat.title }}</v-list-subheader>
                <v-list-item v-for="err in cat.errors" :key="err.label" @click="triggerMotionFault(err.type)">
                  <template v-slot:prepend><v-icon color="error" size="small">mdi-flash-outline</v-icon></template>
                  <v-list-item-title class="text-caption">{{ err.label }}</v-list-item-title>
                </v-list-item>
                <v-divider v-if="idx < motionFaultCategories.length - 1"></v-divider>
             </template>
             <v-divider></v-divider>
             <v-list-item @click="store.setMotionFault('clear')" class="text-success">
               <template v-slot:prepend><v-icon color="success" size="small">mdi-check-circle-outline</v-icon></template>
               <v-list-item-title>恢复所有运动故障</v-list-item-title>
             </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.motion-card {
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}

.card-title-container {
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: bold;
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
  opacity: 0.6;
}

.axis-value {
  font-family: monospace;
  font-weight: bold;
  color: rgb(var(--v-theme-primary));
}

.axis-controls {
  display: flex;
  align-items: center;
}

.axis-slider {
  flex: 1;
}

.motion-visualizer {
  height: 220px;
  background: linear-gradient(180deg, #f8faff 0%, #eef2f7 100%);
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  border: 1px solid #d1d9e6;
  box-shadow: inset 0 2px 10px rgba(0,0,0,0.05);
}

.visualizer-container {
  width: 100%;
  height: 100%;
  position: relative;
  perspective: 1000px;
  display: flex;
  align-items: flex-end;
  padding-bottom: 30px;
}

.floor {
  position: absolute;
  bottom: 30px;
  width: 100%;
  height: 40px;
  background: linear-gradient(180deg, rgba(0,0,0,0.05) 0%, transparent 100%);
  transform: rotateX(60deg);
  z-index: 1;
}

/* 3D Gantry */
.gantry-3d-wrap {
  position: absolute;
  left: 210px;
  bottom: 30px;
  z-index: 10;
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
}

.gantry-housing {
  position: relative;
  width: 130px;
  height: 150px;
  transform-style: preserve-3d;
}

.gantry-front {
  position: absolute;
  width: 120px;
  height: 150px;
  background: #fdfcf9;
  border: 1px solid #e0ddd5;
  border-radius: 30px 30px 5px 5px;
  box-shadow: 10px 5px 20px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.gantry-side-panel {
  position: absolute;
  right: -10px;
  width: 30px;
  height: 150px;
  background: #f0ede4;
  transform: rotateY(90deg) translateZ(-15px);
  border-radius: 5px;
  border: 1px solid #dcd8cc;
}

.aperture-rim {
  width: 80px;
  height: 80px;
  background: #e6e2d8;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 2px 5px rgba(0,0,0,0.2);
  border: 4px solid #fdfcf9;
}

.aperture-tunnel {
  width: 65px;
  height: 65px;
  background: #1a1a1a;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  box-shadow: inset 0 0 20px #000;
}

.laser-line-v {
  position: absolute;
  left: 50%;
  width: 1px;
  height: 100%;
  background: rgba(255, 0, 0, 0.6);
  box-shadow: 0 0 5px red;
}

.laser-line-h {
  position: absolute;
  top: 50%;
  width: 100%;
  height: 1px;
  background: rgba(255, 0, 0, 0.6);
  box-shadow: 0 0 5px red;
}

.exposure-glow {
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(76, 175, 80, 0.2) 0%, transparent 70%);
  animation: glow-pulse 0.5s infinite alternate;
}

.gantry-controls {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 20px;
  height: 30px;
}

.mini-screen {
  width: 16px;
  height: 10px;
  background: #2c3e50;
  border-radius: 1px;
  margin-bottom: 3px;
}

/* 3D Table */
.table-system-3d {
  position: absolute;
  z-index: 5;
  width: 220px;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
}

.table-bed-3d {
  width: 220px;
  height: 8px;
  background: #ffffff;
  border: 1px solid #d1d9e6;
  border-radius: 4px;
  position: relative;
  box-shadow: 2px 5px 10px rgba(0,0,0,0.1);
}

.patient-silhouette {
  position: absolute;
  bottom: 8px;
  right: 20px;
  display: flex;
  align-items: center;
  opacity: 0.6;
}

.patient-silhouette .body {
  width: 100px;
  height: 10px;
  background: #546e7a;
  border-radius: 5px;
}

.patient-silhouette .head {
  width: 14px;
  height: 14px;
  background: #546e7a;
  border-radius: 50%;
  margin-left: 5px;
}

.table-lift-base {
  width: 60px;
  margin-left: 80px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.scissor-segment {
  height: 100%;
  width: 100%;
  background: #cfd8dc;
  clip-path: polygon(0 0, 5% 0, 100% 95%, 100% 100%, 95% 100%, 0 5%);
  position: absolute;
}
.scissor-segment.reverse {
  clip-path: polygon(95% 0, 100% 0, 5% 100%, 0 100%, 0 95%, 95% 5%);
}

.visualizer-label {
  position: absolute;
  top: 15px;
  left: 15px;
  font-size: 0.7rem;
  font-weight: bold;
  color: #546e7a;
  letter-spacing: 0.5px;
  background: rgba(255,255,255,0.7);
  padding: 2px 8px;
  border-radius: 4px;
}

@keyframes glow-pulse {
  from { background: radial-gradient(circle, rgba(255, 152, 0, 0.2) 0%, transparent 70%); }
  to { background: radial-gradient(circle, rgba(255, 152, 0, 0.5) 0%, transparent 80%); }
}

.warning-text { color: #f44336 !important; font-weight: bold; }
.quick-positions { display: flex; flex-direction: column; }
.gap-2 { gap: 8px; }
</style>
