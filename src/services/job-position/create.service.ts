import { In } from "typeorm";
import { JobPositionEntity } from "../../database/entities/entity/job-position.entity";
import { CreateJobPositionDTO } from "../../dto/job-position.dto";
import { statusCode } from "../../utils/status.util";
import { CompetencyEntity } from "./../../database/entities/entity/competency.entity";
import { CountryEntity } from "./../../database/entities/entity/country.entity";
import { DepartmentEntity } from "./../../database/entities/entity/department.entity";
import { LanguageEntity } from "./../../database/entities/entity/language.entity";
import { RecruiterEntity } from "./../../database/entities/entity/recruiter.entity";
import { PositionTypeEntity } from "./../../database/entities/entity/position-type.entity";

export async function createJobPositionService({
  name,
  countryUUID,
  languageUUID,
  recruiterUUID,
  minimum_salary,
  maximum_salary,
  departmentUUID,
  positionTypeUUID,
  competencyUUIDs,
  ...payload
}: CreateJobPositionDTO) {
  const foundJobPosition = await JobPositionEntity.findOneBy({ name }).catch(
    (e) => {
      console.error(
        "createJobPositionService -> JobPositionEntity.findOneBy: ",
        e
      );
      return null;
    }
  );

  if (foundJobPosition) {
    return Promise.reject({
      message: "Job position already exists",
      status: statusCode.BAD_REQUEST,
    });
  }

  const foundCountry = await CountryEntity.findOneBy({
    uuid: countryUUID,
  }).catch((e) => {
    console.error("createJobPositionService -> CountryEntity.findOneBy: ", e);
    return null;
  });

  if (!foundCountry) {
    return Promise.reject({
      message: "Country not found",
      status: statusCode.NOT_FOUND,
    });
  }

  const foundLanguage = await LanguageEntity.findOneBy({
    uuid: languageUUID,
  }).catch((e) => {
    console.error("createJobPositionService -> LanguageEntity.findOneBy: ", e);
    return null;
  });

  if (!foundLanguage) {
    return Promise.reject({
      message: "Language not found",
      status: statusCode.NOT_FOUND,
    });
  }

  const foundRecruiter = await RecruiterEntity.findOneBy({
    uuid: recruiterUUID,
  }).catch((e) => {
    console.error("createJobPositionService -> RecruiterEntity.findOneBy: ", e);
    return null;
  });

  if (!foundRecruiter) {
    return Promise.reject({
      message: "Recruiter not found",
      status: statusCode.NOT_FOUND,
    });
  }

  const foundDepartment = await DepartmentEntity.findOneBy({
    uuid: departmentUUID,
  }).catch((e) => {
    console.error(
      "createJobPositionService -> DepartmentEntity.findOneBy: ",
      e
    );
    return null;
  });

  if (!foundDepartment) {
    return Promise.reject({
      message: "Department not found",
      status: statusCode.NOT_FOUND,
    });
  }

  const foundPositionType = await PositionTypeEntity.findOneBy({
    uuid: positionTypeUUID,
  }).catch((e) => {
    console.error(
      "createJobPositionService -> PositionTypeEntity.findOneBy: ",
      e
    );
    return null;
  });

  if (!foundPositionType) {
    return Promise.reject({
      message: "Position type not found",
      status: statusCode.NOT_FOUND,
    });
  }

  const foundCompetencies = await CompetencyEntity.find({
    where: {
      uuid: In(competencyUUIDs),
    },
  }).catch((e) => {
    console.error("createJobPositionService -> CompetencyEntity.find: ", e);
    return null;
  });

  if (
    !foundCompetencies ||
    foundCompetencies.length !== competencyUUIDs.length
  ) {
    return Promise.reject({
      message: "Competency not found",
      status: statusCode.NOT_FOUND,
    });
  }

  await JobPositionEntity.create({
    name,
    minimum_salary: parseFloat(minimum_salary),
    maximum_salary: parseFloat(maximum_salary),
    country: foundCountry,
    language: foundLanguage,
    recruiter: foundRecruiter,
    competencies: foundCompetencies,
    ...payload,
  })
    .save()
    .catch((e) => {
      console.error(
        "createJobPositionService -> JobPositionEntity.create: ",
        e
      );
      return null;
    });

  return "Job position created successfully";
}
