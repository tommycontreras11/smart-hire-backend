import { JobPositionEntity } from "../../database/entities/entity/job-position.entity";
import { CreateJobPositionDTO } from "../../dto/job-position.dto";
import { statusCode } from "../../utils/status.util";
import { CountryEntity } from "./../../database/entities/entity/country.entity";
import { LanguageEntity } from "./../../database/entities/entity/language.entity";
import { RecruiterEntity } from "./../../database/entities/entity/recruiter.entity";

export async function createJobPositionService({
  name,
  countryUUID,
  languageUUID,
  recruiterUUID,
  minimum_salary,
  maximum_salary,
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

  await JobPositionEntity.create({
    name,
    minimum_salary: parseFloat(minimum_salary),
    maximum_salary: parseFloat(maximum_salary),
    country: foundCountry,
    language: foundLanguage,
    recruiter: foundRecruiter,
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