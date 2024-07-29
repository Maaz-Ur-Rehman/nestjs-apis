import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { google, Auth } from 'googleapis'; // Import Auth type for OAuth2Client
import { ConfigService } from '@nestjs/config';

const OAuth2 = google.auth.OAuth2;

@Injectable()
export class MailService {
  private oauth2Client: Auth.OAuth2Client; // Use the correct type for OAuth2Client

  constructor(private configService: ConfigService) {
    this.oauth2Client = new OAuth2(
      this.configService.get<string>('GMAIL_CLIENT_ID'),
      this.configService.get<string>('GMAIL_CLIENT_SECRET'),
      'https://developers.google.com/oauthplayground'
    );

    this.oauth2Client.setCredentials({
      refresh_token: this.configService.get<string>('GMAIL_REFRESH_TOKEN'),
    });
  }

  private async createTransporter() {
    const accessToken = await this.oauth2Client.getAccessToken();

    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: this.configService.get<string>('GMAIL_USER'),
        accessToken: accessToken.token,
        clientId: this.configService.get<string>('GMAIL_CLIENT_ID'),
        clientSecret: this.configService.get<string>('GMAIL_CLIENT_SECRET'),
        refreshToken: this.configService.get<string>('GMAIL_REFRESH_TOKEN'),
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  async sendOtpEmail(to: string, otp: string) {
    const transporter = await this.createTransporter();

    const mailOptions = {
      from: 'HealthCare@gmail.com',
      to,
      subject: 'OTP - HealthCare',
      html: `<p>Dear ${to.split('@')[0]},</p>
      <p>Your OTP for login to HealthCare is: <strong>${otp}</strong></p>
      <p>Regards,</p>
      <p>Admin</p>`,
    };

    return transporter.sendMail(mailOptions);
  }
}
