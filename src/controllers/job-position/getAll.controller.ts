import { Request, Response } from "express";
import { getAllJobPositionService } from "../../services/job-position/getAll.service";
import { statusCode } from "../../utils/status.util";
import { StatusRequestEnum } from "./../../constants";
import { timeAgo } from "./../../utils/date.util";

export const getAllJobPositionController = async (_req: Request, res: Response) => {
  getAllJobPositionService({
    relations: {
      country: true,
      language: true,
      recruiter: {
        institution: true,
      },
      requests: true,
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
        total_applied: jobPosition?.requests?.filter((r) => r?.status === StatusRequestEnum.SUBMITTED)?.length ?? 0,
        status: jobPosition.status,
        posted: timeAgo(jobPosition.createdAt),
        date_posted: jobPosition.createdAt,
        due_date: jobPosition.due_date,
      }));

      res.status(statusCode.OK).json({ data: jobPositions });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
