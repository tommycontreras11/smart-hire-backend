import { Request, Response } from "express";
import { getOneEducationService } from "../../services/education/getOne.service";
import { statusCode } from "../../utils/status.util";

export const getOneEducationController = async (
  req: Request,
  res: Response
) => {
  const { uuid } = req.params;

  getOneEducationService({
    where: {
      uuid,
    },
  })
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
