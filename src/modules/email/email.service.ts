import { Injectable } from '@nestjs/common';
import {Resend} from 'resend'

@Injectable()
export class EmailService {
  private resend: Resend;


  constructor(){
   this.resend = new Resend(process.env.RESEND_KEY)
  }

  otp(to: string,otp: string){
   this.resend.emails.send({
      from: 'onboarding@resend.dev',
      to,
      subject: 'OTP',
      html: `<p>code: ${otp}</p>`
    });
  }
}
