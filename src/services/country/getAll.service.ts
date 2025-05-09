import { statusCode } from "./../../utils/status.util";
import { CountryEntity } from "./../../database/entities/entity/country.entity";
import { FindManyOptions } from "typeorm";

export async function getAllCountryService(
  options?: FindManyOptions<CountryEntity>
) {
  const countries = await CountryEntity.find(options).catch((e) => {
    console.error("getAllCountryService -> CountryEntity.find: ", e);
    return null;
  });

  if (!countries)
    return Promise.reject({
      message: "No countries found",
      status: statusCode.NOT_FOUND,
    });

  return countries;
}
