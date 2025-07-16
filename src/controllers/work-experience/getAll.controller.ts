import { Request, Response } from "express";
import { getAllWorkExperienceService } from "../../services/work-experience/getAll.service";
import { statusCode } from "../../utils/status.util";

export const getAllWorkExperienceController = async (_req: Request, res: Response) => {
  getAllWorkExperienceService({})
    .then((data) => {
      const workExperiences = data.map((workExperience) => ({
        uuid: workExperience.uuid,
        // company: workExperience.company,
        status: workExperience.status,
      }));

      res.status(statusCode.OK).json({ data: workExperiences });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
