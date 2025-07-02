import { AcademicDisciplineEntity } from "./../../database/entities/entity/academic-discipline.entity";
import { CreateAcademicDisciplineDTO } from "./../../dto/academic-discipline.dto";
import { statusCode } from "./../../utils/status.util";

export async function createAcademicDisciplineService({
  name,
  description,
}: CreateAcademicDisciplineDTO) {
  const foundAcademicDiscipline = await AcademicDisciplineEntity.findOneBy({
    name,
  }).catch((e) => {
    console.error(
      "createAcademicDisciplineService -> AcademicDisciplineEntity.findOneBy: ",
      e
    );
    return null;
  });

  if (foundAcademicDiscipline) {
    return Promise.reject({
      message: "Academic Discipline already exists",
      status: statusCode.BAD_REQUEST,
    });
  }

  await AcademicDisciplineEntity.create({
    name,
    ...(description && { description }),
  })
    .save()
    .catch((e) => {
      console.error(
        "createAcademicDisciplineService -> AcademicDisciplineEntity.create: ",
        e
      );
      return null;
    });

  return "Academic Discipline created successfully";
}
