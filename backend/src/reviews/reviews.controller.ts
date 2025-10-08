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
import { Public } from '../auth/decorators';
import { GetReviewsDto } from './dto/get-reviews.dto';
import { ResponseDto } from '../shared/dtos/respone.dto';
import {  NormalizedReview } from './interfaces/review.interface';
import { EResponse } from 'src/shared/enums/response.enum';

@Controller('api/reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get('hostaway')
  async getHostawayReviews(
    @Query() query: GetReviewsDto,
  ) : Promise<ResponseDto<NormalizedReview[]>> {
    const filters = {
      channel: query.channel  ,
      rating: query.rating ? parseFloat(`${query.rating}`) : undefined,
      startDate: query.startDate,
      endDate: query.endDate,
      listingName: query.listingName,
    };
    const reviews = await this.reviewsService.getHostawayReviews(filters);
    return {
      status: EResponse.SUCCESS,
      message: "Reviews fetched successfully",
      data: reviews,
    };
  }

  @Public()
  @Get('listings')
  async getListings() : Promise<ResponseDto<string[]>> {
    const listings = await this.reviewsService.getUniqueListings();
    return {
      status: EResponse.SUCCESS,
      message: "Listings fetched successfully",
      data: listings,
    };
  }

  @Public()
  @Get('channels')
  async getChannels() : Promise<ResponseDto<string[]>> {
    const channels = await this.reviewsService.getUniqueChannels();
    return {
      status: EResponse.SUCCESS,
      message: "Channels fetched successfully",
      data: channels,
    };
  }

  @Patch(':id/visibility')
  async updateReviewVisibility(
    @Param('id') id: string,
    @Body() updateDto: UpdateReviewDto,
  ) : Promise<ResponseDto<NormalizedReview>> {
    const updatedReview = await this.reviewsService.updateReviewVisibility(
      parseInt(id),
      updateDto.isPublic,
    );
    return {
      status: EResponse.SUCCESS,
      message: "Review visibility updated successfully",
      data: updatedReview,
    };
  }

  @Public()
  @Get('public')
  async getPublicReviews(
    @Query() query: GetReviewsDto,
  ) : Promise<ResponseDto<NormalizedReview[]>> {
    const publicReviews = await this.reviewsService.getPublicReviews(
      query.listingName,
      query.limit ? parseInt(`${query.limit}`) : undefined,
    );
    return {
      status: EResponse.SUCCESS,
      message: "Public reviews fetched successfully",
      data: publicReviews,
    };
  }
}

