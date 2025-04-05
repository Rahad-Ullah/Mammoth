/* eslint-disable @typescript-eslint/no-explicit-any */
import { Nexios } from "nexios-http";
import { NexiosOptions, NexiosResponse } from "nexios-http/types/interfaces";

// Define the common API response type
export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

// Default configuration for Nexios
const defaultConfig: NexiosOptions = {
  baseURL: "http://10.0.70.50:5003/api/v1",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  credentials: "include",
  timeout: 10000,
};

const nexiosInstance = new Nexios(defaultConfig);

// Add request interceptor
nexiosInstance.interceptors.request.use(async (config) => {
  if (typeof window !== "undefined") {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("accessToken="))
      ?.split("=")[1];

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
  }

  return config;
});

// Add response interceptor
nexiosInstance.interceptors.response.use(
  (response: NexiosResponse<ApiResponse>) => {
    // Ensure the `data` field is typed as `ApiResponse`
    response.data = response.data as ApiResponse;
    return response; // Return the full response object
  },
  (error) => {
    // Handle errors globally if needed
    return Promise.reject(error);
  }
);

export default nexiosInstance;
