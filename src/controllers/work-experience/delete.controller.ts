import { Request, Response } from "express";
import { deleteWorkExperienceService } from "../../services/work-experience/delete.service";
import { statusCode } from "../../utils/status.util";

export const deleteWorkExperienceController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  deleteWorkExperienceService(uuid)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
