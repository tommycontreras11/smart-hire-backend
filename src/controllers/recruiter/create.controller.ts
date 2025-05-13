import { Request, Response } from "express";
import { createRecruiterService } from "../../services/recruiter/create.service";
import { statusCode } from "../../utils/status.util";

export const createRecruiterController = async (req: Request, res: Response) => {
  createRecruiterService(req.body)
    .then((data) => res.status(statusCode.CREATED).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
