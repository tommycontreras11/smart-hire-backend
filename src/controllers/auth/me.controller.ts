import { Request, Response } from "express";
import { meService } from "./../../services/auth/me.service";
import { statusCode } from "./../../utils/status.util";
import { ObjectStorage } from "./../../libs/object-storage";

export const meController = async (req: Request, res: Response) => {
  meService(req?.user?.uuid)
    .then(async ({ user, userType }) => {
      const storage = ObjectStorage.instance

      const data = {
        uuid: user.uuid,
        identification: user.identification,
        email: user.email,
        name: user.name,
        role: userType,
        ...(user.photo && {
          photo: await storage.getUrl(user.photo)
        })
      };

      return res.status(statusCode.OK).json({ data });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
