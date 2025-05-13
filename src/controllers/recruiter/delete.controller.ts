import { Request, Response } from "express";
import { deleteRecruiterService } from "../../services/recruiter/delete.service";
import { statusCode } from "../../utils/status.util";

export const deleteRecruiterController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  deleteRecruiterService(uuid)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
