<script setup lang="ts">
import { useSimulatorStore } from '../../store/simulator';
import { Space, Badge } from 'ant-design-vue';

const store = useSimulatorStore();
</script>

<template>
  <div class="global-status-badges">
    <Space :size="24">
      <div class="status-indicator">
        <Badge :status="store.laserOn ? 'warning' : 'default'" />
        <span class="label">LASER:</span>
        <span class="value" :class="{ 'text-warning': store.laserOn }">{{ store.laserOn ? 'ACTIVE' : 'READY' }}</span>
      </div>
      
      <div class="status-indicator">
        <Badge :status="store.isWarmingUp ? 'processing' : (store.warmUpProgress === 100 ? 'success' : 'default')" />
        <span class="label">TUBE:</span>
        <span class="value">{{ store.warmUpProgress }}% {{ store.isWarmingUp ? 'WARMING...' : 'READY' }}</span>
      </div>

      <div class="status-indicator">
        <Badge :status="store.eStopActive ? 'error' : 'success'" />
        <span class="label">SAFETY:</span>
        <span class="value" :class="{ 'text-error': store.eStopActive }">{{ store.eStopActive ? 'E-STOP' : 'OK' }}</span>
      </div>
    </Space>
  </div>
</template>

<style scoped>
.global-status-badges {
  display: flex;
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  font-weight: 600;
}

.label {
  color: rgba(255,255,255,0.45);
}

.value {
  color: #fff;
}

.text-warning { color: #faad14; }
.text-error { color: #f5222d; }
</style>
