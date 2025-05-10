import { statusCode } from "../../utils/status.util";
import { LanguageEntity } from "../../database/entities/entity/language.entity";
import { FindManyOptions } from "typeorm";

export async function getAllLanguageService(
  options?: FindManyOptions<LanguageEntity>
) {
  const languages = await LanguageEntity.find(options).catch((e) => {
    console.error("getAllLanguageService -> LanguageEntity.find: ", e);
    return null;
  });

  if (!languages)
    return Promise.reject({
      message: "No languages found",
      status: statusCode.NOT_FOUND,
    });

  return languages;
}
