import nodemailer from "nodemailer";

// Gmail SMTP needs an App Password (Google Account → Security → App passwords).
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export function sendMail(to: string, subject: string, text: string) {
  return transporter.sendMail({
    from: `"Yogalife Kolkata" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    text,
  });
}
