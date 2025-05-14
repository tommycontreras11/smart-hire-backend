import { Request, Response } from "express";
import { getOneJobPositionService } from "../../services/job-position/getOne.service";
import { statusCode } from "../../utils/status.util";

export const getOneJobPositionController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  getOneJobPositionService({
    where: {
      uuid,
    },
    relations: {
      country: true,
      language: true,
      recruiter: true,
    }
  })
    .then((data) => {
      const jobPosition = {
        uuid: data.uuid,
        name: data.name,
        description: data.description,
        minimum_salary: data.minimum_salary,
        maximum_salary: data.maximum_salary,
        risk_level: data.risk_level,
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
        },
        status: data.status,
      };

      res.status(statusCode.OK).json({ data: jobPosition });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
