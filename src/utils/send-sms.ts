import * as client from 'twilio';
import { twilio } from '../config/config';

export const sendOtp = async (phoneTo: string, otp: string) => {
  const sendSms = client(twilio.sid, twilio.token);

  await sendSms.messages.create({
    to: phoneTo,
    body: `Mã OTP để khôi phục mật khẩu là: ${otp}`,
    messagingServiceSid: twilio.service,
  });
};
