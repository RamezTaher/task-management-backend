import { IsNotEmpty } from 'class-validator';

export class CreateInterventionTypeDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;
}
