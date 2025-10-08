import { create } from 'zustand';
import { reviewApi } from '../services/api';
import { Review, ReviewFilters } from '../interfaces/review';

interface ReviewStore {
  reviews: Review[];
  publicReviews: Review[];
  listings: string[];
  channels: string[];
  filters: ReviewFilters;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchReviews: () => Promise<void>;
  fetchPublicReviews: (listingName?: string, limit?: number) => Promise<void>;
  fetchListings: () => Promise<void>;
  fetchChannels: () => Promise<void>;
  setFilters: (filters: ReviewFilters) => void;
  toggleReviewVisibility: (id: number, isPublic: boolean) => Promise<void>;
  clearFilters: () => void;
}

export const useReviewStore = create<ReviewStore>((set, get) => ({
  reviews: [],
  publicReviews: [],
  listings: [],
  channels: [],
  filters: {},
  isLoading: false,
  error: null,

  fetchReviews: async () => {
    set({ isLoading: true, error: null });
    try {
      const reviews = await reviewApi.getReviews(get().filters);
      set({ reviews, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch reviews', isLoading: false });
      console.error('Error fetching reviews:', error);
    }
  },

  fetchPublicReviews: async (listingName?: string, limit?: number) => {
    set({ isLoading: true, error: null });
    try {
      const publicReviews = await reviewApi.getPublicReviews(listingName, limit);
      set({ publicReviews, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch public reviews', isLoading: false });
      console.error('Error fetching public reviews:', error);
    }
  },

  fetchListings: async () => {
    try {
      const listings = await reviewApi.getListings();
      set({ listings });
    } catch (error) {
      console.error('Error fetching listings:', error);
    }
  },

  fetchChannels: async () => {
    try {
      const channels = await reviewApi.getChannels();
      set({ channels });
    } catch (error) {
      console.error('Error fetching channels:', error);
    }
  },

  setFilters: (filters: ReviewFilters) => {
    set({ filters });
    get().fetchReviews();
  },

  toggleReviewVisibility: async (id: number, isPublic: boolean) => {
    try {
      const updatedReview = await reviewApi.updateReviewVisibility(id, isPublic);
      set((state) => ({
        reviews: state.reviews.map((review) =>
          review.id === id ? updatedReview : review
        ),
      }));
    } catch (error) {
      console.error('Error updating review visibility:', error);
      throw error;
    }
  },

  clearFilters: () => {
    set({ filters: {} });
    get().fetchReviews();
  },
}));

