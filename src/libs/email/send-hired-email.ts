import fs from "fs";
import path from "path";
import mustache from "mustache";
import { sendEmail } from "./send-email";

interface ICandidateHiredProps {
  candidateName: string;
  email: string
  positionTitle: string;
  startDate: string;
  hrContactName: string;
  hrContactEmail: string;
  offerLink: string;
}

export async function sendHiredEmail({
  candidateName,
  email,
  positionTitle,
  startDate,
  hrContactName,
  hrContactEmail,
  offerLink,
}: ICandidateHiredProps) {
  const templatePath = path.join(__dirname, "../../templates/email/hired/candidate-hired-template.mustache");
  
  const template = fs.readFileSync(templatePath, "utf8");

  const html = mustache.render(template, {
    candidateName,
    positionTitle,
    startDate,
    hrContactName,
    hrContactEmail,
    offerLink,
  });

  return await sendEmail({ html, to: email, subject: "🎉 Congratulations! You've been hired!" });
}
