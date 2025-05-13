import { Request, Response } from "express";
import { getOneRecruiterService } from "../../services/recruiter/getOne.service";
import { statusCode } from "../../utils/status.util";

export const getOneRecruiterController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  getOneRecruiterService({
    where: {
      uuid,
    },
  })
    .then((data) => {
      const recruiter = {
        uuid: data.uuid,
        name: data.name,
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
