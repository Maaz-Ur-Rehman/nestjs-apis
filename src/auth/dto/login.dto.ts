import { IsEmail, IsEnum, IsNotEmpty, isNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateLogInDto{
 
    @IsNotEmpty()
    @IsString()
    @IsEmail( {},{message:"Please enter emal"})
    email: string;
    @IsNotEmpty()
    @IsString()
    password: string;
    

}