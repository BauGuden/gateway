import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class RegisterUserDto {

    @IsString()
    name: string;
    
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(55)
    password: string;

}