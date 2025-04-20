/* eslint-disable @typescript-eslint/no-explicit-any */
import nodemailer  from 'nodemailer';
import User from '@/model/user.model';
import bcryptjs from 'bcryptjs';

async function sendMail(to: any, mailOption: { from: string | undefined; to: any; subject: string; html: string; }) {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASSWORD,
            },
        });

        const mailOptions = mailOption;

        const result = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + result.response);
        return result;
    } catch (error) {
        return error;
    }
}

const sendVerMail = async ({ email, emailType, userId }: { email: string; emailType: string; userId: string }) => {
    try {
        if (!['verify', 'forgot'].includes(emailType)) {
            throw new Error('Invalid email type');
        }

        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        const hashedToken = await bcryptjs.hash(userId.toString(), 10);
        const tokenField = emailType === 'verify' ? 'verificationToken' : 'resetPasswordToken';
        const expiryField = emailType === 'verify' ? 'verificationTokenExpiry' : 'resetPasswordTokenExpiry';
        const domain = process.env.NODE_ENV === 'production' ? process.env.DOMAIN : 'http://localhost:3000';

        user[tokenField] = hashedToken;
        user[expiryField] = Date.now() + 3600000; // 1 hour
        await user.save();


        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: email,
            subject: emailType === 'verify' ? 'Verify your email' : 'Reset your password',
            html: `
                <h1>${emailType === 'verify' ? 'Verify your email' : 'Reset your password'}</h1>
                <p>Click on the link below to ${emailType === 'verify' ? 'verify your email' : 'reset your password'}</p>
                <a href="${domain}/auth/verify?emailType=${emailType}&token=${hashedToken}">
                    ${domain}/auth/verify?emailType=${emailType}&token=${hashedToken}
                </a>
            `,
        };
        // console.log("Mail Options: ", mailOptions);
        const mailResponse = await sendMail(email, mailOptions);
        // console.log("Mail Response: ", mailResponse);
        return mailResponse;
    } catch (error:any) {
        throw new Error(`Failed to send email: ${error.message}`);
    }
};

export { sendMail, sendVerMail };