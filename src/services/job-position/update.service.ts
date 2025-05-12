import { statusCode } from "../../utils/status.util";
import { JobPositionEntity } from "../../database/entities/entity/job-position.entity";
import { UpdateJobPositionDTO } from "../../dto/job-position.dto";
import { Not } from "typeorm";
import { CountryEntity } from "../../database/entities/entity/country.entity";
import { LanguageEntity } from "../../database/entities/entity/language.entity";
import { RecruiterEntity } from "../../database/entities/entity/recruiter.entity";

export async function updateJobPositionService(
  uuid: string,
  {
    name,
    description,
    minimum_salary,
    maximum_salary,
    risk_level,
    contract_type,
    countryUUID,
    languageUUID,
    recruiterUUID,
    status,
  }: UpdateJobPositionDTO
) {
  const foundJobPosition = await JobPositionEntity.findOneBy({ uuid }).catch(
    (e) => {
      console.error(
        "updateJobPositionService -> JobPositionEntity.findOneBy: ",
        e
      );
      return null;
    }
  );

  if (!foundJobPosition) {
    return Promise.reject({
      message: "Job position not found",
      status: statusCode.NOT_FOUND,
    });
  }

  if (name) {
    const existingJobPosition = await JobPositionEntity.findOne({
      where: { name, uuid: Not(uuid) },
    }).catch((e) => {
      console.error(
        "updateJobPositionService -> JobPositionEntity.findOneBy: ",
        e
      );
      return null;
    });

    if (existingJobPosition) {
      return Promise.reject({
        message: "Job position already exists",
        status: statusCode.BAD_REQUEST,
      });
    }
  }

  let foundCountry: CountryEntity | null = null;
  if (countryUUID) {
    foundCountry = await CountryEntity.findOneBy({ uuid: countryUUID }).catch(
      (e) => {
        console.error(
          "updateJobPositionService -> CountryEntity.findOneBy: ",
          e
        );
        return null;
      }
    );

    if (!foundCountry) {
      return Promise.reject({
        message: "Country not found",
        status: statusCode.NOT_FOUND,
      });
    }
  }

  let foundLanguage: LanguageEntity | null = null;
  if(languageUUID) {
    foundLanguage = await LanguageEntity.findOneBy({
      uuid: languageUUID,
    }).catch((e) => {
      console.error("updateJobPositionService -> LanguageEntity.findOneBy: ", e);
      return null;
    });
  
    if (!foundLanguage) {
      return Promise.reject({
        message: "Language not found",
        status: statusCode.NOT_FOUND,
      });
    }
  }

  let foundRecruiter: RecruiterEntity | null = null;
  if(recruiterUUID) {
    foundRecruiter = await RecruiterEntity.findOneBy({
      uuid: recruiterUUID,
    }).catch((e) => {
      console.error("updateJobPositionService -> RecruiterEntity.findOneBy: ", e);
      return null;
    });
  
    if (!foundRecruiter) {
      return Promise.reject({
        message: "Recruiter not found",
        status: statusCode.NOT_FOUND,
      });
    }
  }

  await JobPositionEntity.update(
    { uuid }, 
    { 
      ...(name && { name }), 
      ...(description && { description }), 
      ...(minimum_salary && { minimum_salary: parseFloat(minimum_salary) }), 
      ...(maximum_salary && { maximum_salary: parseFloat(maximum_salary) }), 
      ...(risk_level && { risk_level }), 
      ...(contract_type && { contract_type }), 
      ...(foundCountry && { country: foundCountry }), 
      ...(foundLanguage && { language: foundLanguage }), 
      ...(foundRecruiter && { recruiter: foundRecruiter }),
      ...(status && { status }) 
    }
  ).catch((e) => {
    console.error("updateJobPositionService -> JobPositionEntity.update: ", e);
    return null;
  });

  return "Job position updated successfully";
}