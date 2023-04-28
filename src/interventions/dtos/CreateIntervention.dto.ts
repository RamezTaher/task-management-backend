import { IsDate, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';
import { Consultant } from 'src/utils/typeorm';

export class CreateInterventionDto {
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  startDate: string;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  endDate: string;
}
