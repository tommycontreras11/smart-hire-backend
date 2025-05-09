import { statusCode } from "../../utils/status.util";
import { LanguageEntity } from "../../database/entities/entity/language.entity";
import { FindManyOptions } from "typeorm";

export async function getAllLanguageService(
  options?: FindManyOptions<LanguageEntity>
) {
  const countries = await LanguageEntity.find(options).catch((e) => {
    console.error("getAllLanguageService -> LanguageEntity.find: ", e);
    return null;
  });

  if (!countries)
    return Promise.reject({
      message: "No countries found",
      status: statusCode.NOT_FOUND,
    });

  return countries;
}
