import { InstitutionEntity } from "database/entities/entity/institution.entity";
import { StatusEnum } from "../../../constants";

const institutions = [
  "Platzi",
  "Holberton School",
  "Globant",
  "BairesDev",
  "Ironhack",
  "Digital House",
  "Mercado Libre Tech Institute",
  "Ualá Tech Academy",
  "Codi Academy",
  "Educademia Tech",
];

export const institutionsData: Partial<InstitutionEntity>[] = institutions.map(
  (institution) => ({
    name: institution,
    status: StatusEnum.ACTIVE,
  })
);