import { InstitutionEntity } from "./../../database/entities/entity/institution.entity";
import { Not } from "typeorm";
import { RecruiterEntity } from "../../database/entities/entity/recruiter.entity";
import { UpdateRecruiterDTO } from "../../dto/recruiter.dto";
import { hashPassword } from "../../utils/common.util";
import { statusCode } from "../../utils/status.util";
import { uploadFile } from "./../../utils/upload.util";

export async function updateRecruiterService(
  uuid: string,
  {
    identification,
    name,
    password,
    institution,
    status,
  }: UpdateRecruiterDTO,
  file?: Express.Multer.File | undefined
) {
  const foundRecruiter = await RecruiterEntity.findOne({
    where: { uuid },
  }).catch((e) => {
    console.error("updateRecruiterService -> RecruiterEntity.findOneBy: ", e);
    return null;
  });

  if (!foundRecruiter) {
    return Promise.reject({
      message: "Recruiter not found",
      status: statusCode.NOT_FOUND,
    });
  }

  if (identification) {
    const existingRecruiter = await RecruiterEntity.findOne({
      where: { identification, uuid: Not(uuid) },
    }).catch((e) => {
      console.error("updateRecruiterService -> RecruiterEntity.findOneBy: ", e);
      return null;
    });

    if (existingRecruiter) {
      return Promise.reject({
        message: "Recruiter's identification already exists",
        status: statusCode.BAD_REQUEST,
      });
    }
  }

  let foundInstitution: InstitutionEntity | null = null;

  if (institution) {
    foundInstitution = await InstitutionEntity.findOneBy({
      name: institution,
    }).catch((e) => {
      console.error(
        "updateRecruiterService -> InstitutionEntity.findOneBy: ",
        e
      );
      return null;
    });

    if (!foundInstitution) {
      return Promise.reject({
        message: "Institution not found",
        status: statusCode.NOT_FOUND,
      });
    }
  }

  foundRecruiter.identification = identification ?? foundRecruiter.identification;
  foundRecruiter.name = name ?? foundRecruiter.name;
  foundRecruiter.password = password
    ? hashPassword(password)
    : foundRecruiter.password;
  foundRecruiter.institution = foundInstitution ?? foundRecruiter.institution;
  foundRecruiter.status = status ?? foundRecruiter.status;


  if(file) foundRecruiter.photo = await uploadFile<RecruiterEntity>(foundRecruiter, file);

  await foundRecruiter.save().catch((e) => {
    console.error("updateRecruiterService -> RecruiterEntity.update: ", e);
    return null;
  });

  return "Recruiter updated successfully";
}
