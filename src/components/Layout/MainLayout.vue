<script setup lang="ts">
import { Layout } from 'ant-design-vue';
import Sidebar from './Sidebar.vue';
import MotionControl from '../Simulator/MotionControl.vue';
import ScanStatus from '../Simulator/ScanStatus.vue';
import GlobalStatus from '../Simulator/GlobalStatus.vue';
import Maintenance from '../Simulator/Maintenance.vue';
import { useSimulatorStore } from '../../store/simulator';

const store = useSimulatorStore();
</script>

<template>
  <Layout class="layout-container">
    <Layout.Sider width="280" class="sider-custom">
      <Sidebar />
    </Layout.Sider>
    
    <Layout class="content-wrapper">
      <Layout.Header class="header-custom">
        <div class="header-logo">
          <span class="logo-text">VANTAGE CT</span>
          <span class="logo-subtext">HARDWARE EMULATOR v2.0</span>
        </div>
        <GlobalStatus />
      </Layout.Header>
      
      <Layout.Content class="main-content">
        <div class="dashboard-grid">
          <!-- 12-column grid layout -->
          <div class="grid-row">
            <div class="col-8">
              <ScanStatus />
            </div>
            <div class="col-4">
              <MotionControl />
            </div>
          </div>
          <div class="grid-row mt-4">
            <div class="col-12">
              <Maintenance />
            </div>
          </div>
        </div>
      </Layout.Content>
      
      <Layout.Footer class="footer-custom">
        <div class="system-alerts">
          <span v-if="store.eStopActive" class="alert-item error">EMERGENCY STOP ACTIVE</span>
          <span v-else class="alert-item success">SYSTEM READY</span>
        </div>
      </Layout.Footer>
    </Layout>
  </Layout>
</template>

<style scoped>
.layout-container {
  height: 100vh;
}

.sider-custom {
  border-right: 1px solid #1f1f1f;
  background: #001529;
}

.header-custom {
  background: #001529;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #1f1f1f;
  height: 64px;
}

.header-logo {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.logo-text {
  font-weight: bold;
  font-size: 1.2rem;
  letter-spacing: 2px;
  color: #1890ff;
}

.logo-subtext {
  font-size: 0.7rem;
  color: rgba(255,255,255,0.45);
}

.main-content {
  padding: 24px;
  background: #000c17;
  overflow-y: auto;
}

.dashboard-grid {
  display: flex;
  flex-direction: column;
}

.grid-row {
  display: flex;
  gap: 16px;
}

.col-12 { flex: 0 0 100%; }
.col-8 { flex: 0 0 calc(66.66% - 8px); }
.col-4 { flex: 0 0 calc(33.33% - 8px); }

.mt-4 { margin-top: 16px; }

.footer-custom {
  background: #001529;
  padding: 8px 16px;
  border-top: 1px solid #1f1f1f;
  height: 40px;
  display: flex;
  align-items: center;
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
</style>
