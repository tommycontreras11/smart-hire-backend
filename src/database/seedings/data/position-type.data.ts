import { StatusEnum } from "./../../../constants";
import { PositionTypeEntity } from "./../../../database/entities/entity/position-type.entity";

const positionTypes = [
  "Full Stack",
  "Front End",
  "Back End",
  "Mobile",
  "DevOps",
  "QA",
  "Scrum Master",
  "Product Owner",
  "Business Analyst",
  "UX Designer",
  "UI Designer",
];

export const positionTypesData: Partial<PositionTypeEntity>[] =
  positionTypes.map((positionType) => ({
    name: positionType,
    status: StatusEnum.ACTIVE,
  }));