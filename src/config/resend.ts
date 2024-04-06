import { Resend } from 'resend';
require('dotenv').config();

const resendApi_key = process.env.RESEND_API_KEY
const resend = new Resend(resendApi_key);

export default resend


// trial
// resend.emails.send({
//   from: 'onboarding@resend.dev',
//   to: 'sanjanay751@gmail.com',
//   subject: 'Hello World',
//   html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
// });