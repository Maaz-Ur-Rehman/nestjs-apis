import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateSignUpDto } from './dto/signup.dto';
import { CreateLogInDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post('register')
    async createUser(@Body() userSignup:CreateSignUpDto): Promise<{token:string}>{
        return this.authService.register(userSignup)
    }

    @Post('login')
    async signInUser(@Body() userLogin:CreateLogInDto): Promise<{token:string}>{
        return this.authService.login(userLogin)
    }
}
