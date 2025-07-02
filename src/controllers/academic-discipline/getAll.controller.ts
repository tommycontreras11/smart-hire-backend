import { Request, Response } from "express";
import { getAllAcademicDisciplineService } from "../../services/academic-discipline/getAll.service";
import { statusCode } from "../../utils/status.util";

export const getAllAcademicDisciplineController = async (_req: Request, res: Response) => {
  getAllAcademicDisciplineService({})
    .then((data) => {
      const academicDisciplines = data.map((academicDiscipline) => ({
        uuid: academicDiscipline.uuid,
        name: academicDiscipline.name,
        description: academicDiscipline.description,
        status: academicDiscipline.status,
      }));

      res.status(statusCode.OK).json({ data: academicDisciplines });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
