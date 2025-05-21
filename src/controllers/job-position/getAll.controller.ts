import { Request, Response } from "express";
import { getAllJobPositionService } from "../../services/job-position/getAll.service";
import { statusCode } from "../../utils/status.util";
import { timeAgo } from "./../../utils/date.util";

export const getAllJobPositionController = async (_req: Request, res: Response) => {
  getAllJobPositionService({
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
      const jobPositions = data.map((jobPosition) => ({
        uuid: jobPosition.uuid,
        name: jobPosition.name,
        description: jobPosition.description,
        minimum_salary: jobPosition.minimum_salary,
        maximum_salary: jobPosition.maximum_salary,
        contract_type: jobPosition.contract_type,
        country: {
          uuid: jobPosition.country.uuid,
          name: jobPosition.country.name,
        },
        language: {
          uuid: jobPosition.language.uuid,
          name: jobPosition.language.name,
        },
        recruiter: {
          uuid: jobPosition.recruiter.uuid,
          name: jobPosition.recruiter.name,
          institution: {
            uuid: jobPosition.recruiter.institution.uuid,
            name: jobPosition.recruiter.institution.name,
          },
        },
        competencies: jobPosition.competencies.map((competency) => ({
          uuid: competency.uuid,
          name: competency.name,
        })),
        status: jobPosition.status,
        posted: timeAgo(jobPosition.createdAt),
      }));

      res.status(statusCode.OK).json({ data: jobPositions });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
