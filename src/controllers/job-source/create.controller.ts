import { Request, Response } from "express";
import { createJobSourceService } from "../../services/job-source/create.service";
import { statusCode } from "../../utils/status.util";

export const createJobSourceController = async (req: Request, res: Response) => {
  createJobSourceService(req.body)
    .then((data) => res.status(statusCode.CREATED).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
