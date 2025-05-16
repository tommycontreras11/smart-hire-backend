import { Request, Response } from "express";
import { getOneCandidateService } from "../../services/candidate/getOne.service";
import { statusCode } from "../../utils/status.util";

export const getOneCandidateController = async (
  req: Request,
  res: Response
) => {
  const { uuid } = req.params;

  getOneCandidateService({
    where: {
      uuid,
    },
    relations: {
      desiredPosition: true,
      department: true,
      workExperience: true,
    },
  })
    .then((data) => {
      const candidate = {
        uuid: data.uuid,
        identification: data.identification,
        name: data.name,
        password: data.password,
        desired_salary: data.desired_salary,
        desiredPosition: {
          uuid: data.desiredPosition.uuid,
          name: data.desiredPosition.name,
        },
        department: {
          uuid: data.department.uuid,
          name: data.department.name,
        },
        ...(data.workExperience && {
          workExperience: {
            uuid: data.workExperience.uuid,
            company: data.workExperience.company,
          },
        }),
        status: data.status,
      };

      res.status(statusCode.OK).json({ data: candidate });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
