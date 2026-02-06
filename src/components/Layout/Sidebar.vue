<script setup lang="ts">
import { useSimulatorStore } from '../../store/simulator';
import { computed } from 'vue';

const store = useSimulatorStore();

const recentLogs = computed(() => store.logs.slice(0, 50));
</script>

<template>
  <div class="sidebar-content">
    <!-- Navigation Modules -->
    <div class="sidebar-section">
      <h3 class="section-title">SYSTEM MODULES</h3>
      <div class="nav-item active">
        <v-icon size="small" class="mr-2">mdi-monitor-dashboard</v-icon>
        <span>Hardware Dashboard</span>
      </div>
      <div class="nav-item">
        <v-icon size="small" class="mr-2">mdi-history</v-icon>
        <span>Examination History</span>
      </div>
      <div class="nav-item">
        <v-icon size="small" class="mr-2">mdi-cog-outline</v-icon>
        <span>System Setup</span>
      </div>
    </div>

    <!-- Real-time Logs -->
    <div class="sidebar-section logs-container flex-grow-1 d-flex flex-column">
      <div class="d-flex align-center justify-space-between mb-4">
        <h3 class="section-title mb-0">SYSTEM LOGS</h3>
        <v-btn icon="mdi-trash-can-outline" variant="text" size="x-small" @click="store.clearLogs()" color="grey"></v-btn>
      </div>
      
      <div class="log-viewport flex-grow-1">
        <div v-if="store.logs.length === 0" class="log-empty pa-8 text-center">
          <v-icon size="large" class="mb-2 opacity-20">mdi-text-box-remove-outline</v-icon>
          <div class="text-caption opacity-40">NO LOGS</div>
        </div>
        
        <div v-for="entry in recentLogs" :key="entry.id" class="log-item" :class="entry.level">
          <div class="log-header d-flex align-center gap-2 mb-1">
            <span class="log-time">{{ entry.time }}</span>
            <span class="log-chip" :class="entry.level">{{ entry.level.toUpperCase() }}</span>
          </div>
          <div class="log-message">{{ entry.message }}</div>
        </div>
      </div>
    </div>

    <!-- Sidebar Footer -->
    <div class="sidebar-footer">
      <div class="footer-row d-flex justify-space-between mb-2">
        <span class="label">UPTIME:</span>
        <span class="value">04:22:15</span>
      </div>
      <div class="footer-row d-flex justify-space-between">
        <span class="label">VERSION:</span>
        <span class="value">FW: v4.8.2-stable</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sidebar-content {
  padding: 24px 16px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.sidebar-section {
  margin-bottom: 24px;
}

.section-title {
  font-size: 0.7rem;
  font-weight: 800;
  opacity: 0.4;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 10px 12px;
  border-radius: 8px;
  cursor: pointer;
  opacity: 0.6;
  transition: all 0.2s;
  margin-bottom: 4px;
  font-size: 0.85rem;
}

.nav-item:hover {
  background: rgba(var(--v-theme-primary), 0.05);
  opacity: 1;
}

.nav-item.active {
  background: rgb(var(--v-theme-primary));
  color: #fff;
  opacity: 1;
  font-weight: 600;
}

/* Logs Styling */
.logs-container {
  min-height: 0;
  background: rgba(var(--v-theme-on-surface), 0.02);
  border: 1px solid rgba(var(--v-theme-on-surface), 0.05);
  border-radius: 12px;
  padding: 16px 12px;
}

.log-viewport {
  overflow-y: auto;
  scrollbar-width: thin;
  padding-right: 4px;
}

.log-item {
  padding: 8px 0;
  border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.03);
  font-size: 0.75rem;
}

.log-item:last-child {
  border-bottom: none;
}

.log-time {
  font-family: 'Consolas', monospace;
  opacity: 0.3;
  font-size: 0.65rem;
}

.log-chip {
  font-size: 0.6rem;
  padding: 1px 4px;
  border-radius: 3px;
  font-weight: 900;
  letter-spacing: 0.5px;
}

.log-chip.info { background: rgba(var(--v-theme-primary), 0.1); color: rgb(var(--v-theme-primary)); }
.log-chip.warn { background: rgba(var(--v-theme-warning), 0.1); color: rgb(var(--v-theme-warning)); }
.log-chip.error { background: rgba(var(--v-theme-error), 0.1); color: rgb(var(--v-theme-error)); }
.log-chip.success { background: rgba(var(--v-theme-success), 0.1); color: rgb(var(--v-theme-success)); }

.log-message {
  line-height: 1.4;
  font-weight: 500;
  color: rgba(var(--v-theme-on-surface), 0.85);
}

.log-item.error .log-message {
  color: rgb(var(--v-theme-error));
}

.log-empty {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}

/* Footer Styling */
.sidebar-footer {
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}

.footer-row {
  font-size: 0.65rem;
  letter-spacing: 0.5px;
}

.footer-row .label {
  opacity: 0.3;
  font-weight: bold;
}

.footer-row .value {
  opacity: 0.6;
  font-weight: 800;
}
</style>
