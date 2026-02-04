<script setup lang="ts">
import { useSimulatorStore } from '../../store/simulator';
import { computed } from 'vue';

const store = useSimulatorStore();

const warmUpColor = computed(() => {
  switch (store.warmUpStatus) {
    case 'running': return 'primary';
    case 'paused': return 'warning';
    case 'finished': return 'success';
    case 'error': return 'error';
    default: return 'grey';
  }
});

const airCalColor = computed(() => {
  switch (store.airCalStatus) {
    case 'running': return 'success';
    case 'paused': return 'warning';
    case 'finished': return 'primary';
    case 'error': return 'error';
    default: return 'grey';
  }
});
</script>

<template>
  <div class="sidebar-content">
    <div class="sidebar-section">
      <h3 class="section-title">GLOBAL STATUS</h3>
      
      <!-- 1. 激光灯状态 -->
      <v-card 
        variant="tonal" 
        class="status-card clickable-card mb-3" 
        :class="{ 'active': store.laserOn }"
        @click="store.toggleLaser"
      >
        <div class="status-icon">
          <v-icon :color="store.laserOn ? 'warning' : 'grey'">mdi-laser-pointer</v-icon>
        </div>
        <div class="status-info">
          <span class="label">激光灯状态</span>
          <span class="value">{{ store.laserOn ? '已开启 (ON)' : '已关闭 (OFF)' }}</span>
        </div>
        <v-tooltip activator="parent" location="top">点击切换开关</v-tooltip>
      </v-card>

      <!-- 2. 球管热容量 -->
      <v-card variant="tonal" class="status-card mb-3">
        <div class="status-icon">
          <v-icon color="primary">mdi-thermometer-lines</v-icon>
        </div>
        <div class="status-info">
          <span class="label">球管热容量</span>
          <div class="d-flex align-center justify-space-between">
            <span class="value">{{ Math.round((store.currentHeatCapacity / store.targetHeatCapacity) * 100) }}%</span>
            <span class="text-caption opacity-60">{{ store.currentHeatCapacity.toFixed(1) }} / {{ store.targetHeatCapacity }} HU</span>
          </div>
          <v-progress-linear
            :model-value="(store.currentHeatCapacity / store.targetHeatCapacity) * 100"
            color="primary"
            height="4"
            rounded
            class="mt-1"
          ></v-progress-linear>
        </div>
      </v-card>

      <!-- 3. 机架倾角 -->
      <v-card variant="tonal" class="status-card mb-3">
        <div class="status-icon">
          <v-icon color="secondary">mdi-rotate-orbit</v-icon>
        </div>
        <div class="status-info">
          <span class="label">机架倾角</span>
          <span class="value font-weight-black">{{ store.gantryPosition.toFixed(1) }}°</span>
        </div>
      </v-card>

      <!-- 4. 床码值 -->
      <v-card variant="tonal" class="status-card mb-3">
        <div class="status-icon">
          <v-icon color="info">mdi-human-bed</v-icon>
        </div>
        <div class="status-info">
          <span class="label">床码值 (水平)</span>
          <span class="value font-weight-black">{{ store.tableHorizontal.toFixed(1) }} mm</span>
        </div>
      </v-card>

      <!-- 5. 曝光状态 -->
      <v-card variant="tonal" class="status-card mb-3" :class="{ 'exposure-active': store.exposureActive }">
        <div class="status-icon">
          <v-icon :color="store.exposureActive ? 'error' : 'grey'">mdi-radioactive</v-icon>
        </div>
        <div class="status-info">
          <span class="label">曝光状态</span>
          <span class="value" :class="{ 'text-error': store.exposureActive }">
            {{ store.exposureActive ? '曝光中 (ACTIVE)' : '空闲 (IDLE)' }}
          </span>
        </div>
        <div v-if="store.exposureActive" class="pulse-dot"></div>
      </v-card>
    </div>


    <v-divider class="my-4"></v-divider>

    <div class="sidebar-section">
      <h3 class="section-title">SYSTEM MODULES</h3>
      <div class="nav-item active">
        <v-icon size="small" class="mr-2">mdi-monitor-dashboard</v-icon>
        <span>Hardware Dashboard</span>
      </div>
      <div class="nav-item">
        <v-icon size="small" class="mr-2">mdi-radio-tower</v-icon>
        <span>RF Subsystem</span>
      </div>
      <div class="nav-item">
        <v-icon size="small" class="mr-2">mdi-cog</v-icon>
        <span>Service Mode</span>
      </div>
    </div>

    <div class="sidebar-footer">
      <div class="uptime">
        UPTIME: 04:22:15
      </div>
      <div class="version">
        FW: v4.8.2-stable
      </div>
    </div>
  </div>
</template>

<style scoped>
.sidebar-content {
  padding: 24px 16px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.sidebar-section {
  margin-bottom: 32px;
}

.section-title {
  font-size: 0.75rem;
  opacity: 0.5;
  margin-bottom: 16px;
  letter-spacing: 1px;
}

.status-card {
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
}

.status-card.active {
  background: rgba(var(--v-theme-primary), 0.1);
}

.clickable-card {
  cursor: pointer;
  transition: transform 0.2s, background-color 0.2s;
}

.clickable-card:hover {
  background: rgba(var(--v-theme-primary), 0.15);
  transform: translateY(-2px);
}

.status-card.warning {
  background: rgba(var(--v-theme-error), 0.1);
}

.status-card.exposure-active {
  background: rgba(var(--v-theme-error), 0.1);
  border: 1px solid rgba(var(--v-theme-error), 0.3);
}

.pulse-dot {
  width: 8px;
  height: 8px;
  background: rgb(var(--v-theme-error));
  border-radius: 50%;
  box-shadow: 0 0 0 rgba(var(--v-theme-error), 0.4);
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(var(--v-theme-error), 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(var(--v-theme-error), 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(var(--v-theme-error), 0);
  }
}

.status-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: rgba(0,0,0,0.1);
  border-radius: 6px;
}

.status-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.status-info .label {
  font-size: 0.75rem;
  opacity: 0.6;
}

.status-info .value {
  font-weight: bold;
  font-size: 0.9rem;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  opacity: 0.7;
  transition: all 0.2s;
}

.nav-item:hover {
  background: rgba(var(--v-theme-primary), 0.05);
  opacity: 1;
}

.nav-item.active {
  background: rgb(var(--v-theme-primary));
  color: #fff;
  opacity: 1;
}

.sidebar-footer {
  margin-top: auto;
  border-top: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  padding-top: 16px;
  font-size: 0.7rem;
  opacity: 0.4;
  display: flex;
  justify-content: space-between;
}
</style>
