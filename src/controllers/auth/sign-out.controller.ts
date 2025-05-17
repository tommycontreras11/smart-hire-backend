import { Request, Response } from "express";
import { statusCode } from "./../../utils/status.util";
import { blacklistToken } from "./../../utils/token.util";

export const signOutController = (req: Request, res: Response) => {
  const token = req.cookies.access_token || req.headers.authorization;
  if(token) {
    blacklistToken(token);
  }

  res
    .clearCookie("access_token")
    .status(statusCode.OK)
    .json({ message: "Successfully logged out" });
};
