import { Request, Response } from "express";
import { deleteCandidateService } from "../../services/candidate/delete.service";
import { statusCode } from "../../utils/status.util";

export const deleteCandidateController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  deleteCandidateService(uuid)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
