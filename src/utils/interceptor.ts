import Axios, { AxiosError, AxiosRequestConfig } from "axios";
import axios from "axios";
import { Toast } from "antd-mobile";

export const axiosInstance = Axios.create({
  withCredentials: true,
});

//  创建一个新的axios实例对象  这样做的目的就是 不会进入之前的请求拦截和响应 防止进入死循环
export const refreshTokenAxiosClient = axios.create();

axiosInstance.interceptors.request.use(async (config: any) => {
  try {
    return config;
  } catch (e) {
    console.error("in request interceptor catch", e);
    throw e;
  }
});

axiosInstance.interceptors.response.use(
  async (res) => {
    return res;
  },

  async (error: AxiosError<{ success?: boolean; toast?: string }>) => {
    console.log("err", error, error.response?.data.toast);
    return Promise.reject(error);
  }
);
