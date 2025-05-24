import { Request, Response } from "express";
import { getOneCompetencyService } from "../../services/competency/getOne.service";
import { statusCode } from "../../utils/status.util";

export const getOneCompetencyController = async (
  req: Request,
  res: Response
) => {
  const { uuid } = req.params;

  getOneCompetencyService({
    where: {
      uuid,
    },
    relations: {
      category: true,
      evaluationMethods: true,
      positionTypes: true,
    },
  })
    .then((data) => {
      const competency = {
        uuid: data.uuid,
        name: data.name,
        category: {
          uuid: data.category.uuid,
          name: data.category.name,
        },
        level: data.level,
        evaluationMethods: data.evaluationMethods.map((evaluationMethod) => ({
          uuid: evaluationMethod.uuid,
          name: evaluationMethod.name,
        })),
        positionTypes: data.positionTypes.map((positionType) => ({
          uuid: positionType.uuid,
          name: positionType.name,
        })),
        status: data.status,
      };

      res.status(statusCode.OK).json({ data: competency });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
