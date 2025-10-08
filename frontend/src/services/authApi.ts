import axios from 'axios';
import { LoginRequest, RegisterRequest, LoginResponse } from '../types/auth';
import { env } from '../config/env';

const api = axios.create({
  baseURL: env.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authApi = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post('/auth/signin', credentials);
    return response.data;
  },

  register: async (userData: RegisterRequest): Promise<LoginResponse> => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  getMe: async (): Promise<any> => {
    const response = await api.get('/auth/welcome');
    return response.data;
  },
};
