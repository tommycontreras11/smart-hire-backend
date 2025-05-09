import { Request, Response } from "express";
import { getOneCategoryService } from "../../services/category/getOne.service";
import { statusCode } from "../../utils/status.util";

export const getOneCategoryController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  getOneCategoryService({
    where: {
      uuid,
    },
  })
    .then((data) => {
      const category = {
        uuid: data.uuid,
        name: data.name,
        status: data.status,
      };

      res.status(statusCode.OK).json({ data: category });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
