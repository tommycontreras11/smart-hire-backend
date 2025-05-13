import { Request, Response } from "express";
import { getOneRequestService } from "../../services/request/getOne.service";
import { statusCode } from "../../utils/status.util";

export const getOneRequestController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  getOneRequestService({
    where: {
      uuid,
    },
    relations: {
      candidate: true,
      jobPosition: true,
      recruiter: true,
    }
  })
    .then((data) => {
      const request = {
        uuid: data.uuid,
        candidate: {
          uuid: data.candidate.uuid,
          name: data.candidate.name,
        },
        jobPosition: {
          uuid: data.jobPosition.uuid,
          name: data.jobPosition.name,
        },
        recruiter: {
          uuid: data.recruiter.uuid,
          name: data.recruiter.name,
        },
        status: data.status,
      };

      res.status(statusCode.OK).json({ data: request });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
