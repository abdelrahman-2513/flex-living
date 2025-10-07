import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [ConfigModule, ReviewsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
