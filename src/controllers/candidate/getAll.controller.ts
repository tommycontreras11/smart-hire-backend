import { Request, Response } from "express";
import { getAllCandidateService } from "../../services/candidate/getAll.service";
import { statusCode } from "../../utils/status.util";

export const getAllCandidateController = async (_req: Request, res: Response) => {
  getAllCandidateService({
    relations: {
      desiredPosition: true,
      department: true,
      workExperience: true
    }
  })
    .then((data) => {
      const candidates = data.map((candidate) => ({
        uuid: candidate.uuid,
        identification: candidate.identification,
        name: candidate.name,
        password: "******",
        desired_salary: candidate.desired_salary,
        desiredPosition: {
          uuid: candidate.desiredPosition.uuid,
          name: candidate.desiredPosition.name,
        },
        department: {
          uuid: candidate.department.uuid,
          name: candidate.department.name,
        },
        ...(candidate.workExperience && {
          workExperience: {
            uuid: candidate.workExperience.uuid,
            company: candidate.workExperience.company
          },
        }),
        status: candidate.status,
      }));

      res.status(statusCode.OK).json({ data: candidates });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
