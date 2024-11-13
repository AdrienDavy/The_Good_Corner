import axios, { AxiosInstance } from "axios";

let apiSingleton: AxiosInstance | null = null;

const useApi = (): AxiosInstance => {
  if (!apiSingleton) {
    apiSingleton = axios.create({
      baseURL: import.meta.env.VITE_BACKEND_URL,
    });
  }
  return apiSingleton;
};

export default useApi;
