import { Request, Response } from "express";
import { updateJobSourceService } from "../../services/job-source/update.service";
import { statusCode } from "../../utils/status.util";

export const updateJobSourceController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  updateJobSourceService(uuid, req.body)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
