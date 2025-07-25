import { Request, Response } from "express";
import { deleteJobSourceService } from "../../services/job-source/delete.service";
import { statusCode } from "../../utils/status.util";

export const deleteJobSourceController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  deleteJobSourceService(uuid)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
