import { Request, Response } from "express";
import { getAllJobPositionService } from "../../services/job-position/getAll.service";
import { statusCode } from "../../utils/status.util";

export const getAllJobPositionController = async (_req: Request, res: Response) => {
  getAllJobPositionService({})
    .then((data) => {
      const jobPositions = data.map((jobPosition) => ({
        uuid: jobPosition.uuid,
        name: jobPosition.name,
        status: jobPosition.status,
      }));

      res.status(statusCode.OK).json({ data: jobPositions });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
