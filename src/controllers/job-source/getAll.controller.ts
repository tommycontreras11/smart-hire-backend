import { Request, Response } from "express";
import { getAllJobSourceService } from "../../services/job-source/getAll.service";
import { statusCode } from "../../utils/status.util";

export const getAllJobSourceController = async (_req: Request, res: Response) => {
  getAllJobSourceService({})
    .then((data) => {
      const jobSources = data.map((jobSource) => ({
        uuid: jobSource.uuid,
        name: jobSource.name,
        status: jobSource.status,
      }));

      res.status(statusCode.OK).json({ data: jobSources });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
