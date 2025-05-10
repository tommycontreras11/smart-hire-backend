import { Request, Response } from "express";
import { getAllInstitutionService } from "../../services/institution/getAll.service";
import { statusCode } from "../../utils/status.util";

export const getAllInstitutionController = async (_req: Request, res: Response) => {
  getAllInstitutionService({})
    .then((data) => {
      const institutions = data.map((institution) => ({
        uuid: institution.uuid,
        name: institution.name,
        status: institution.status,
      }));

      res.status(statusCode.OK).json({ data: institutions });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
