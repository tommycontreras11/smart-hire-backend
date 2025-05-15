import { Request, Response } from "express";
import { createWorkExperienceService } from "../../services/work-experience/create.service";
import { statusCode } from "../../utils/status.util";

export const createWorkExperienceController = async (req: Request, res: Response) => {
  createWorkExperienceService(req.body)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
