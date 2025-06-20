import { SendHiredEmailDTO } from "../../dto/email.dto";
import { sendHiredEmail } from "../../libs/email/send-hired-email";
import { statusCode } from "../../utils/status.util";

export async function sendHiredEmailService({
  requestUUID,
  ...hiredEmail
}: SendHiredEmailDTO) {
  const hiredEmailResponse = await sendHiredEmail(hiredEmail);

  if (hiredEmailResponse.error)
    return Promise.reject({
      message: "Error sending email",
      status: statusCode.INTERNAL_SERVER_ERROR,
    });

  return "Email sent successfully";
}
