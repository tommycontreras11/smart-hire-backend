import { StatusEnum } from "../../../constants";
import { EvaluationMethodEntity } from "../../entities/entity/evaluation-method.entity";

const evaluationMethods = [
  "Interview",
  "Technical Test",
  "Coding Test",
  "Situational Judgment Test",
  "Case Study",
  "Portfolio Review",
  "Leadership Simulation",
  "Group Exercise",
  "360 Feedback",
  "Presentation",
  "Logic Test",
  "Behavioral Interview",
];

export const evaluationMethodsData: Partial<EvaluationMethodEntity>[] =
  evaluationMethods.map((evaluationMethod) => ({
    name: evaluationMethod,
    status: StatusEnum.ACTIVE,
  }));