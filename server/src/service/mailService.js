
import nodemailer from 'nodemailer';

const transporter =  nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'kushalchowdary23@gmail.com',
      pass: 'aogu vsny nwci gafr', // Use App Passwords for security
    },
});

export const mailService ={
    sendForgotPasswordMail : async (to,password)=>{

        const subject = "Forgot Password Mail";
        const text = `Your Password is ${password}`;

        try {
            await transporter.sendMail({
              from: 'kushalchowdary23@gmail.com',
              to,
              subject,
              text,
            });
        
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    },
    sendNewPasswordMail : async (to,password)=>{
        const subject = "Your Password";
        const text = `Hi and Welcome, Your Password is ${password}`;

        try {
            await transporter.sendMail({
              from: 'kushalchowdary23@gmail.com',
              to,
              subject,
              text,
            });
        
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}