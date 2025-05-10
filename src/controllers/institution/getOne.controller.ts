import { Request, Response } from "express";
import { getOneInstitutionService } from "../../services/institution/getOne.service";
import { statusCode } from "../../utils/status.util";

export const getOneInstitutionController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  getOneInstitutionService({
    where: {
      uuid,
    },
  })
    .then((data) => {
      const institution = {
        uuid: data.uuid,
        name: data.name,
        status: data.status,
      };

      res.status(statusCode.OK).json({ data: institution });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
