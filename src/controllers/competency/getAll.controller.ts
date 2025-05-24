import { Request, Response } from "express";
import { getAllCompetencyService } from "../../services/competency/getAll.service";
import { statusCode } from "../../utils/status.util";

export const getAllCompetencyController = async (_req: Request, res: Response) => {
  getAllCompetencyService({
    relations: {
      category: true,
      evaluationMethods: true,
      positionTypes: true,
    }
  })
    .then((data) => {
      const competencies = data.map((competency) => ({
        uuid: competency.uuid,
        name: competency.name,
        category: {
          uuid: competency.category.uuid,
          name: competency.category.name,
        },
        level: competency.level,
        evaluationMethods: competency.evaluationMethods.map((evaluationMethod) => ({
          uuid: evaluationMethod.uuid,
          name: evaluationMethod.name,
        })),
        positionTypes: competency.positionTypes.map((positionType) => ({
          uuid: positionType.uuid,
          name: positionType.name,
        })),
        status: competency.status,
      }));

      res.status(statusCode.OK).json({ data: competencies });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
