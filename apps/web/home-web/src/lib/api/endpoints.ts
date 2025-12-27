import type { ApiResponse } from "@/types";

import api from "./client";

export const post = async <T = any>(url: string, data: any): Promise<ApiResponse<T>> => {
  try {
    const response = await api.post<T>(url, data);
    return { data: response.data };
  } catch (error: any) {
    return {
      error: error.response?.data?.message || error.message || "An error occurred",
    };
  }
};
