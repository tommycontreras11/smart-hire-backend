import { Request, Response } from "express";
import { statusCode } from "../../utils/status.util";
import { sendInterviewEmailService } from "./../../services/email/sendInterviewEmail.service";

export const sendInterviewEmailController = async (req: Request, res: Response) => {
  sendInterviewEmailService(req.body)
    .then((data) => res.status(statusCode.CREATED).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
