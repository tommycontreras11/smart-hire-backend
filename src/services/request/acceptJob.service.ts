import { statusCode } from "../../utils/status.util";
import { RequestEntity } from "../../database/entities/entity/request.entity";
import { AcceptJobDTO } from "../../dto/request.dto";
import { StatusRequestEnum } from "../../constants";
import { updateRequestService } from "./update.service";
import { CandidateEntity } from "./../../database/entities/entity/candidate.entity";

export async function acceptJobService({
  candidateUUID,
  requestUUID,
}: AcceptJobDTO) {
  const foundRequest = await RequestEntity.findOne({
    where: { uuid: requestUUID },
    relations: {
      candidate: true,
    },
  }).catch((e) => {
    console.error("updateRequestService -> RequestEntity.findOne: ", e);
    return null;
  });

  if (!foundRequest) {
    return Promise.reject({
      message: "Request not found",
      status: statusCode.NOT_FOUND,
    });
  }

  if (foundRequest.status === StatusRequestEnum.HIRED)
    return Promise.reject({
      message: "This request has already been accepted",
      status: statusCode.NOT_FOUND,
    });

  if (foundRequest.status != StatusRequestEnum.EVALUATED)
    return Promise.reject({
      message: "This request has not been evaluated yet",
      status: statusCode.NOT_FOUND,
    });

  const foundCandidate = await CandidateEntity.findOne({
    where: { uuid: candidateUUID },
  }).catch((e) => {
    console.error("updateRequestService -> CandidateEntity.findOne: ", e);
    return null;
  });

  if (!foundCandidate) {
    return Promise.reject({
      message: "Candidate not found",
      status: statusCode.NOT_FOUND,
    });
  }

  if (foundCandidate.uuid != foundRequest.candidate.uuid)
    return Promise.reject({
      message: "This request doesn't belong to this candidate",
      status: statusCode.NOT_FOUND,
    });

  await updateRequestService(foundRequest.uuid, {
    candidateUUID: foundCandidate.uuid,
    status: StatusRequestEnum.HIRED,
    nextStep: "You have been hired 🔥",
  });

  return "Request accepted successfully";
}
