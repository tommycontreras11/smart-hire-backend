import { Request, Response } from "express";
import { retrieveIfUserExists } from "./../../utils/user.util";
import { getAllRecruitmentProcessService } from "./../../services/job-position/getAllRecruitmentProcess.service";
import { statusCode } from "./../../utils/status.util";

export const getAllRecruitmentProcessController = async (
  req: Request,
  res: Response
) => {
  const uuid = req?.user?.uuid;

  const validateUser = await retrieveIfUserExists(null, null, uuid);

  getAllRecruitmentProcessService(validateUser, {
    where: {
      requests: {
        candidate: {
          uuid,
        },
      },
    },
    relations: {
      requests: {
        candidate: true,
        recruiter: {
          institution: true,
        },
        jobPosition: true
      },
    },
  })
    .then((data) => {
      const recruitmentProcess = data.map((recruitmentProcess) =>
        recruitmentProcess?.requests?.map((request) => ({
          uuid: request?.uuid,
          institution: request?.recruiter?.institution?.name,
          position: request?.jobPosition?.name,
          status: request?.status,
          applied_at: request?.createdAt,
          last_update: request?.updatedAt,
        })) ?? []
      ).flat();

      res.status(statusCode.OK).json({ data: recruitmentProcess });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
