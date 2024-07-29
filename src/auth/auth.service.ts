import { Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { CreateSignUpDto } from './dto/signup.dto';
import {CreateLogInDto} from './dto/login.dto'
@Injectable()
export class AuthService {

    constructor (
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
        private  jwtService: JwtService
    ){}


    async register(@Body() signUpDto:CreateSignUpDto): Promise<{token:string}> {

        
        const {name,email,password} = signUpDto
        const hashPassword = await bcrypt.hash(password,10)

        // console.log(hashPassword)
      

        const user=await this.userModel.create({
            name:name,
            email:email,
            password:hashPassword
        })


        const token=this.jwtService.sign({id:user._id})

        return {token}
    }

    async login(@Body() loginDto:CreateLogInDto) : Promise<{token:string}> {
        const {email,password} = loginDto

        const user = await this.userModel.findOne({email:email})
        if(!user){
            throw new UnauthorizedException('Invalid Email or Password')
        }
        const bcryptPass= await bcrypt.compare(password,user.password)
        if(!bcryptPass){
            throw new UnauthorizedException('Invalid Email or Password')
        }
        
        const token=this.jwtService.sign({id:user._id})

        return {token}
    }
}
