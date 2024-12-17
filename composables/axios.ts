import type { AxiosRequestConfig } from 'axios';
import { isAxiosError } from 'axios';

export function useAxios(config?: AxiosRequestConfig) {
  const axios = useNuxtApp().$axios;

  async function $get<T = unknown>(
    url: string,
  ): Promise<T> {
    try {
      const { data } = await axios.instance.get<T>(url, config);
      return data;
    }
    catch (error) {
      if (isAxiosError(error)) {
        return Promise.reject(error.response?.data);
      }
      else {
        return Promise.reject(error);
      }
    }
  }

  async function $post<T = unknown>(
    url: string,
    data?: unknown,
  ): Promise<T> {
    try {
      const { data: responseData } = await axios.instance.post<T>(url, data, config);
      return responseData;
    }
    catch (error) {
      if (isAxiosError(error)) {
        return Promise.reject(error.response?.data);
      }
      else {
        return Promise.reject(error);
      }
    }
  }
  return { ...axios, $post, $get };
}
