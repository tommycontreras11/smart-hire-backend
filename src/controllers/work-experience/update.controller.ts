import { Request, Response } from "express";
import { updateWorkExperienceService } from "../../services/work-experience/update.service";
import { statusCode } from "../../utils/status.util";

export const updateWorkExperienceController = async (
  req: Request,
  res: Response
) => {
  const { uuid } = req.params;
  updateWorkExperienceService(uuid, req.body)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
