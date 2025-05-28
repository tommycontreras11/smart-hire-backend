import { CandidateEntity } from "../../database/entities/entity/candidate.entity";
import { EmployeeEntity } from "../../database/entities/entity/employee.entity";
import { RecruiterEntity } from "../../database/entities/entity/recruiter.entity";
import { FindManyOptions } from "typeorm";
import { JobPositionEntity } from "../../database/entities/entity/job-position.entity";
import { statusCode } from "../../utils/status.util";

export async function getAllRecruitmentProcessService(
  validateUser: CandidateEntity | EmployeeEntity | RecruiterEntity | null,
  options?: FindManyOptions<JobPositionEntity>
) {
  if (!(validateUser instanceof CandidateEntity))
    return Promise.reject({
      message: "Unauthorized",
      status: statusCode.UNAUTHORIZED,
    });

  const jobPositions = await JobPositionEntity.find(options).catch((e) => {
    console.error("dashboardDetailsService -> JobPositionEntity.find: ", e);
    return null;
  });

  if (!jobPositions)
    return Promise.reject({
      message: "No job positions found",
      status: statusCode.NOT_FOUND,
    });

  return jobPositions;
}
