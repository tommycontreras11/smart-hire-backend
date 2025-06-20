import { Request, Response } from "express";
import { sendHiredEmailService } from "./../../services/email/sendHiredEmail.service";
import { statusCode } from "../../utils/status.util";

export const sendHiredEmailController = async (req: Request, res: Response) => {
  sendHiredEmailService(req.body)
    .then((data) => res.status(statusCode.CREATED).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
