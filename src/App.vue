<script setup lang="ts">
import { ConfigProvider, theme } from 'ant-design-vue';
import MainLayout from './components/Layout/MainLayout.vue';

// Use dark algorithm for Ant Design Vue
const darkTheme = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: '#1890ff',
    borderRadius: 4,
  },
};
</script>

<template>
  <ConfigProvider :theme="darkTheme">
    <MainLayout />
  </ConfigProvider>
</template>

<style>
#app {
  height: 100vh;
  overflow: hidden;
}
</style>
