import { Request, Response } from "express";
import { deleteJobPositionService } from "../../services/job-position/delete.service";
import { statusCode } from "../../utils/status.util";

export const deleteJobPositionController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  deleteJobPositionService(uuid)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
