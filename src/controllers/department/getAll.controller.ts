import { Request, Response } from "express";
import { getAllDepartmentService } from "../../services/department/getAll.service";
import { statusCode } from "../../utils/status.util";

export const getAllDepartmentController = async (_req: Request, res: Response) => {
  getAllDepartmentService({})
    .then((data) => {
      const departments = data.map((department) => ({
        uuid: department.uuid,
        name: department.name,
        status: department.status,
      }));

      res.status(statusCode.OK).json({ data: departments });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
