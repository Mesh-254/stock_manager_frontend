import axios, { AxiosInstance, AxiosError } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  full_name: string;
  email: string;
  password: string;
  phone_number?: string;
}

interface LoginResponse {
  refresh: string;
  access: string;
  user: {
    id: string;
    email: string;
    full_name: string;
    role: string;
    shop_id: string | null;
  };
}

interface RegisterResponse {
  message: string;
  user: {
    id: string;
    email: string;
    full_name: string;
    role: string;
    shop_id: string | null;
  };
}

interface LogoutPayload {
  refresh: string;
}

// Create axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/accounts`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    // If 401 and we haven't tried refreshing yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
          // No refresh token, redirect to login
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('user');
          window.location.href = '/login';
          return Promise.reject(error);
        }

        // Try to refresh the token
        const response = await axios.post(`${API_BASE_URL}/token/refresh/`, {
          refresh: refreshToken,
        });

        const { access } = response.data;
        localStorage.setItem('access_token', access);

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Refresh failed, redirect to login
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Auth API functions
export const authAPI = {
  register: (credentials: RegisterCredentials): Promise<RegisterResponse> => {
    return axiosInstance.post('/register/', credentials).then((res) => res.data);
  },

  login: (credentials: LoginCredentials): Promise<LoginResponse> => {
    return axiosInstance.post('/login/', credentials).then((res) => res.data);
  },

  logout: (payload: LogoutPayload): Promise<void> => {
    return axiosInstance.post('/logout/', payload).then(() => {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
    });
  },

  verifyEmail: (token: string): Promise<{ message: string; detail: string }> => {
    return axios
      .get(`${API_BASE_URL}/accounts/verify-email/${token}/`)
      .then((res) => res.data);
  },

  resendVerification: (email: string): Promise<{ message: string; email_sent: boolean }> => {
    return axiosInstance
      .post('/resend-confirmation/', { email })
      .then((res) => res.data);
  },

  checkEmail: (email: string): Promise<{ exists: boolean; is_active: boolean }> => {
    return axiosInstance.post('/check-email/', { email }).then((res) => res.data);
  },
};

export default axiosInstance;
