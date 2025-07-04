import { Request, Response } from "express";
import { getOneEducationService } from "../../services/education/getOne.service";
import { statusCode } from "../../utils/status.util";

export const getOneEducationController = async (
  req: Request,
  res: Response
) => {
  const { uuid } = req.params;

  getOneEducationService({
    relations: {
      institution: true,
      academicDiscipline: true
    },
    where: {
      uuid,
    },
  })
    .then((data) => {
      const education = {
        title: data.title,
        grade: data.grade,
        description: data.description,
        start_date: data.start_date,
        end_date: data.end_date,
        institution: {
          uuid: data.institution.uuid,
          name: data.institution.name,
        },
        academicDiscipline: {
          uuid: data.academicDiscipline.uuid,
          name: data.academicDiscipline.name,
        },
        status: data.status,
      };

      return res.status(statusCode.OK).json({ data: education });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
