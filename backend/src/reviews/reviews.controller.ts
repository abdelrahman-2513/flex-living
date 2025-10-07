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
import { Public } from 'src/auth/decorators';
import { GetReviewsDto } from './dto/get-reviews.dto';

@Controller('api/reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get('hostaway')
  async getHostawayReviews(
    @Query() query: GetReviewsDto,
  ) {
    const filters = {
      channel: query.channel  ,
      rating: query.rating ? parseFloat(`${query.rating}`) : undefined,
      startDate: query.startDate,
      endDate: query.endDate,
      listingName: query.listingName,
    };
    return this.reviewsService.getHostawayReviews(filters);
  }

  @Public()
  @Get('listings')
  async getListings() {
    return this.reviewsService.getUniqueListings();
  }

  @Public()
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

  @Public()
  @Get('public')
  async getPublicReviews(
    @Query() query: GetReviewsDto,
  ) {
    return this.reviewsService.getPublicReviews(
      query.listingName,
      query.limit ? parseInt(`${query.limit}`) : undefined,
    );
  }
}

