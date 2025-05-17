import { Request, Response } from "express";
import { meService } from "./../../services/auth/me.service";
import { statusCode } from "./../../utils/status.util";
4;

export const meController = async (req: Request, res: Response) => {
  meService(req?.user?.uuid)
    .then(({ user, userType }) => {
      const data = {
        uuid: user.uuid,
        identification: user.identification,
        name: user.name,
        role: userType,
      };

      return res.status(statusCode.OK).json({ data });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
