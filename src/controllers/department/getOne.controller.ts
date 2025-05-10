import { Request, Response } from "express";
import { getOneDepartmentService } from "../../services/department/getOne.service";
import { statusCode } from "../../utils/status.util";

export const getOneDepartmentController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  getOneDepartmentService({
    where: {
      uuid,
    },
  })
    .then((data) => {
      const department = {
        uuid: data.uuid,
        name: data.name,
        status: data.status,
      };

      res.status(statusCode.OK).json({ data: department });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
