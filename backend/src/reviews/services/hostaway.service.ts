import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import {
  HostawayApiResponse,
  NormalizedReview,
} from '../interfaces/review.interface';
import { mockReviewsData } from '../data/mock-reviews';

@Injectable()
export class HostawayService {
  private readonly logger = new Logger(HostawayService.name);
  private readonly hostawayApiUrl: string;
  private readonly accountId: string;
  private readonly apiKey: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.hostawayApiUrl = this.configService.get<string>('hostaway.apiUrl') || 'https://api.hostaway.com/v1';
    this.accountId = this.configService.get<string>('hostaway.accountId') || 'your-account-id';
    this.apiKey = this.configService.get<string>('hostaway.apiKey') || 'your-api-key';
  }

  async fetchReviews(): Promise<NormalizedReview[]> {
    try {
      // Try to fetch from Hostaway API
      const url = `${this.hostawayApiUrl}/reviews`;
      const response = await firstValueFrom(
        this.httpService.get<HostawayApiResponse>(url, {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'X-Account-Id': this.accountId,
          },
        }),
      );

      if (response.data?.status === 'success' && response.data.result?.length > 0) {
        this.logger.log('Successfully fetched reviews from Hostaway API');
        return this.normalizeReviews(response.data.result);
      } else {
        this.logger.warn('No reviews from API, using mock data');
        return this.normalizeReviews(mockReviewsData.result);
      }
    } catch (error) {
      this.logger.warn(
        `Failed to fetch from Hostaway API: ${error.message}. Using mock data.`,
      );
      // Fallback to mock data
      return this.normalizeReviews(mockReviewsData.result);
    }
  }

  private normalizeReviews(rawReviews: any[]): NormalizedReview[] {
    return rawReviews.map((review) => {
      // Calculate average rating from categories
      const categoryRatings =
        review.reviewCategory?.map((cat: any) => cat.rating).filter(Boolean) || [];
      const averageRating =
        categoryRatings.length > 0
          ? categoryRatings.reduce((a: number, b: number) => a + b, 0) /
            categoryRatings.length
          : review.rating || 0;

      return {
        id: review.id,
        type: review.type,
        status: review.status,
        rating: review.rating,
        averageRating: Math.round(averageRating * 10) / 10,
        publicReview: review.publicReview,
        privateReview: review.privateReview,
        reviewCategories: review.reviewCategory?.map((cat: any) => ({
          category: cat.category,
          rating: cat.rating,
        })) || [],
        submittedAt: review.submittedAt,
        guestName: review.guestName,
        listingName: review.listingName,
        channel: this.extractChannel(review),
        isPublic: false,
      };
    });
  }

  private extractChannel(review: any): string {
    // Try to extract channel from listing name or other fields
    // This is a heuristic approach since the API might not provide channel directly
    if (review.channelName) {
      return review.channelName;
    }
    if (review.channel) {
      return review.channel;
    }
    // Default channels based on listing patterns or other indicators
    return 'Direct';
  }
}

