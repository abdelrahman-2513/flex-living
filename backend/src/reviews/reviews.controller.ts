import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Patch,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { UpdateReviewDto } from './dto/update-review.dto';

@Controller('api/reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get('hostaway')
  async getHostawayReviews(
    @Query('channel') channel?: string,
    @Query('rating') rating?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('listingName') listingName?: string,
  ) {
    const filters = {
      channel,
      rating: rating ? parseFloat(rating) : undefined,
      startDate,
      endDate,
      listingName,
    };
    return this.reviewsService.getHostawayReviews(filters);
  }

  @Get('listings')
  async getListings() {
    return this.reviewsService.getUniqueListings();
  }

  @Get('channels')
  async getChannels() {
    return this.reviewsService.getUniqueChannels();
  }

  @Patch(':id/visibility')
  async updateReviewVisibility(
    @Param('id') id: string,
    @Body() updateDto: UpdateReviewDto,
  ) {
    return this.reviewsService.updateReviewVisibility(
      parseInt(id),
      updateDto.isPublic,
    );
  }

  @Get('public')
  async getPublicReviews(
    @Query('listingName') listingName?: string,
    @Query('limit') limit?: string,
  ) {
    return this.reviewsService.getPublicReviews(
      listingName,
      limit ? parseInt(limit) : undefined,
    );
  }
}

