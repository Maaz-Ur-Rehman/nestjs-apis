import { IsEmail, IsEnum, IsNotEmpty, isNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateSignUpDto{
    @IsNotEmpty()
    @IsString()
    name: string;
    @IsNotEmpty()
    @IsString()
    @IsEmail({},{message:"please enter correct email"})
    
    email: string;
    @IsNotEmpty()
    @IsString()
    password: string;
    
}