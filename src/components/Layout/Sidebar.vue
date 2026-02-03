<script setup lang="ts">
import { useSimulatorStore } from '../../store/simulator';
import { Button, Progress, Tag, Divider } from 'ant-design-vue';
import { Zap, ShieldAlert, Thermometer, Radio, Settings, Activity } from 'lucide-vue-next';

const store = useSimulatorStore();
</script>

<template>
  <div class="sidebar-content">
    <div class="sidebar-section">
      <h3 class="section-title">GLOBAL STATUS</h3>
      
      <div class="status-card" :class="{ 'active': store.laserOn }">
        <div class="status-icon">
          <Zap :size="20" :color="store.laserOn ? '#faad14' : '#666'" />
        </div>
        <div class="status-info">
          <span class="label">Laser Status</span>
          <span class="value">{{ store.laserOn ? 'ON' : 'OFF' }}</span>
        </div>
        <Button size="small" :type="store.laserOn ? 'primary' : 'default'" @click="store.toggleLaser">
          TOGGLE
        </Button>
      </div>

      <div class="status-card" :class="{ 'warning': store.eStopActive }">
        <div class="status-icon">
          <ShieldAlert :size="20" :color="store.eStopActive ? '#f5222d' : '#666'" />
        </div>
        <div class="status-info">
          <span class="label">Emergency Stop</span>
          <Tag :color="store.eStopActive ? 'red' : 'green'">{{ store.eStopActive ? 'TRIGGERED' : 'NORMAL' }}</Tag>
        </div>
        <Button v-if="store.eStopActive" size="small" danger @click="store.resetEStop">RESET</Button>
      </div>

      <div class="status-card">
        <div class="status-icon">
          <Thermometer :size="20" color="#1890ff" />
        </div>
        <div class="status-info">
          <span class="label">Tube Warm-up</span>
          <Progress :percent="store.warmUpProgress" size="small" :status="store.isWarmingUp ? 'active' : 'normal'" />
        </div>
        <Button size="small" :disabled="store.isWarmingUp || store.warmUpProgress === 100" @click="store.startWarmUp">
          START
        </Button>
      </div>
    </div>

    <Divider style="border-color: #1f1f1f" />

    <div class="sidebar-section">
      <h3 class="section-title">SYSTEM MODULES</h3>
      <div class="nav-item active">
        <Activity :size="18" />
        <span>Hardware Dashboard</span>
      </div>
      <div class="nav-item">
        <Radio :size="18" />
        <span>RF Subsystem</span>
      </div>
      <div class="nav-item">
        <Settings :size="18" />
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
  color: rgba(255,255,255,0.45);
  margin-bottom: 16px;
  letter-spacing: 1px;
}

.status-card {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 8px;
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  transition: all 0.3s ease;
}

.status-card.active {
  border-color: rgba(26, 144, 255, 0.4);
  background: rgba(26, 144, 255, 0.05);
}

.status-card.warning {
  border-color: rgba(245, 34, 45, 0.4);
  background: rgba(245, 34, 45, 0.05);
}

.status-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: rgba(0,0,0,0.2);
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
  color: rgba(255,255,255,0.45);
}

.status-info .value {
  font-weight: bold;
  font-size: 0.9rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  color: rgba(255,255,255,0.65);
  transition: all 0.2s;
}

.nav-item:hover {
  background: rgba(255,255,255,0.05);
  color: #fff;
}

.nav-item.active {
  background: #1890ff;
  color: #fff;
}

.sidebar-footer {
  margin-top: auto;
  border-top: 1px solid #1f1f1f;
  padding-top: 16px;
  font-size: 0.7rem;
  color: rgba(255,255,255,0.3);
  display: flex;
  justify-content: space-between;
}
</style>
