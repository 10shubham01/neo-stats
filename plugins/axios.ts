import type {
  AxiosInstance,
  AxiosResponse,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
} from 'axios';

import axios from 'axios';

export default defineNuxtPlugin(() => {
  const {
    public: { axios: axiosPublicConfig },
  } = useRuntimeConfig();
  const defaultAxiosConfig: CreateAxiosDefaults = axiosPublicConfig as CreateAxiosDefaults;

  console.log(defaultAxiosConfig);

  const axiosInstance: AxiosInstance = axios.create(defaultAxiosConfig);

  // Request interceptor to add Authorization header if not present
  axiosInstance.interceptors.request.use((request: InternalAxiosRequestConfig) => {
    if (!request.headers.Authorization) {
      request.headers.Authorization = `Bearer ${''}`;
    }
    return request;
  });

  // Response interceptor (currently a pass-through)
  axiosInstance.interceptors.response.use((response: AxiosResponse) => response);

  // Provide the axios instance and custom methods globally
  return {
    provide: {
      axios: {
        instance: axiosInstance,
        get: axiosInstance.get,
        post: axiosInstance.post,
      },
    },
  };
});
