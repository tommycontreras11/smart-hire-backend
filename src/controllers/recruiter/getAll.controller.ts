import { Request, Response } from "express";
import { getAllRecruiterService } from "../../services/recruiter/getAll.service";
import { statusCode } from "../../utils/status.util";

export const getAllRecruiterController = async (_req: Request, res: Response) => {
  getAllRecruiterService({
    relations: {
      institution: true
    }
  })
    .then((data) => {
      const recruiters = data.map((recruiter) => ({
        uuid: recruiter.uuid,
        identification: recruiter.identification,
        name: recruiter.name,
        password: recruiter.password,
        institution: {
          uuid: recruiter.institution.uuid,
          name: recruiter.institution.name
        },
        status: recruiter.status,
      }));

      res.status(statusCode.OK).json({ data: recruiters });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
