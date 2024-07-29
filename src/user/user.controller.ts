// user.controller.ts
import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { Response } from 'express';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('register')
    async register(@Body() userDto: UserDto) {
       return this.userService.register(userDto);
            
      
    }
}
