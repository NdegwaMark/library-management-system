import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
  Min,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsNotEmpty()
  @Length(10, 13)
  isbn: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  totalCopies: number;

  @Type(() => Number)
  @IsInt()
  genreId: number;
}
