import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}