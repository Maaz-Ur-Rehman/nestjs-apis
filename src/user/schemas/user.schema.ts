// user.schema.ts
import * as mongoose from 'mongoose';

export const rolesEnum = ['super-admin', 'care-givers', 'patient', 'corporate'];

export const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    confirmPass: { type: String, required: true },
    role: { type: String, default: 'patient', enum: rolesEnum },
    otp: { type: String },
    otpExpires: { type: Date },
}, { timestamps: true });

export interface User extends mongoose.Document {}

export default mongoose.model<User>('User', UserSchema);
