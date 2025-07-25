import { JobSourceEntity } from "../../database/entities/entity/job-source.entity";
import { CreateJobSourceDTO } from "../../dto/job-source.dto";
import { statusCode } from "../../utils/status.util";

export async function createJobSourceService({ name }: CreateJobSourceDTO) {
  const foundJobSource = await JobSourceEntity.findOneBy({ name }).catch((e) => {
    console.error("createJobSourceService -> JobSourceEntity.findOneBy: ", e);
    return null;
  });

  if (foundJobSource) {
    return Promise.reject({
      message: "Job source already exists",
      status: statusCode.BAD_REQUEST,
    });
  }

  await JobSourceEntity.create({
    name,
  })
    .save()
    .catch((e) => {
      console.error("createJobSourceService -> JobSourceEntity.create: ", e);
      return null;
    });

  return "Job source created successfully";
}
