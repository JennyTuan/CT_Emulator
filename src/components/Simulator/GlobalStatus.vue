<script setup lang="ts">
import { useSimulatorStore } from '../../store/simulator'

const store = useSimulatorStore()
</script>

<template>
  <div class="global-status-badges">
    <div class="status-indicator">
      <div class="dot" :class="store.eStopActive ? 'error' : 'success'"></div>
      <span class="label">SAFETY:</span>
      <span class="value" :class="{ 'color-error': store.eStopActive }">{{ store.eStopActive ? 'E-STOP' : 'OK' }}</span>
    </div>
  </div>

</template>

<style scoped>
.global-status-badges {
  display: flex;
  gap: 24px;
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  font-weight: 600;
}

.label {
  opacity: 0.5;
}

.value {
  opacity: 0.9;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: currentColor;
}

.dot.warning { background-color: rgb(var(--v-theme-warning)); color: rgb(var(--v-theme-warning)); }
.dot.info { background-color: rgb(var(--v-theme-info)); color: rgb(var(--v-theme-info)); }
.dot.success { background-color: rgb(var(--v-theme-success)); color: rgb(var(--v-theme-success)); }
.dot.error { background-color: rgb(var(--v-theme-error)); color: rgb(var(--v-theme-error)); }
.dot.grey { background-color: #666; color: #666; }

.color-warning { color: rgb(var(--v-theme-warning)); }
.color-error { color: rgb(var(--v-theme-error)); }

.pulse {
  animation: dot-pulse 1.5s infinite ease-in-out;
}

@keyframes dot-pulse {
  0% { transform: scale(0.85); opacity: 0.5; }
  50% { transform: scale(1.2); opacity: 1; }
  100% { transform: scale(0.85); opacity: 0.5; }
}
</style>
