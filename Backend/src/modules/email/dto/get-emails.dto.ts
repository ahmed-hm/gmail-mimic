import { IsNumber, Max, Min } from 'class-validator';

export class GetEmailsDto {
  @IsNumber()
  @Min(1)
  page: number = 1;

  @IsNumber()
  @Min(1)
  @Max(100)
  limit: number = 10;
}
