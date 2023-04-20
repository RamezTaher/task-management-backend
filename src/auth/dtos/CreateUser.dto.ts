import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(32)
  nom: string;

  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(32)
  prenom: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(8)
  cin: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(8)
  phone: string;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  date_naissance: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(32)
  password: string;
}
