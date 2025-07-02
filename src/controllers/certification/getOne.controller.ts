import { Request, Response } from "express";
import { getOneCertificationService } from "../../services/certification/getOne.service";
import { statusCode } from "../../utils/status.util";

export const getOneCertificationController = async (
  req: Request,
  res: Response
) => {
  const { uuid } = req.params;

  getOneCertificationService({
    where: {
      uuid,
    },
  })
    .then((data) => {
      const certification = {
        uuid: data.uuid,
        name: data.name,
        expedition_date: data.expedition_date,
        expiration_date: data.expiration_date,
        credential_id: data.credential_id,
        credential_link: data.credential_link,
        status: data.status,
      };

      return res.status(statusCode.OK).json({ data: certification });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
