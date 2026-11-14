import { IsEmail, IsIn, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  // Optional so you can create a LIBRARIAN for testing. Remove in production.
  @IsOptional()
  @IsIn(['MEMBER', 'LIBRARIAN'])
  role?: string;
}
