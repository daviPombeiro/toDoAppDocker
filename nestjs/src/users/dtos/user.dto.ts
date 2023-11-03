import { IsEmail, IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class UserDto {
    @IsNumber()
    userId: number;

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