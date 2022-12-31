import { IsEmail, IsNotEmpty, Length } from 'class-validator';
export class createUserDto {
  @Length(5)
  @IsNotEmpty()
  username: string;
  @Length(8)
  @IsNotEmpty()
  password: string;
  @Length(8)
  @IsNotEmpty()
  retypedPassword: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
