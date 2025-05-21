import { Request, Response } from "express";
import { getOneJobPositionService } from "../../services/job-position/getOne.service";
import { statusCode } from "../../utils/status.util";
import { timeAgo } from "./../../utils/date.util";

export const getOneJobPositionController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  getOneJobPositionService({
    where: {
      uuid,
    },
    relations: {
      country: true,
      language: true,
      recruiter: {
        institution: true,
      },
      competencies: true,
    }
  })
    .then((data) => {
      const jobPosition = {
        uuid: data.uuid,
        name: data.name,
        description: data.description,
        minimum_salary: data.minimum_salary,
        maximum_salary: data.maximum_salary,
        contract_type: data.contract_type,
        country: {
          uuid: data.country.uuid,
          name: data.country.name,
        },
        language: {
          uuid: data.language.uuid,
          name: data.language.name,
        },
        recruiter: {
          uuid: data.recruiter.uuid,
          name: data.recruiter.name,
          institution: {
            uuid: data.recruiter.institution.uuid,
            name: data.recruiter.institution.name,
          },
        },
        competencies: data.competencies.map((competency) => ({
          uuid: competency.uuid,
          name: competency.name,
        })),
        status: data.status,
        posted: timeAgo(data.createdAt),
      };

      res.status(statusCode.OK).json({ data: jobPosition });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
