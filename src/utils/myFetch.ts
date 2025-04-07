/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { config } from "@/config/env-config";
import { getToken } from "./get-token";

export interface FetchResponse {
  data?: any;
  success: boolean;
  message?: string;
  error?: string | null;
}

export const myFetch = async (
  url: string,
  method: string,
  body?: any,
  tags?: string[]
): Promise<FetchResponse> => {
  const token = await getToken();
  try {
    const res = await fetch(`${config.baseURL}${url}`, {
      method: method,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}` || "",
      },
      body: body,
      next: {
        tags: tags,
      },
      cache: "force-cache",
    });
    const response = await res.json();
    // send response
    if (res.ok) {
      return {
        success: response?.success,
        data: response?.data,
        message: response?.message,
        error: null,
      };
    } else {
      return {
        success: false,
        data: null,
        message: response?.message,
        error: response?.errorMessage,
      };
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};
