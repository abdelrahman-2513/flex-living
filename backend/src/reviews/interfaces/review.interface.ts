export interface ReviewCategory {
  category: string;
  rating: number;
}

export interface NormalizedReview {
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

export interface HostawayReview {
  id: number;
  type: string;
  status: string;
  rating: number | null;
  publicReview: string;
  privateReview?: string;
  reviewCategory: Array<{
    category: string;
    rating: number;
  }>;
  submittedAt: string;
  guestName: string;
  listingName: string;
  channelName?: string;
  channel?: string;
}

export interface HostawayApiResponse {
  status: string;
  result: HostawayReview[];
}

