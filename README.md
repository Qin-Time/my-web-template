# Stores

Pinia 状态管理。

## 命名约定

- 文件名小驼峰：`auth.ts`、`ui.ts`
- Store ID 用业务名：`defineStore('auth', ...)`

## 示例

```ts
// stores/auth.ts
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const token = ref('');
  const isLoggedIn = computed(() => !!token.value);
  return { token, isLoggedIn };
});