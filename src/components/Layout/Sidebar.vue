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
      
      <v-card variant="tonal" class="status-card mb-3" :class="{ 'active': store.laserOn }">
        <div class="status-icon">
          <v-icon :color="store.laserOn ? 'warning' : 'grey'">mdi-flash</v-icon>
        </div>
        <div class="status-info">
          <span class="label">Laser Status</span>
          <span class="value">{{ store.laserOn ? 'ON' : 'OFF' }}</span>
        </div>
        <v-btn size="small" :color="store.laserOn ? 'primary' : 'default'" @click="store.toggleLaser">
          TOGGLE
        </v-btn>
      </v-card>

      <v-card variant="tonal" class="status-card mb-3" :class="{ 'warning': store.eStopActive }">
        <div class="status-icon">
          <v-icon :color="store.eStopActive ? 'error' : 'grey'">mdi-shield-alert</v-icon>
        </div>
        <div class="status-info">
          <span class="label">Emergency Stop</span>
          <v-chip size="x-small" :color="store.eStopActive ? 'error' : 'success'">
            {{ store.eStopActive ? 'TRIGGERED' : 'NORMAL' }}
          </v-chip>
        </div>
        <v-btn v-if="store.eStopActive" size="small" color="error" variant="flat" @click="store.resetEStop">RESET</v-btn>
      </v-card>

      <v-card variant="tonal" class="status-card mb-3">
        <div class="status-icon">
          <v-icon :color="warmUpColor">mdi-thermometer</v-icon>
        </div>
        <div class="status-info">
          <span class="label">Tube Warm-up</span>
          <v-progress-linear
            :model-value="store.warmUpProgress"
            :color="warmUpColor"
            height="6"
            rounded
            :indeterminate="store.warmUpStatus === 'running'"
            class="mt-1"
          ></v-progress-linear>
        </div>
        <div class="d-flex flex-column align-end">
          <v-btn 
            v-if="store.warmUpStatus === 'idle' || store.warmUpStatus === 'finished'" 
            size="x-small" 
            variant="text" 
            @click="store.startWarmUp"
          >START</v-btn>
          <v-btn 
            v-else-if="store.warmUpStatus === 'running'" 
            size="x-small" 
            variant="text" 
            color="warning" 
            @click="store.pauseWarmUp"
          >PAUSE</v-btn>
          <v-btn 
            v-else-if="store.warmUpStatus === 'paused'" 
            size="x-small" 
            variant="text" 
            color="primary" 
            @click="store.resumeWarmUp"
          >RESUME</v-btn>
          <v-btn 
            v-if="store.warmUpStatus === 'error'" 
            size="x-small" 
            variant="text" 
            color="error" 
            @click="store.resetWarmUp"
          >RESET</v-btn>
        </div>
      </v-card>

      <v-card variant="tonal" class="status-card mb-3">
        <div class="status-icon">
          <v-icon :color="airCalColor">mdi-wind-power</v-icon>
        </div>
        <div class="status-info">
          <span class="label">Air Calibration</span>
          <v-progress-linear
            :model-value="store.airCalProgress"
            :color="airCalColor"
            height="6"
            rounded
            :indeterminate="store.airCalStatus === 'running'"
            class="mt-1"
          ></v-progress-linear>
        </div>
        <div class="d-flex flex-column align-end">
          <v-btn 
            v-if="store.airCalStatus === 'idle' || store.airCalStatus === 'finished'" 
            size="x-small" 
            variant="text" 
            @click="store.startAirCal"
          >START</v-btn>
          <v-btn 
            v-else-if="store.airCalStatus === 'running'" 
            size="x-small" 
            variant="text" 
            color="warning" 
            @click="store.pauseAirCal"
          >PAUSE</v-btn>
          <v-btn 
            v-else-if="store.airCalStatus === 'paused'" 
            size="x-small" 
            variant="text" 
            color="success" 
            @click="store.resumeAirCal"
          >RESUME</v-btn>
          <v-btn 
            v-if="store.airCalStatus === 'error'" 
            size="x-small" 
            variant="text" 
            color="error" 
            @click="store.resetAirCal"
          >RESET</v-btn>
        </div>
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

.status-card.warning {
  background: rgba(var(--v-theme-error), 0.1);
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
