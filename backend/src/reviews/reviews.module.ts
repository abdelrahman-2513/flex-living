import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { HostawayService } from './services/hostaway.service';

@Module({
  imports: [HttpModule],
  controllers: [ReviewsController],
  providers: [ReviewsService, HostawayService],
  exports: [ReviewsService],
})
export class ReviewsModule {}

