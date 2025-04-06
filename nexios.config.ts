/* eslint-disable @typescript-eslint/no-explicit-any */
import { Nexios } from "nexios-http";
import { NexiosOptions, NexiosResponse } from "nexios-http/types/interfaces";
import { getToken } from "./src/utils/get-token"; // Import the utility function
import { config } from "./src/config/env-config"; // Import the configuration

// Define the common API response type
export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

// Default configuration for Nexios
const defaultConfig: NexiosOptions = {
  baseURL: config.baseURL, // Use the baseURL from the configuration
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  credentials: "include",
};

const nexiosInstance = new Nexios(defaultConfig);

// Add request interceptor
nexiosInstance.interceptors.request.use(async (config) => {
  let token: string | undefined;

  if (typeof window !== "undefined") {
    // Client-side: Retrieve token from document cookies
    token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("accessToken="))
      ?.split("=")[1];
  } else {
    // Server-side: Retrieve token using next/headers cookies
    token = await getToken();
  }

  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
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
