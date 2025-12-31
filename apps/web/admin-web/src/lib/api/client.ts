import axios from 'axios';
import { env } from '../config';

/**
 * Axios client instance configured for admin-web
 * Uses API gateway URL from environment configuration
 */
export const apiClient = axios.create({
  baseURL: env.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds
});

/**
 * Request interceptor for adding auth tokens
 */
apiClient.interceptors.request.use(
  (config) => {
    // TODO: Add authentication token from storage/cookies
    // const token = getAuthToken();
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor for error handling
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // TODO: Add global error handling (e.g., redirect to login on 401)
    // if (error.response?.status === 401) {
    //   // Handle unauthorized
    // }
    return Promise.reject(error);
  }
);

export default apiClient;

