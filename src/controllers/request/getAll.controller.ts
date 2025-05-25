import { Request, Response } from "express";
import { getAllRequestService } from "../../services/request/getAll.service";
import { statusCode } from "../../utils/status.util";

export const getAllRequestController = async (_req: Request, res: Response) => {
  getAllRequestService({
    relations: {
      candidate: true,
      jobPosition: true,
      recruiter: true
    }
  })
    .then((data) => {
      const requests = data.map((request) => ({
        uuid: request.uuid,
        candidate: {
          uuid: request.candidate.uuid,
          name: request.candidate.name,
        },
        jobPosition: {
          uuid: request.jobPosition.uuid,
          name: request.jobPosition.name,
        },
        recruiter: {
          uuid: request.recruiter.uuid,
          name: request.recruiter.name,
        },
        status: request.status,
      }));

      res.status(statusCode.OK).json({ data: requests });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
