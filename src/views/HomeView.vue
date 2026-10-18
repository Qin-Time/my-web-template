<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { exampleApi } from '@/api/example';

const health = ref<string>('loading...');

onMounted(async () => {
  try {
    const data = await exampleApi.health();
    health.value = data.status;
  } catch (err) {
    console.error('健康检查失败:', err);
    health.value = 'error';
  }
});
</script>

<template>
  <div class="home">
    <h1>My App</h1>
    <p>Backend status: {{ health }}</p>
  </div>
</template>

<style scoped>
.home {
  padding: 24px;
}
</style>