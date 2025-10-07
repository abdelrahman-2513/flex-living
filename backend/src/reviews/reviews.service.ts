import { Injectable } from '@nestjs/common';
import { HostawayService } from './services/hostaway.service';
import { NormalizedReview } from './interfaces/review.interface';

@Injectable()
export class ReviewsService {
  private reviewsCache: NormalizedReview[] = [];
  private reviewVisibilityMap: Map<number, boolean> = new Map();

  constructor(private readonly hostawayService: HostawayService) {}

  async getHostawayReviews(filters?: {
    channel?: string;
    rating?: number;
    startDate?: string;
    endDate?: string;
    listingName?: string;
  }): Promise<NormalizedReview[]> {
    // Fetch reviews from Hostaway (will use mock data as fallback)
    const reviews = await this.hostawayService.fetchReviews();

    // Cache the reviews
    this.reviewsCache = reviews;

    // Apply filters
    let filteredReviews = [...reviews];

    if (filters?.channel) {
      filteredReviews = filteredReviews.filter(
        (review) =>
          review.channel?.toLowerCase() === filters.channel?.toLowerCase(),
      );
    }

    if (filters?.rating !== undefined) {
      filteredReviews = filteredReviews.filter(
        (review) => review.averageRating >= filters.rating!,
      );
    }

    if (filters?.startDate) {
      // Parse start date and set to beginning of day (00:00:00)
      const startDate = new Date(filters.startDate);
      startDate.setHours(0, 0, 0, 0);
      console.log(filters.startDate);
      console.log(startDate);
      filteredReviews = filteredReviews.filter((review) => {
        const reviewDate = new Date(review.submittedAt);
        return reviewDate >= startDate;
      });
    }

    if (filters?.endDate) {
      // Parse end date and set to end of day (23:59:59)
      const endDate = new Date(filters.endDate);
      endDate.setHours(23, 59, 59, 999);
      console.log(endDate);
      
      filteredReviews = filteredReviews.filter((review) => {
        const reviewDate = new Date(review.submittedAt);
        return reviewDate <= endDate;
      });
    }

    if (filters?.listingName) {
      const searchTerm = filters.listingName.toLowerCase();
      filteredReviews = filteredReviews.filter((review) =>
        review.listingName?.toLowerCase().includes(searchTerm),
      );
    }

    // Attach visibility status
    return filteredReviews.map((review) => ({
      ...review,
      isPublic: this.reviewVisibilityMap.get(review.id) ?? false,
    }));
  }

  async getUniqueListings(): Promise<string[]> {
    const reviews = this.reviewsCache.length > 0 
      ? this.reviewsCache 
      : await this.hostawayService.fetchReviews();
    
    const listings = new Set(reviews.map((r) => r.listingName).filter(Boolean));
    return Array.from(listings).sort();
  }

  async getUniqueChannels(): Promise<string[]> {
    const reviews = this.reviewsCache.length > 0 
      ? this.reviewsCache 
      : await this.hostawayService.fetchReviews();
    
    const channels = new Set(reviews.map((r) => r.channel).filter(Boolean));
    return Array.from(channels).sort();
  }

  updateReviewVisibility(id: number, isPublic: boolean): NormalizedReview {
    this.reviewVisibilityMap.set(id, isPublic);
    const review = this.reviewsCache.find((r) => r.id === id);
    if (review) {
      return { ...review, isPublic };
    }
    throw new Error('Review not found');
  }

  async getPublicReviews(
    listingName?: string,
    limit?: number,
  ): Promise<NormalizedReview[]> {
    const reviews = this.reviewsCache.length > 0 
      ? this.reviewsCache 
      : await this.hostawayService.fetchReviews();

    let publicReviews = reviews.filter((review) =>
      this.reviewVisibilityMap.get(review.id),
    );

    if (listingName) {
      publicReviews = publicReviews.filter((review) =>
        review.listingName
          ?.toLowerCase()
          .includes(listingName.toLowerCase()),
      );
    }

    // Sort by date descending
    publicReviews.sort(
      (a, b) =>
        new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime(),
    );

    if (limit) {
      publicReviews = publicReviews.slice(0, limit);
    }

    return publicReviews;
  }
}

