// user.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as CryptoJS from 'crypto-js';
import { UserDto } from './dto/user.dto';
import { OtpService } from '../otp/otp.service';
import { MailService } from '../mail/mail.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('Facility') private readonly userModel: Model<User>,
    private readonly otpService: OtpService,
    private readonly mailService: MailService
  ) {}

  async register(userDto: UserDto): Promise<any> {
    const { email, password, confirmPass, role } = userDto;

    if (role === 'patient') {
      const existingUser = await this.userModel.findOne({ email }).exec();
      if (existingUser) {
        throw new BadRequestException('This e-mail is already in use!');
      }

      if (password !== confirmPass) {
        throw new BadRequestException('Password and confirm password are not the same');
      }

      const encryptedPassword = CryptoJS.AES.encrypt(password, "12345678").toString();

      const newUser = await this.userModel.create({
        email,
        password: encryptedPassword,
        confirmPass,
        role,
      });

      const otp = await this.otpService.generateOtp(email);
      await this.mailService.sendOtpEmail(email, otp.code);

      const response = {
        // Spread operator to include user details
        msg: 'Please Check Your Email'
      };

      return response;
    } else {
      throw new BadRequestException('Unsupported role');
    }
  }
}
