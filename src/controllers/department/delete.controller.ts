import { Request, Response } from "express";
import { deleteDepartmentService } from "../../services/department/delete.service";
import { statusCode } from "../../utils/status.util";

export const deleteDepartmentController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  deleteDepartmentService(uuid)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
