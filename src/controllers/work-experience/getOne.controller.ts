import { Request, Response } from "express";
import { getOneWorkExperienceService } from "../../services/work-experience/getOne.service";
import { statusCode } from "../../utils/status.util";

export const getOneWorkExperienceController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  getOneWorkExperienceService({
    where: {
      uuid,
    },
  })
    .then((data) => {
      const workExperience = {
        uuid: data.uuid,
        // company: data.company,
        status: data.status,
      };

      res.status(statusCode.OK).json({ data: workExperience });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
