import { Request, Response } from "express";
import { statusCode } from "../../utils/status.util";
import { uploadCandidateCvService } from "./../../services/candidate/uploadCv.service";

export const uploadCandidateCvController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  uploadCandidateCvService(req?.file, uuid)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
