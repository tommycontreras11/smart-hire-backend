import { Request, Response } from "express";
import { getOneCertificationService } from "../../services/certification/getOne.service";
import { statusCode } from "../../utils/status.util";

export const getOneCertificationController = async (
  req: Request,
  res: Response
) => {
  const { uuid } = req.params;

  getOneCertificationService({
    relations: {
      institution: true,
      competencies: true,
    },
    where: {
      uuid,
    },
  })
    .then((data) => {
      const certification = {
        uuid: data.uuid,
        name: data.name,
        description: data.description,
        expedition_date: data.expedition_date,
        expiration_date: data.expiration_date,
        credential_id: data.credential_id,
        credential_link: data.credential_link,
        institution: {
          uuid: data.institution.uuid,
          name: data.institution.name,
        },
        ...(data.competencies && {
          competencies: data.competencies.map((competency) => ({
            uuid: competency.uuid,
            name: competency.name,
          })),
        }),
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
