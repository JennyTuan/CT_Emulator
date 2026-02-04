<script setup lang="ts">
import { useTheme } from 'vuetify';
import Sidebar from './Sidebar.vue';
import MotionControl from '../Simulator/MotionControl.vue';
import ScanStatus from '../Simulator/ScanStatus.vue';
import GlobalStatus from '../Simulator/GlobalStatus.vue';
import Maintenance from '../Simulator/Maintenance.vue';
import { useSimulatorStore } from '../../store/simulator';
import { computed, onMounted, watch } from 'vue';

const store = useSimulatorStore();
const theme = useTheme();

const toggleTheme = () => {
  const newTheme = theme.global.current.value.dark ? 'light' : 'dark'
  theme.global.name.value = newTheme
  localStorage.setItem('theme', newTheme)
};

const isDark = computed(() => theme.global.current.value.dark);

onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    theme.global.name.value = savedTheme;
  }
});
</script>

<template>
  <v-layout class="rounded rounded-md">
    <v-navigation-drawer
      permanent
      width="280"
      class="sider-custom"
    >
      <Sidebar />
    </v-navigation-drawer>

    <v-app-bar flat class="header-custom px-4">
      <div class="header-logo">
        <span class="logo-text">VANTAGE CT</span>
        <span class="logo-subtext">HARDWARE EMULATOR v2.0</span>
      </div>
      
      <v-spacer></v-spacer>
      
      <GlobalStatus />
      
      <v-btn
        icon
        variant="text"
        class="ml-4"
        @click="toggleTheme"
        :color="isDark ? 'yellow' : 'primary'"
      >
        <v-icon>{{ isDark ? 'mdi-weather-night' : 'mdi-weather-sunny' }}</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main class="main-content">
      <v-container fluid class="pa-6">
        <v-row>
          <v-col cols="8">
            <ScanStatus />
          </v-col>
          <v-col cols="4">
            <MotionControl />
          </v-col>
        </v-row>
        <v-row class="mt-4">
          <v-col cols="12">
            <Maintenance />
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-footer app border height="40" class="footer-custom px-4">
    </v-footer>
  </v-layout>
</template>

<style scoped>
.header-logo {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.logo-text {
  font-weight: bold;
  font-size: 1.2rem;
  letter-spacing: 2px;
  color: rgb(var(--v-theme-primary));
}

.logo-subtext {
  font-size: 0.7rem;
  opacity: 0.6;
}

.main-content {
  height: 100vh;
  overflow-y: auto;
}

.alert-item {
  font-weight: bold;
  font-size: 0.9rem;
  padding: 2px 8px;
  border-radius: 2px;
}

.alert-item.error {
  color: #f5222d;
  background: rgba(245, 34, 45, 0.1);
  border: 1px solid #f5222d;
  animation: pulse-red 1s infinite;
}

.alert-item.success {
  color: #52c41a;
  background: rgba(82, 196, 26, 0.1);
  border: 1px solid #52c41a;
}

@keyframes pulse-red {
  0% { box-shadow: 0 0 0 0 rgba(245, 34, 45, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(245, 34, 45, 0); }
  100% { box-shadow: 0 0 0 0 rgba(245, 34, 45, 0); }
}
</style>
