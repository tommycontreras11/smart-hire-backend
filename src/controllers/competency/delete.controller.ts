import { Request, Response } from "express";
import { deleteCompetencyService } from "../../services/competency/delete.service";
import { statusCode } from "../../utils/status.util";

export const deleteCompetencyController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  deleteCompetencyService(uuid)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
