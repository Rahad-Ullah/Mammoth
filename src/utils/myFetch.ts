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

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface FetchOptions {
  method?: HttpMethod;
  body?: any;
  tags?: string[];
  token?: string;
  headers?: Record<string, string>;
  cache?: RequestCache;
}

export const myFetch = async (
  url: string,
  {
    method = "GET",
    body,
    tags,
    token,
    headers = {},
    cache = "force-cache",
  }: FetchOptions = {}
): Promise<FetchResponse> => {
  const accessToken = token || (await getToken());

  const isFormData = body instanceof FormData;
  const hasBody = body !== undefined && method !== "GET";

  const reqHeaders: Record<string, string> = {
    Accept: "application/json",
    ...headers,
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  };

  try {
    const response = await fetch(`${config.baseURL}${url}`, {
      method,
      headers: reqHeaders,
      ...(hasBody && { body: isFormData ? body : JSON.stringify(body) }),
      ...(tags && { next: { tags } }),
      ...(!(method === 'GET') ? {cache: 'no-store' } : {cache: cache}),
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: data?.success ?? true,
        data: data?.data,
        message: data?.message,
        error: null,
      };
    }

    return {
      success: false,
      data: null,
      message: data?.message,
      error: data?.errorMessages || "Request failed",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: "Network error",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};


// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use server";

// import { config } from "@/config/env-config";
// import { getToken } from "./get-token";

// export interface FetchResponse {
//   data?: any;
//   success: boolean;
//   message?: string;
//   error?: string | null;
// }

// export const myFetch = async (
//   url: string,
//   method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
//   body?: any,
//   tags?: string[],
//   token?: string
// ): Promise<FetchResponse> => {
//   const accessToken = token || (await getToken());
//   try {
//     const fetchOptions: RequestInit = {
//       method: method,
//       headers: {
//         "Content-Type": body instanceof FormData ? "" : "application/json",
//         Accept: "application/json",
//         Authorization: `Bearer ${accessToken}`,
//       },
//       next: {
//         tags: tags,
//       },
//       cache: "force-cache",
//     };

//     // Exclude body for GET requests
//     if (method !== "GET" && body) {
//       fetchOptions.body =
//         body instanceof FormData ? body : JSON.stringify(body);
//     }

//     const res = await fetch(`${config.baseURL}${url}`, fetchOptions);
//     const response = await res.json();

//     // send response
//     if (res.ok) {
//       return {
//         success: response?.success,
//         data: response?.data,
//         message: response?.message,
//         error: null,
//       };
//     } else {
//       return {
//         success: false,
//         data: null,
//         message: response?.message,
//         error: response?.errorMessages,
//       };
//     }
//   } catch (error) {
//     return {
//       success: false,
//       data: null,
//       error:
//         error instanceof Error ? error.message : "An unknown error occurred",
//     };
//   }
// };
