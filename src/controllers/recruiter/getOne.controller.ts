import { Request, Response } from "express";
import { getOneRecruiterService } from "../../services/recruiter/getOne.service";
import { statusCode } from "../../utils/status.util";

export const getOneRecruiterController = async (
  req: Request,
  res: Response
) => {
  const { uuid } = req.params;

  getOneRecruiterService({
    where: {
      uuid,
    },
    relations: {
      institution: true,
    },
  })
    .then((data) => {
      const recruiter = {
        uuid: data.uuid,
        identification: data.identification,
        name: data.name,
        password: data.password,
        institution: {
          uuid: data.institution.uuid,
          name: data.institution.name,
        },
        status: data.status,
      };

      res.status(statusCode.OK).json({ data: recruiter });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
