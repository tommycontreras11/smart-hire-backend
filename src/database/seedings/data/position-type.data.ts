import { StatusEnum } from "./../../../constants";

interface PositionType {
  name: string;
  department: string;
  status: StatusEnum;
}

const positionTypes = [
  { name: "Full Stack", department: "IT" },
  { name: "Front End", department: "IT" },
  { name: "Back End", department: "IT" },
  { name: "Mobile", department: "IT" },
  { name: "DevOps", department: "IT" },
  { name: "QA", department: "Quality Assurance" },
  { name: "Scrum Master", department: "Operations" },
  { name: "Product Owner", department: "Marketing" },
  { name: "Business Analyst", department: "Finance" },
  { name: "UX Designer", department: "Marketing" },
  { name: "UI Designer", department: "Marketing" },
];

export const positionTypesData: PositionType[] = positionTypes.map(
  (positionType) => ({
    name: positionType.name,
    department: positionType.department,
    status: StatusEnum.ACTIVE,
  })
);
