import axios, { AxiosError } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

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

    const response = await api.post<T>(url, data, { headers });
    
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string; error?: string }>;
    
    return {
      success: false,
      message: axiosError.response?.data?.message || axiosError.response?.data?.error || 'An error occurred',
      error: axiosError.message,
    };
  }
}

export default api;

