import { StatusEnum } from "./../../../constants";
import { TrainingLevelEnum } from "./../../../database/entities/entity/training.entity";

interface ITraining {
  name: string;
  description: string;
  level: TrainingLevelEnum;
  date_from: Date;
  date_to: Date;
  institution: string;
  status?: StatusEnum;
}

const training: ITraining[] = [
  {
    name: "Full Stack Web Development",
    description:
      "Comprehensive training in front-end and back-end technologies, including JavaScript, Node.js, and databases.",
    level: TrainingLevelEnum.TECHNICAL,
    date_from: new Date("2024-01-15"),
    date_to: new Date("2024-06-15"),
    institution: "Platzi", 
  },
  {
    name: "Project Management for Tech Teams",
    description:
      "Learn the principles of agile and waterfall project management methodologies for IT environments.",
    level: TrainingLevelEnum.MANAGEMENT,
    date_from: new Date("2024-02-01"),
    date_to: new Date("2024-04-30"),
    institution: "Holberton School", 
  },
  {
    name: "Cloud Computing with AWS",
    description:
      "Hands-on training on deploying and managing cloud infrastructure using Amazon Web Services.",
    level: TrainingLevelEnum.TECHNICAL,
    date_from: new Date("2024-03-10"),
    date_to: new Date("2024-08-10"),
    institution: "Globant", 
  },
  {
    name: "Leadership in Tech Companies",
    description:
      "Develop leadership and strategic thinking skills tailored for tech environments and teams.",
    level: TrainingLevelEnum.MANAGEMENT,
    date_from: new Date("2024-01-20"),
    date_to: new Date("2024-05-20"),
    institution: "BairesDev", 
  },
  {
    name: "Master’s in Artificial Intelligence",
    description:
      "In-depth postgraduate program focusing on machine learning, neural networks, and data science.",
    level: TrainingLevelEnum.MASTERS,
    date_from: new Date("2023-09-01"),
    date_to: new Date("2025-06-30"),
    institution: "Ironhack", 
  },
  {
    name: "UI/UX Design Certification",
    description:
      "Training on creating user-friendly, accessible, and engaging digital product experiences.",
    level: TrainingLevelEnum.TECHNICAL,
    date_from: new Date("2024-04-01"),
    date_to: new Date("2024-07-15"),
    institution: "Digital House", 
  },
  {
    name: "Doctorate in Information Systems",
    description:
      "Doctoral-level research training in managing and innovating enterprise information systems.",
    level: TrainingLevelEnum.DOCTORATE,
    date_from: new Date("2022-10-01"),
    date_to: new Date("2026-09-30"),
    institution: "Mercado Libre Tech Institute", 
  },
  {
    name: "Postgraduate in Cybersecurity",
    description:
      "Focuses on ethical hacking, network security, and cyber defense mechanisms.",
    level: TrainingLevelEnum.POSTGRADUATE,
    date_from: new Date("2023-01-10"),
    date_to: new Date("2023-12-15"),
    institution: "Ualá Tech Academy",
  },
  {
    name: "Bachelor’s in Computer Science",
    description:
      "Foundational degree in algorithms, data structures, programming, and software engineering.",
    level: TrainingLevelEnum.BACHELORS,
    date_from: new Date("2020-08-20"),
    date_to: new Date("2024-05-30"),
    institution: "Codi Academy",
  },
  {
    name: "Scrum Master Certification",
    description:
      "Training program covering agile principles and Scrum methodologies for team management.",
    level: TrainingLevelEnum.MANAGEMENT,
    date_from: new Date("2024-05-01"),
    date_to: new Date("2024-06-15"),
    institution: "Educademia Tech",
  },
];

export const trainingData: ITraining[] = training.map((training) => ({
  name: training.name,
  description: training.description,
  level: training.level,
  date_from: training.date_from,
  date_to: training.date_to,
  institution: training.institution,
  status: StatusEnum.ACTIVE,
}));