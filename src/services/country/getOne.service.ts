import { statusCode } from "./../../utils/status.util";
import { CountryEntity } from "./../../database/entities/entity/country.entity";
import { FindOneOptions } from "typeorm";

export async function getOneCountryService(
  option: FindOneOptions<CountryEntity>
) {
  const foundCountry = await CountryEntity.findOne(option).catch((e) => {
    console.error("getOneCountryService -> CountryEntity.findOne: ", e);
    return null;
  });

  if (!foundCountry) {
    return Promise.reject({
      message: "Country not found",
      status: statusCode.NOT_FOUND,
    });
  }

  return foundCountry;
}
