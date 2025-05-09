import { statusCode } from "../../utils/status.util";
import { LanguageEntity } from "../../database/entities/entity/language.entity";
import { UpdateLanguageDTO } from "../../dto/language.dto";
import { Not } from "typeorm";

export async function updateLanguageService(
  uuid: string,
  { name, status }: UpdateLanguageDTO
) {
  const foundLanguage = await LanguageEntity.findOneBy({ uuid }).catch((e) => {
    console.error("updateLanguageService -> LanguageEntity.findOneBy: ", e);
    return null;
  });

  if (!foundLanguage) {
    return Promise.reject({
      message: "Language not found",
      status: statusCode.NOT_FOUND,
    });
  }

  const existingLanguage = await LanguageEntity.findOne({
    where: { name, uuid: Not(uuid) },
  }).catch((e) => {
    console.error("updateLanguageService -> LanguageEntity.findOneBy: ", e);
    return null;
  });

  if (existingLanguage) {
    return Promise.reject({
      message: "Language already exists",
      status: statusCode.BAD_REQUEST,
    });
  }

  await LanguageEntity.update(
    { uuid },
    { ...(name && { name }), ...(status && { status }) }
  ).catch((e) => {
    console.error("updateLanguageService -> LanguageEntity.update: ", e);
    return null;
  });

  return "Language updated successfully";
}