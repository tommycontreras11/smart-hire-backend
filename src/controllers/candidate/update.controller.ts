import { Request, Response } from "express";
import { updateCandidateService } from "../../services/candidate/update.service";
import { statusCode } from "../../utils/status.util";

export const updateCandidateController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  console.log(uuid)

  updateCandidateService(uuid, req.body)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
