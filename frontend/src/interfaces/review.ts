export interface ReviewCategory {
  category: string;
  rating: number;
}

export interface Review {
  id: number;
  type: string;
  status: string;
  rating: number | null;
  averageRating: number;
  publicReview: string;
  privateReview?: string;
  reviewCategories: ReviewCategory[];
  submittedAt: string;
  guestName: string;
  listingName: string;
  channel: string;
  isPublic: boolean;
}

export interface ReviewFilters {
  channel?: string;
  rating?: number;
  startDate?: string;
  endDate?: string;
  listingName?: string;
}

