import { FindManyOptions } from "typeorm";
import { AcademicDisciplineEntity } from "./../../database/entities/entity/academic-discipline.entity";
import { statusCode } from "./../../utils/status.util";

export async function getAllAcademicDisciplineService(
  options?: FindManyOptions<AcademicDisciplineEntity>
) {
  const academicDisciplines = await AcademicDisciplineEntity.find(
    options
  ).catch((e) => {
    console.error(
      "getAllAcademicDisciplineService -> AcademicDisciplineEntity.find: ",
      e
    );
    return null;
  });

  if (!academicDisciplines)
    return Promise.reject({
      message: "No academic disciplines found",
      status: statusCode.NOT_FOUND,
    });

  return academicDisciplines;
}
