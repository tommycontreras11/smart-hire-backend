import { Request, Response } from "express";
import { getAllTrainingService } from "../../services/training/getAll.service";
import { statusCode } from "../../utils/status.util";
import { retrieveIfUserExists } from "./../../utils/user.util";
import { RecruiterEntity } from "./../../database/entities/entity/recruiter.entity";

export const getAllTrainingController = async (req: Request, res: Response) => {
  const user = req?.user;

  const validateUser = await retrieveIfUserExists(null, null, user.uuid);

  getAllTrainingService({
    relations: {
      institution: true,
    },
    ...(user && validateUser instanceof RecruiterEntity && {
      where: {
        institution: {
          uuid: validateUser?.institution?.uuid
        },
      }
    })
  })
    .then((data) => {
      const training = data.map((training) => ({
        uuid: training.uuid,
        name: training.name,
        description: training.description,
        level: training.level,
        date_from: training.date_from,
        date_to: training.date_to,
        institution: {
          uuid: training.institution.uuid,
          name: training.institution.name,
        },
        status: training.status,
      }));

      res.status(statusCode.OK).json({ data: training });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
