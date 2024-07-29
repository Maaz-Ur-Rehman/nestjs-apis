import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "./schemas/user.schema";
import { Model } from "mongoose";
import { JwtSecretRequestType } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";



@Injectable()


export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
        private readonly configService: ConfigService
    ){
        super(
            {
             jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
             secretOrKey: configService.get<string>('JWT_SECRET'),
            }
        )
    }

    async validate(payload){
        const {id}=payload
        const user = await this.userModel.findById(id);

        if(!user) throw new UnauthorizedException('Login first to access the user')

        return user
}}