import { emailConfig } from "./../../config";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: emailConfig.user,
    pass: emailConfig.password,
  },
  tls: {
    rejectUnauthorized: false,
  },
  port: 465,
});

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  try {
    await transporter.sendMail({
      from: `Tommy <${emailConfig.user}>`,
      to,
      subject,
      html,
    });

    return { success: true, error : null };
  } catch (error) {
    return { success: false, error };
  }
}
