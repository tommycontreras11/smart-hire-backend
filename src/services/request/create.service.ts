import { RequestHistoryEntity } from "./../../database/entities/entity/request-history.entity";
import { RequestEntity } from "../../database/entities/entity/request.entity";
import { CreateRequestDTO } from "../../dto/request.dto";
import { statusCode } from "../../utils/status.util";
import { StatusRequestEnum } from "./../../constants";
import { CandidateEntity } from "./../../database/entities/entity/candidate.entity";
import { JobPositionEntity } from "./../../database/entities/entity/job-position.entity";
import { uploadFile } from "./../../utils/upload.util";

export async function createRequestService(
  { candidateUUID, jobPositionUUID }: CreateRequestDTO,
  file: Express.Multer.File | undefined
) {
  if (file === undefined)
    return Promise.reject({
      message: "File not found",
      status: statusCode.BAD_REQUEST,
    });

  const foundCandidate = await CandidateEntity.findOneBy({
    uuid: candidateUUID,
  }).catch((e) => {
    console.error("createRequestService -> CandidateEntity.findOneBy: ", e);
    return null;
  });

  if (!foundCandidate) {
    return Promise.reject({
      message: "Candidate not found",
      status: statusCode.NOT_FOUND,
    });
  }

  const foundJobPosition = await JobPositionEntity.findOne({
    where: {
      uuid: jobPositionUUID,
    },
    relations: { recruiter: true },
  }).catch((e) => {
    console.error("createRequestService -> JobPositionEntity.findOne: ", e);
    return null;
  });

  if (!foundJobPosition) {
    return Promise.reject({
      message: "Job position not found",
      status: statusCode.NOT_FOUND,
    });
  }

  const requestSaved = RequestEntity.create({
    candidate: foundCandidate,
    jobPosition: foundJobPosition,
    recruiter: foundJobPosition.recruiter,
    status: StatusRequestEnum.SUBMITTED,
  });

  requestSaved.curriculum = await uploadFile<RequestEntity>(requestSaved, file);

  await requestSaved.save().catch((e) => {
    console.error("createRequestService -> RequestEntity.create: ", e);
    return null;
  });

  requestSaved &&
    (await RequestHistoryEntity.create({
      request: requestSaved,
      status: StatusRequestEnum.SUBMITTED,
    })
      .save()
      .catch((e) => {
        console.error(
          "createRequestService -> RequestHistoryEntity.create: ",
          e
        );
        return null;
      }));

  return "Request created successfully";
}
