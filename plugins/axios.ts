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

  const axiosInstance: AxiosInstance = axios.create(defaultAxiosConfig);

  axiosInstance.interceptors.request.use((request: InternalAxiosRequestConfig) => {
    const url = new URL(request.url ?? '', 'http://base.url');
    url.searchParams.append('api_key', axiosPublicConfig.api_key);
    request.url = url.pathname + url.search;
    return request;
  });

  axiosInstance.interceptors.response.use((response: AxiosResponse) => response);

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
