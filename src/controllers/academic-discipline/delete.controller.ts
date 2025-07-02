import { Request, Response } from "express";
import { deleteAcademicDisciplineService } from "../../services/academic-discipline/delete.service";
import { statusCode } from "../../utils/status.util";

export const deleteAcademicDisciplineController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  deleteAcademicDisciplineService(uuid)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
