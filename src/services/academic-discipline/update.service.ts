import { AcademicDisciplineEntity } from "../../database/entities/entity/academic-discipline.entity";
import { UpdateAcademicDisciplineDTO } from "../../dto/academic-discipline.dto";
import { statusCode } from "../../utils/status.util";

export async function updateAcademicDisciplineService(
  uuid: string,
  { name, description }: UpdateAcademicDisciplineDTO
) {
  const foundAcademicDiscipline = await AcademicDisciplineEntity.findOneBy({
    uuid,
  }).catch((e) => {
    console.error(
      "updateAcademicDisciplineService -> AcademicDisciplineEntity.findOneBy: ",
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

  if (name) {
    const existingAcademicDiscipline = await AcademicDisciplineEntity.findOneBy(
      {
        name,
      }
    ).catch((e) => {
      console.error(
        "updateAcademicDisciplineService -> AcademicDisciplineEntity.findOneBy: ",
        e
      );
      return null;
    });

    if (existingAcademicDiscipline) {
      return Promise.reject({
        message: "Academic Discipline already exists",
        status: statusCode.BAD_REQUEST,
      });
    }
  }

  foundAcademicDiscipline.name = name ?? foundAcademicDiscipline.name;
  foundAcademicDiscipline.description =
    description ?? foundAcademicDiscipline.description;
  await foundAcademicDiscipline.save().catch((e) => {
    console.error(
      "updateAcademicDisciplineService -> AcademicDisciplineEntity.update: ",
      e
    );
    return null;
  });

  return "Academic Discipline updated successfully";
}
