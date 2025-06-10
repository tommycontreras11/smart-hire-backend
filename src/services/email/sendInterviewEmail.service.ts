import { sendInterviewEmail } from "../../libs/email/send-interview";
import { SendInterviewEmailDTO } from "../../dto/email.dto";
import { statusCode } from "../../utils/status.util";
import { updateRequestService } from "./../../services/request/update.service";
import { StatusRequestEnum } from "./../../constants";

export async function sendInterviewEmailService({
  requestUUID,
  ...interviewEmail
}: SendInterviewEmailDTO) {
  const interviewEmailResponse = await sendInterviewEmail(interviewEmail);

  if (interviewEmailResponse.error)
    return Promise.reject({
      message: "Error sending email",
      status: statusCode.INTERNAL_SERVER_ERROR,
    });

  const formattedDate = new Date(interviewEmail.interviewDate).toLocaleString(
    "en-US",
    {
      timeZone: "UTC",
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  await updateRequestService(requestUUID, {
    status: StatusRequestEnum.INTERVIEW,
    nextStep: `Technical interview scheduled for ${formattedDate}`,
  });

  return "Email sent successfully";
}
