import { WorkExperienceEntity } from "../../database/entities/entity/work-experience.entity";
import { statusCode } from "../../utils/status.util";

export async function deleteWorkExperienceService(uuid: string) {
  const foundWorkExperience = await WorkExperienceEntity.findOneBy({ uuid }).catch((e) => {
    console.error("updateWorkExperienceService -> WorkExperienceEntity.findOneBy: ", e);
    return null;
  });

  if (!foundWorkExperience) {
    return Promise.reject({
      message: "Work experience not found",
      status: statusCode.NOT_FOUND,
    });
  }

  await foundWorkExperience.softRemove().catch((e) => {
    console.error("updateWorkExperienceService -> WorkExperienceEntity.update: ", e);
    return null;
  });

  return "Work experience deleted successfully";
}