import { statusCode } from "../../utils/status.util";
import { LanguageEntity } from "../../database/entities/entity/language.entity";
import { FindOneOptions } from "typeorm";

export async function getOneLanguageService(
  option: FindOneOptions<LanguageEntity>
) {
  const foundLanguage = await LanguageEntity.findOne(option).catch((e) => {
    console.error("getOneLanguageService -> LanguageEntity.findOne: ", e);
    return null;
  });

  if (!foundLanguage) {
    return Promise.reject({
      message: "Language not found",
      status: statusCode.NOT_FOUND,
    });
  }

  return foundLanguage;
}
