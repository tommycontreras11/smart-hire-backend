import { statusCode } from "./../../utils/status.util";
import { CountryEntity } from "./../../database/entities/entity/country.entity";
import { UpdateCountryDTO } from "./../../dto/country.dto";
import { Not } from "typeorm";

export async function updateCountryService(
  uuid: string,
  { name, status }: UpdateCountryDTO
) {
  const foundCountry = await CountryEntity.findOneBy({ uuid }).catch((e) => {
    console.error("updateCountryService -> CountryEntity.findOneBy: ", e);
    return null;
  });

  if (!foundCountry) {
    return Promise.reject({
      message: "Country not found",
      status: statusCode.NOT_FOUND,
    });
  }

  if (name) {
    const existingCountry = await CountryEntity.findOne({
      where: { name, uuid: Not(uuid) },
    }).catch((e) => {
      console.error("updateCountryService -> CountryEntity.findOneBy: ", e);
      return null;
    });

    if (existingCountry) {
      return Promise.reject({
        message: "Country already exists",
        status: statusCode.BAD_REQUEST,
      });
    }
  }

  await CountryEntity.update(
    { uuid },
    { ...(name && { name }), ...(status && { status }) }
  ).catch((e) => {
    console.error("updateCountryService -> CountryEntity.update: ", e);
    return null;
  });

  return "Country updated successfully";
}