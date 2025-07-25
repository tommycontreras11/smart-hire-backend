import { Request, Response } from "express";
import { getOneJobSourceService } from "../../services/job-source/getOne.service";
import { statusCode } from "../../utils/status.util";

export const getOneJobSourceController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  getOneJobSourceService({
    where: {
      uuid,
    },
  })
    .then((data) => {
      const JobSource = {
        uuid: data.uuid,
        name: data.name,
        status: data.status,
      };

      res.status(statusCode.OK).json({ data: JobSource });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
