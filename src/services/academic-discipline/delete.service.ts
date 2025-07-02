import { AcademicDisciplineEntity } from "../../database/entities/entity/academic-discipline.entity";
import { statusCode } from "../../utils/status.util";

export async function deleteAcademicDisciplineService(uuid: string) {
  const foundAcademicDiscipline = await AcademicDisciplineEntity.findOneBy({
    uuid,
  }).catch((e) => {
    console.error(
      "deleteAcademicDisciplineService -> AcademicDisciplineEntity.findOneBy: ",
      e
    );
    return null;
  });

  if (!foundAcademicDiscipline) {
    return Promise.reject({
      message: "Academic Discipline not found",
      status: statusCode.NOT_FOUND,
    });
  }

  await foundAcademicDiscipline.softRemove().catch((e) => {
    console.error(
      "deleteAcademicDisciplineService -> AcademicDisciplineEntity.softRemove: ",
      e
    );
    return null;
  });

  return "Academic Discipline deleted successfully";
}
