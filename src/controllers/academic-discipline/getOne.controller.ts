import { Request, Response } from "express";
import { getOneAcademicDisciplineService } from "../../services/academic-discipline/getOne.service";
import { statusCode } from "../../utils/status.util";

export const getOneAcademicDisciplineController = async (
  req: Request,
  res: Response
) => {
  const { uuid } = req.params;

  getOneAcademicDisciplineService({
    where: {
      uuid,
    },
  })
    .then((data) => {
      const academicDiscipline = {
        uuid: data.uuid,
        name: data.name,
        description: data.description,
        status: data.status,
      };

      res.status(statusCode.OK).json({ data: academicDiscipline });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
