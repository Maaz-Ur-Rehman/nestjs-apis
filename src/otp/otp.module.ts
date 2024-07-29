// src/otp/otp.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OtpService } from './otp.service';
import { OtpSchema } from './schemas/otp.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Otp', schema: OtpSchema }])],
  providers: [OtpService],
  exports: [OtpService], // Export OtpService
})
export class OtpModule {}
