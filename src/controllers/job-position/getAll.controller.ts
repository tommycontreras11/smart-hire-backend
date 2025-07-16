import { Request, Response } from "express";
import { getAllJobPositionService } from "../../services/job-position/getAll.service";
import { statusCode } from "../../utils/status.util";
import { StatusRequestEnum } from "./../../constants";
import { timeAgo } from "./../../utils/date.util";

export const getAllJobPositionController = async (
  req: Request,
  res: Response
) => {
  const jobOrSkill = req.query.jobOrSkill?.toString().trim();
  const location = req.query.location?.toString().trim();
  const contractType = req.query.contractType?.toString().trim();

  getAllJobPositionService({ jobOrSkill, location, contractType })
    .then((data) => {
      const jobPositions = data.map((jobPosition) => ({
        uuid: jobPosition.uuid,
        name: jobPosition.name,
        description: jobPosition.description,
        minimum_salary: jobPosition.minimum_salary,
        maximum_salary: jobPosition.maximum_salary,
        work_type: jobPosition.work_type,
        work_location: jobPosition.work_location,
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
        department: {
          uuid: jobPosition.department.uuid,
          name: jobPosition.department.name,
        },
        positionType: {
          uuid: jobPosition.positionType.uuid,
          name: jobPosition.positionType.name,
        },
        competencies: jobPosition.competencies.map((competency) => ({
          uuid: competency.uuid,
          name: competency.name,
        })),
        total_applied:
          jobPosition?.requests?.filter(
            (r) => r?.status === StatusRequestEnum.SUBMITTED
          )?.length ?? 0,
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
