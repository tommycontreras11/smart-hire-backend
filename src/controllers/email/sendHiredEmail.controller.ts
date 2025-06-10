import { Request, Response } from "express";
import { sendInterviewEmailService } from "./../../services/email/sendInterviewEmail.service";
import { statusCode } from "../../utils/status.util";

export const sendInterviewEmailController = async (req: Request, res: Response) => {
  sendInterviewEmailService(req.body)
    .then((data) => res.status(statusCode.CREATED).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
