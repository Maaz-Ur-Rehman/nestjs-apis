// src/otp/schemas/otp.schema.ts
import * as mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  code: { type: String, required: true },
  expiresIn: {
    type: Date,
    default: Date.now,
    expires: '1m', // The TTL index will expire documents 2 minutes after the `expiresIn` value
  },
}, { timestamps: true });

export const OtpSchema = otpSchema;

export interface Otp extends mongoose.Document {
  email: string;
  code: string;
  expiresIn: Date;
}


export default mongoose.model<Otp>('Otp', OtpSchema);
