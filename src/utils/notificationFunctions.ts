import resend from "../config/resend";
require('dotenv').config();

const senderEmail = process.env.SENDER || "sanjanay751@gmail.com"

export const sendRegistered = async (email, username) => {
    const message = `Dear ${username},\nThank you for registering with us. Your account has been successfully created.`;
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: 'Registration Confirmation',
        text: message,
    });
};

// course enrollment notifcation
export const sendCourseEnrolled = async (email, courseTitle) => {
    const message = `Dear User,\nYou have successfully enrolled in the course "${courseTitle}".`;
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: 'Course Enrollment Notification',
        text: message,
    });
    console.log("email sent to ", email)
};