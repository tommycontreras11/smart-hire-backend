import { EducationEntity } from "../../database/entities/entity/education.entity";
import { statusCode } from "../../utils/status.util";

export async function deleteEducationService(uuid: string) {
  const foundEducation = await EducationEntity.findOne({
    where: {
      uuid,
    },
  }).catch((e) => {
    console.error(
      "updateCandidateEducationService -> EducationEntity.findOneBy: ",
      e
    );
    return null;
  });

  if (!foundEducation)
    return Promise.reject({
      message: "Education not found",
      status: statusCode.NOT_FOUND,
    });

  await foundEducation.softRemove().catch((e) => {
    console.error("deleteEducationService -> softRemove: ", e);
    return null;
  });

  return "Education deleted successfully";
}
