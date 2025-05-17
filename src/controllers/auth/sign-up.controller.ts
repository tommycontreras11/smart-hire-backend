import { Request, Response } from "express";
import { signUpService } from "./../../services/auth/sign-up.service";
import { statusCode } from "./../../utils/status.util";

export const signUpController = async (req: Request, res: Response) => {
  signUpService(req.body)
    .then((data) => res.status(statusCode.CREATED).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
}