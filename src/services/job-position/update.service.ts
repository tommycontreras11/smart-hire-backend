import { statusCode } from "../../utils/status.util";
import { JobPositionEntity } from "../../database/entities/entity/job-position.entity";
import { UpdateJobPositionDTO } from "../../dto/job-position.dto";
import { In, Not } from "typeorm";
import { CountryEntity } from "../../database/entities/entity/country.entity";
import { LanguageEntity } from "../../database/entities/entity/language.entity";
import { RecruiterEntity } from "../../database/entities/entity/recruiter.entity";
import { CompetencyEntity } from "./../../database/entities/entity/competency.entity";

export async function updateJobPositionService(
  uuid: string,
  {
    name,
    description,
    minimum_salary,
    maximum_salary,
    contract_type,
    due_date,
    countryUUID,
    languageUUID,
    recruiterUUID,
    competencyUUIDs,
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
  if (languageUUID) {
    foundLanguage = await LanguageEntity.findOneBy({
      uuid: languageUUID,
    }).catch((e) => {
      console.error(
        "updateJobPositionService -> LanguageEntity.findOneBy: ",
        e
      );
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
  if (recruiterUUID) {
    foundRecruiter = await RecruiterEntity.findOneBy({
      uuid: recruiterUUID,
    }).catch((e) => {
      console.error(
        "updateJobPositionService -> RecruiterEntity.findOneBy: ",
        e
      );
      return null;
    });

    if (!foundRecruiter) {
      return Promise.reject({
        message: "Recruiter not found",
        status: statusCode.NOT_FOUND,
      });
    }
  }

  let foundCompetencies: CompetencyEntity[] | null = [];
  if (competencyUUIDs?.length > 0) {
    foundCompetencies = await CompetencyEntity.find({
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
  }

  foundJobPosition.name = name ?? foundJobPosition.name;
  foundJobPosition.description = description ?? foundJobPosition.description;
  foundJobPosition.minimum_salary =
    parseFloat(minimum_salary) ?? foundJobPosition.minimum_salary;
  foundJobPosition.maximum_salary =
    parseFloat(maximum_salary) ?? foundJobPosition.maximum_salary;
  foundJobPosition.contract_type =
    contract_type ?? foundJobPosition.contract_type;
  foundJobPosition.due_date = due_date ?? foundJobPosition.due_date;
  foundJobPosition.language = foundLanguage ?? foundJobPosition.language;
  foundJobPosition.recruiter = foundRecruiter ?? foundJobPosition.recruiter;
  foundJobPosition.country = foundCountry ?? foundJobPosition.country;
  foundJobPosition.competencies =
    foundCompetencies ?? foundJobPosition.competencies;
  foundJobPosition.status = status ?? foundJobPosition.status;

  await foundJobPosition.save().catch((e) => {
    console.error("updateJobPositionService -> JobPositionEntity.update: ", e);
    return null;
  });

  return "Job position updated successfully";
}
