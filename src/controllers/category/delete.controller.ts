import { Request, Response } from "express";
import { deleteCategoryService } from "../../services/category/delete.service";
import { statusCode } from "../../utils/status.util";

export const deleteCategoryController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  deleteCategoryService(uuid)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
