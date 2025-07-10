import { Request, Response } from "express";
import { retrieveIfUserExists } from "./../../utils/user.util";
import { getAllRecruitmentProcessService } from "./../../services/job-position/getAllRecruitmentProcess.service";
import { statusCode } from "./../../utils/status.util";
import { ObjectStorage } from "./../../libs/object-storage";
import { CandidateEntity } from "./../../database/entities/entity/candidate.entity";

export const getAllRecruitmentProcessController = async (
  req: Request,
  res: Response
) => {
  const uuid = req?.user?.uuid;

  const validateUser = await retrieveIfUserExists(null, null, uuid);

  getAllRecruitmentProcessService(validateUser, {
    ...(validateUser instanceof CandidateEntity && {
      where: {
        requests: {
          candidate: {
            uuid,
          },
        },
      },
    }),
    relations: {
      requests: {
        candidate: true,
        recruiter: {
          institution: true,
        },
        jobPosition: true,
      },
    },
  })
    .then(async (data) => {
      const storage = ObjectStorage.instance;

      const recruitmentProcess = await Promise.all(
        data.map(
          (recruitmentProcess) =>
            recruitmentProcess?.requests?.map(async (request) => ({
              uuid: request?.uuid,
              candidateUUID: request?.candidate?.uuid,
              name: request?.candidate?.name,
              email: request?.candidate?.email,
              institution: request?.recruiter?.institution?.name,
              position: request?.jobPosition?.name,
              ...(request?.candidate?.curriculum && {
                curriculum: await storage.getUrl(request?.candidate?.curriculum),
              }),
              next_step: request?.next_step,
              interview_date: request?.interview_date,
              applied_at: request?.createdAt,
              last_update: request?.updatedAt,
              status: request?.status,
            })) ?? []
        ).flat()
      );

      res.status(statusCode.OK).json({ data: recruitmentProcess });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
