import { Request, Response } from "express";
import { createDepartmentService } from "../../services/department/create.service";
import { statusCode } from "../../utils/status.util";

export const createDepartmentController = async (req: Request, res: Response) => {
  createDepartmentService(req.body)
    .then((data) => res.status(statusCode.CREATED).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
