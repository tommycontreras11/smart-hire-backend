import { StatusEnum } from "../../../constants";
import {
  LevelCompetencyEnum
} from "../../entities/entity/competency.entity";

interface ICompetency {
  name: string;
  category: string;
  evaluationMethods: string[];
  positionTypes: string[];
  level: LevelCompetencyEnum;
  status?: StatusEnum;
}

const competencies: ICompetency[] = [
  {
    name: "Teamwork",
    category: "Soft Skills",
    evaluationMethods: ["Interview", "Group Exercise"],
    positionTypes: ["Full Stack", "QA", "Scrum Master"],
    level: LevelCompetencyEnum.INTERMEDIATE,
    status: StatusEnum.ACTIVE
  },
  {
    name: "Communication",
    category: "Soft Skills",
    evaluationMethods: ["Interview", "Presentation"],
    positionTypes: ["Product Owner", "Scrum Master", "Business Analyst"],
    level: LevelCompetencyEnum.ADVANCED,
    status: StatusEnum.ACTIVE
  },
  {
    name: "Adaptability",
    category: "Soft Skills",
    evaluationMethods: ["Interview", "Situational Judgment Test"],
    positionTypes: ["QA", "Mobile", "UX Designer"],
    level: LevelCompetencyEnum.INTERMEDIATE,
    status: StatusEnum.ACTIVE
  },
  {
    name: "Leadership",
    category: "Leadership Skills",
    evaluationMethods: ["Interview", "Leadership Simulation", "360 Feedback"],
    positionTypes: ["Scrum Master", "Product Owner"],
    level: LevelCompetencyEnum.ADVANCED,
    status: StatusEnum.ACTIVE
  },
  {
    name: "Time Management",
    category: "Leadership Skills",
    evaluationMethods: ["Interview", "Situational Judgment Test"],
    positionTypes: ["Full Stack", "Scrum Master", "QA"],
    level: LevelCompetencyEnum.INTERMEDIATE,
    status: StatusEnum.ACTIVE
  },
  {
    name: "Problem Solving",
    category: "Cognitive Skills",
    evaluationMethods: ["Technical Test", "Case Study"],
    positionTypes: ["Back End", "DevOps", "Full Stack"],
    level: LevelCompetencyEnum.ADVANCED,
    status: StatusEnum.ACTIVE
  },
  {
    name: "Critical Thinking",
    category: "Cognitive Skills",
    evaluationMethods: ["Interview", "Logic Test"],
    positionTypes: ["Business Analyst", "Product Owner"],
    level: LevelCompetencyEnum.ADVANCED,
    status: StatusEnum.ACTIVE
  },
  {
    name: "Creativity",
    category: "Cognitive Skills",
    evaluationMethods: ["Portfolio Review", "Creative Exercise"],
    positionTypes: ["UX Designer", "UI Designer", "Front End"],
    level: LevelCompetencyEnum.INTERMEDIATE,
    status: StatusEnum.ACTIVE
  }
];

export const competenciesData: ICompetency[] = competencies.map(
  (competency) => ({
    name: competency.name,
    category: competency.category,
    evaluationMethods: competency.evaluationMethods,
    positionTypes: competency.positionTypes,
    level: competency.level,
    status: StatusEnum.ACTIVE,
  })
);