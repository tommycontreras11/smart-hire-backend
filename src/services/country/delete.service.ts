import { CountryEntity } from "../../database/entities/entity/country.entity";
import { statusCode } from "../../utils/status.util";

export async function deleteCountryService(uuid: string) {
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

  await foundCountry.softRemove().catch((e) => {
    console.error("updateCountryService -> CountryEntity.update: ", e);
    return null;
  });

  return "Country deleted successfully";
}
