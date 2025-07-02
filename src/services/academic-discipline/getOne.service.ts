import { FindOneOptions } from "typeorm";
import { AcademicDisciplineEntity } from "./../../database/entities/entity/academic-discipline.entity";
import { statusCode } from "./../../utils/status.util";

export async function getOneAcademicDisciplineService(
  option: FindOneOptions<AcademicDisciplineEntity>
) {
  const foundAcademicDiscipline = await AcademicDisciplineEntity.findOne(
    option
  ).catch((e) => {
    console.error(
      "getOneAcademicDisciplineService -> AcademicDisciplineEntity.findOne: ",
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

  return foundAcademicDiscipline;
}
