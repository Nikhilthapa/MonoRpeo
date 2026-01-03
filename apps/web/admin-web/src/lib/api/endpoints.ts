import { AxiosError } from 'axios';
import { apiClient } from './client';

/**
 * Standard API response interface
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

/**
 * GET request helper
 */
export async function get<T = any>(
  url: string,
  token?: string
): Promise<ApiResponse<T>> {
  try {
    const headers: Record<string, string> = {};

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await apiClient.get<T>(url, { headers });

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string; error?: string }>;

    return {
      success: false,
      message:
        axiosError.response?.data?.message ||
        axiosError.response?.data?.error ||
        'An error occurred',
      error: axiosError.message,
    };
  }
}

/**
 * POST request helper
 */
export async function post<T = any>(
  url: string,
  data?: any,
  token?: string
): Promise<ApiResponse<T>> {
  try {
    const headers: Record<string, string> = {};

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await apiClient.post<T>(url, data, { headers });

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string; error?: string }>;

    return {
      success: false,
      message:
        axiosError.response?.data?.message ||
        axiosError.response?.data?.error ||
        'An error occurred',
      error: axiosError.message,
    };
  }
}

/**
 * PUT request helper
 */
export async function put<T = any>(
  url: string,
  data?: any,
  token?: string
): Promise<ApiResponse<T>> {
  try {
    const headers: Record<string, string> = {};

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await apiClient.put<T>(url, data, { headers });

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string; error?: string }>;

    return {
      success: false,
      message:
        axiosError.response?.data?.message ||
        axiosError.response?.data?.error ||
        'An error occurred',
      error: axiosError.message,
    };
  }
}

/**
 * DELETE request helper
 */
export async function del<T = any>(
  url: string,
  token?: string
): Promise<ApiResponse<T>> {
  try {
    const headers: Record<string, string> = {};

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await apiClient.delete<T>(url, { headers });

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string; error?: string }>;

    return {
      success: false,
      message:
        axiosError.response?.data?.message ||
        axiosError.response?.data?.error ||
        'An error occurred',
      error: axiosError.message,
    };
  }
}

