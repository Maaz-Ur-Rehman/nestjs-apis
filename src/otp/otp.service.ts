// src/otp/otp.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Otp } from './schemas/otp.schema';

@Injectable()
export class OtpService {
  constructor(
    @InjectModel('Otp') private readonly otpModel: Model<Otp>,
  ) {}

  async generateOtp(email: string): Promise<Otp> {
    const otpCode = this.generateRandomString(4); // Generate a 4-digit OTP
    const otp = new this.otpModel({
      email,
      code: otpCode,
      expiresIn: new Date(Date.now() + 1 * 60 * 1000), // Set expiration time as 2 minutes
    });
    await otp.save();
    return otp;
  }

  private generateRandomString(length: number): string {
    const characters = '0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
}
