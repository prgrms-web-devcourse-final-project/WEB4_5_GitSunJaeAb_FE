import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

// 요청 시 accessToken 헤더에 포함
axiosInstance.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// 응답 시 accessToken 재발급되면 갱신
axiosInstance.interceptors.response.use(
  async (response) => {
    const newAccessToken = response.data?.token?.accessToken;

    if (newAccessToken && typeof window !== 'undefined') {
      localStorage.setItem('accessToken', newAccessToken);

      // Zustand 상태에 반영
      const mod = await import('@/store/useAuthStore');
      mod.useAuthStore.getState().setAccessToken(newAccessToken);
    }

    return response;
  },
  (error) => {
    if (error.response) {
      console.warn('응답 오류:', error.response.data);
    } else {
      console.warn('네트워크 오류 또는 서버 미응답');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
