import { Request, Response } from "express";
import { getOnePositionTypeService } from "../../services/position-type/getOne.service";
import { statusCode } from "../../utils/status.util";

export const getOnePositionTypeController = async (
  req: Request,
  res: Response
) => {
  const { uuid } = req.params;

  getOnePositionTypeService({
    where: {
      uuid,
    },
    relations: {
      department: true,
    },
  })
    .then((data) => {
      const positionType = {
        uuid: data.uuid,
        name: data.name,
        department: {
          uuid: data.department.uuid,
          name: data.department.name,
        },
        status: data.status,
      };

      res.status(statusCode.OK).json({ data: positionType });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
