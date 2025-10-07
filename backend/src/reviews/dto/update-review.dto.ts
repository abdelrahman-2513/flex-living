import { IsBoolean } from 'class-validator';

export class UpdateReviewDto {
  @IsBoolean()
  isPublic: boolean;
}

