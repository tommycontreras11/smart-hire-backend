import fs from "fs";
import mustache from "mustache";
import path from "path";
import { sendEmail } from "./send-email";

interface InterviewScheduledProps {
  candidateName: string;
  interviewDate: string;
  interviewTime: string;
  interviewerName: string;
  interviewLink: string;
}

export async function sendInterviewEmail({
  candidateName,
  interviewDate,
  interviewTime,
  interviewerName,
  interviewLink,
  to,
}: InterviewScheduledProps & { to: string }) {
  const templatePath = path.join(__dirname, "../../templates/email/interview/interview-template.mustache");

  const template = fs.readFileSync(templatePath, "utf8");

  const html = mustache.render(template, {
    candidateName,
    interviewDate,
    interviewTime,
    interviewerName,
    interviewLink,
  });

  return await sendEmail({ html, to, subject: "🎉 Congratulations! You've been scheduled for an interview!" });
}
