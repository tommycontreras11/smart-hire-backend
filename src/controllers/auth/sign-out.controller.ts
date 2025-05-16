import { Request, Response } from "express";
import { statusCode } from "./../../utils/status.util";

export const signOutController = (_req: Request, res: Response) => {
  res
    .clearCookie("token")
    .status(statusCode.OK)
    .json({ message: "Signed out" });
};
