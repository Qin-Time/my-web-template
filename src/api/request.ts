import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
});

// ===== 请求拦截：加 token =====
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ===== 响应拦截：统一解包 + 错误处理 =====
instance.interceptors.response.use(
  (response) => {
    const { code, message, data } = response.data;
    if (code === 0) return data;
    return Promise.reject(new Error(message || '请求失败'));
  },
  (error) => {
    if (error.response?.status === 401) {
      // 未登录 → 清 token 跳登录
      localStorage.removeItem('token');
      // router.push('/login');
    }
    return Promise.reject(error);
  }
);

// ===== 快捷方法 =====
export const http = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    instance.get<T, T>(url, config),
  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    instance.post<T, T>(url, data, config),
  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    instance.put<T, T>(url, data, config),
  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    instance.delete<T, T>(url, config),
};

export default instance;