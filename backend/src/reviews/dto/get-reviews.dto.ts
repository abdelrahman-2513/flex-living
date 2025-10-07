import { IsNumber, IsOptional, IsString } from "class-validator";

export class GetReviewsDto {
    @IsOptional()
    @IsString()
    channel?: string;

    @IsOptional()
    @IsNumber()
    rating?: number;

    @IsOptional()
    @IsString()
    startDate?: string;

    @IsOptional()
    @IsString()
    endDate?: string;

    @IsOptional()
    @IsString()
    listingName?: string;

    @IsOptional()
    @IsNumber()
    limit?: number;
}