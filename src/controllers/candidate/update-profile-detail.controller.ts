import { Request, Response } from "express";
import { updateCandidateProfileDetailService } from "./../../services/candidate/update-profile-detail.service";
import { statusCode } from "../../utils/status.util";

export const updateCandidateProfileDetailController = async (
  req: Request,
  res: Response
) => {
  const { uuid } = req.params;

  updateCandidateProfileDetailService(uuid, req.body)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
