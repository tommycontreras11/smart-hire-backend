import { SendHiredEmailDTO } from "../../dto/email.dto";
import { statusCode } from "../../utils/status.util";
import { sendHiredEmail } from "../../libs/email/send-hired-email";
import { updateRequestService } from "./../../services/request/update.service";
import { StatusRequestEnum } from "./../../constants";

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

  await updateRequestService(requestUUID, {
    status: StatusRequestEnum.HIRED,
    nextStep: "You have been hired 🔥",
  });

  return "Email sent successfully";
}
