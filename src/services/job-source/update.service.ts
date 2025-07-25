import { statusCode } from "../../utils/status.util";
import { JobSourceEntity } from "../../database/entities/entity/job-source.entity";
import { UpdateJobSourceDTO } from "../../dto/job-source.dto";
import { Not } from "typeorm";

export async function updateJobSourceService(
  uuid: string,
  { name, status }: UpdateJobSourceDTO
) {
  const foundJobSource = await JobSourceEntity.findOneBy({ uuid }).catch((e) => {
    console.error("updateJobSourceService -> JobSourceEntity.findOneBy: ", e);
    return null;
  });

  if (!foundJobSource) {
    return Promise.reject({
      message: "Job source not found",
      status: statusCode.NOT_FOUND,
    });
  }

  if (name) {
    const existingJobSource = await JobSourceEntity.findOne({
      where: { name, uuid: Not(uuid) },
    }).catch((e) => {
      console.error("updateJobSourceService -> JobSourceEntity.findOneBy: ", e);
      return null;
    });

    if (existingJobSource) {
      return Promise.reject({
        message: "JobSource already exists",
        status: statusCode.BAD_REQUEST,
      });
    }
  }

  await JobSourceEntity.update(
    { uuid },
    { ...(name && { name }), ...(status && { status }) }
  ).catch((e) => {
    console.error("updateJobSourceService -> JobSourceEntity.update: ", e);
    return null;
  });

  return "Job source updated successfully";
}