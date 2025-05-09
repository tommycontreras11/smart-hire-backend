import { StatusEnum } from "./../../../constants";
import { CountryEntity } from "./../../../database/entities/entity/country.entity";

const countries = [
  "Argentina",
  "Canada",
  "Germany",
  "Japan",
  "Kenya",
  "Australia",
  "Brazil",
  "France",
  "South Korea",
  "Dominican Republic",
];

export const countryData: Partial<CountryEntity>[] = countries.map((country) => ({
  name: country,
  status: StatusEnum.ACTIVE,
}));