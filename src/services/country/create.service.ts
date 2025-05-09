import { CountryEntity } from "./../../database/entities/entity/country.entity";
import { CreateCountryDTO } from "./../../dto/country.dto";
import { statusCode } from "./../../utils/status.util";

export async function createCountryService({ name }: CreateCountryDTO) {
  const foundCountry = await CountryEntity.findOneBy({ name }).catch((e) => {
    console.error("createCountryService -> CountryEntity.findOneBy: ", e);
    return null;
  });

  if (foundCountry) {
    return Promise.reject({
      message: "Country already exists",
      status: statusCode.BAD_REQUEST,
    });
  }

  await CountryEntity.create({
    name,
  })
    .save()
    .catch((e) => {
      console.error("createCountryService -> CountryEntity.create: ", e);
      return null;
    });

  return "Country created successfully";
}
