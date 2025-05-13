import { validateIdentification } from "./../../utils/user.util";
import { RecruiterEntity } from "../../database/entities/entity/recruiter.entity";
import { CreateRecruiterDTO } from "../../dto/recruiter.dto";
import { hashPassword } from "../../utils/common.util";
import { statusCode } from "../../utils/status.util";
import { InstitutionEntity } from "./../../database/entities/entity/institution.entity";

export async function createRecruiterService(
  {
    identification,
    password,
    institution,
    ...payload
  }: CreateRecruiterDTO,
  // file?: Express.Multer.File | undefined
) {
  await validateIdentification<RecruiterEntity>(
    RecruiterEntity,
    identification
  );

  let foundInstitution = await InstitutionEntity.findOneBy({
    name: institution,
  }).catch((e) => {
    console.error("createRecruiterService -> InstitutionEntity.findOneBy: ", e);
    return null;
  });

  if (!foundInstitution) {
    foundInstitution = await InstitutionEntity.create({
      name: institution
    }).save().catch((e) => {
      console.error("createRecruiterService -> InstitutionEntity.create: ", e);
      return null;
    })

    if (!foundInstitution) {
      return Promise.reject({
        message: "Institution not created",
        status: statusCode.BAD_REQUEST,
      });
    }
  }

  await RecruiterEntity.create({
    identification,
    password: hashPassword(password),
    institution: foundInstitution,
    file_name: "s",
    ...payload,
  })
    .save()
    .catch((e) => {
      console.error("createRecruiterService -> RecruiterEntity.create: ", e);
      return null;
    });

  return "Recruiter created successfully";
}
