import axios from 'axios';
import Cookies from 'js-cookie';
import { env } from '../config/env';
import toast from 'react-hot-toast';
import { Review, ReviewFilters } from '../interfaces/review';

// Create axios instance
const api = axios.create({
  baseURL: env.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      Cookies.remove('access_token');
      window.location.href = '/login';
      toast.error('Session expired. Please login again.');
    }
    
    // Handle other errors
    if (error.response?.data?.message) {
      toast.error(error.response.data.message);
    } else if (error.message) {
      toast.error(error.message);
    }
    
    return Promise.reject(error);
  }
);

// Review API functions
export const reviewApi = {
  // Get all reviews with optional filters
  getReviews: async (filters?: ReviewFilters): Promise<Review[]> => {
    const params = new URLSearchParams();
    
    if (filters?.channel) params.append('channel', filters.channel);
    if (filters?.rating) params.append('rating', filters.rating.toString());
    if (filters?.startDate) params.append('startDate', filters.startDate);
    if (filters?.endDate) params.append('endDate', filters.endDate);
    if (filters?.listingName) params.append('listingName', filters.listingName);
    
    const response = await api.get(`/api/reviews/hostaway?${params.toString()}`);
    return response.data.data;
  },

  // Get public reviews
  getPublicReviews: async (listingName?: string, limit?: number): Promise<Review[]> => {
    const params = new URLSearchParams();
    
    if (listingName) params.append('listingName', listingName);
    if (limit) params.append('limit', limit.toString());
    
    const response = await api.get(`/api/reviews/public?${params.toString()}`);
    console.log(response.data);
    return response.data.data;
  },

  // Get unique listings
  getListings: async (): Promise<string[]> => {
    const response = await api.get('/api/reviews/listings');
    return response.data.data ;
  },

  // Get unique channels
  getChannels: async (): Promise<string[]> => {
    const response = await api.get('/api/reviews/channels');
    return response.data.data;
  },

  // Update review visibility
  updateReviewVisibility: async (id: number, isPublic: boolean): Promise<Review> => {
    const response = await api.patch(`/api/reviews/${id}/visibility`, {
      isPublic,
    });
    return response.data.data;
  },
};

export default api;