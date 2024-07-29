import { IsEmail, IsString, IsNotEmpty, IsIn } from 'class-validator';
import { rolesEnum } from '../schemas/user.schema';

export class UserDto {
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    confirmPass: string;

    @IsString()
    @IsNotEmpty()
    @IsIn(rolesEnum)
    role: string;
}