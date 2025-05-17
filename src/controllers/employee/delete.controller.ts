import { Request, Response } from "express";
import { deleteEmployeeService } from "../../services/employee/delete.service";
import { statusCode } from "../../utils/status.util";

export const deleteEmployeeController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  deleteEmployeeService(uuid)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
