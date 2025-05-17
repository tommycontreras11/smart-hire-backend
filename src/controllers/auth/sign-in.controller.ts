import { Request, Response } from "express";
import { signInService } from "./../../services/auth/sign-in.service";
import { statusCode } from "./../../utils/status.util";
import jsonwebtoken from "jsonwebtoken";

export const signInController = async (req: Request, res: Response) => {
  signInService(req.body)
    .then((data) => {
      const tokenExpiration = new Date(Date.now() + 1000 * 60 * 60 * 24);
      const originalToken = jsonwebtoken.sign(
        { uuid: data.uuid, expiration: tokenExpiration },
        process.env.ACCESS_TOKEN_SECRET!,
        {
          expiresIn: "24h",
        }
      );

      return res
        .cookie("access_token", originalToken, {
          httpOnly: true,
          sameSite: "lax",
          secure: false,
          expires: tokenExpiration,
        })
        .status(statusCode.OK)
        .json({ token: originalToken });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
