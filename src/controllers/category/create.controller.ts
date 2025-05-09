import { Request, Response } from "express";
import { createCategoryService } from "../../services/category/create.service";
import { statusCode } from "../../utils/status.util";

export const createCategoryController = async (req: Request, res: Response) => {
  createCategoryService(req.body)
    .then((data) => res.status(statusCode.CREATED).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
