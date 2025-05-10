import { LanguageEntity } from "./../../../database/entities/entity/language.entity";
import { StatusEnum } from "../../../constants";

const languages = [
  "English",
  "Spanish"
];

export const languagesData: Partial<LanguageEntity>[] = languages.map((language) => ({
  name: language,
  status: StatusEnum.ACTIVE,
}));