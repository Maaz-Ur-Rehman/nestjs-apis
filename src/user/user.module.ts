// src/user/user.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserSchema } from './schemas/user.schema';
import { OtpModule } from '../otp/otp.module'; // Import OtpModule
import { MailModule } from '../mail/mail.module'; // Import MailModule

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Facility', schema: UserSchema }]), // Make sure this is 'User', not 'Facility'
    OtpModule, // Import OtpModule
    MailModule, // Import MailModule
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
