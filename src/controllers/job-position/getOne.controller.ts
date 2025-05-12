import { Request, Response } from "express";
import { getOneJobPositionService } from "../../services/job-position/getOne.service";
import { statusCode } from "../../utils/status.util";

export const getOneJobPositionController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  getOneJobPositionService({
    where: {
      uuid,
    },
  })
    .then((data) => {
      const jobPosition = {
        uuid: data.uuid,
        name: data.name,
        status: data.status,
      };

      res.status(statusCode.OK).json({ data: jobPosition });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
