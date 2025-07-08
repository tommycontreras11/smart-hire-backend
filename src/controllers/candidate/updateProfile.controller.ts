import { Request, Response } from "express";
import { updateCandidateProfileService } from "services/candidate/updateProfile.service";
import { statusCode } from "../../utils/status.util";

export const updateCandidateProfileController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  updateCandidateProfileService(uuid, req.body, req?.file)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
