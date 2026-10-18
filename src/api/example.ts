// 接口调用示例
// 命名：按业务模块命名，如 user.ts、order.ts

import { http } from './request';

export interface HealthData {
  status: string;
  uptime: number;
}

export const exampleApi = {
  // GET /api/health
  health: () => http.get<HealthData>('/health'),
};