import { Router } from "express";
import { unless } from "./../../utils/unless.util";
import { authMiddleware } from "./../../middlewares/auth/auth.middleware";

import auth from "./auth";
import category from "./category";
import candidate from "./candidate";
import employee from "./employee";
import country from "./country";
import competency from "./competency";
import department from "./department";
import language from "./language";
import training from "./training";
import institution from "./institution";
import positionType from "./position-type";
import evaluationMethod from "./evaluation-method";
import jobPosition from "./job-position";
import workExperience from "./work-experience";
import recruiter from "./recruiter";
import request from "./request";

const router = Router();

router.use(
  "/auth",
  unless(
    [
      { path: "/sign-in", method: "POST" },
      { path: "/sign-up", method: "POST" },
      { path: "/sign-out", method: "POST" },
    ],
    authMiddleware
  ),
  auth
);
router.use("/categories", authMiddleware, category);
router.use("/candidates", authMiddleware, candidate);
router.use("/employees", authMiddleware, employee);
router.use(
  "/countries",
  unless(
    [
      {
        path: "/",
        method: "GET",
      },
    ],
    authMiddleware
  ),
  country
);
router.use("/competencies", authMiddleware, competency);
router.use(
  "/departments",
  unless(
    [
      {
        path: "/",
        method: "GET",
      },
    ],
    authMiddleware
  ),
  department
);
router.use("/languages", authMiddleware, language);
router.use("/trainings", authMiddleware, training);
router.use(
  "/institutions",
  unless(
    [
      {
        path: "/",
        method: "GET",
      },
    ],
    authMiddleware
  ),
  institution
);
router.use(
  "/position-types",
  unless(
    [
      {
        path: "/",
        method: "GET",
      },
    ],
    authMiddleware
  ),
  positionType
);
router.use("/evaluation-methods", authMiddleware, evaluationMethod);
router.use(
  "/job-positions",
  unless(
    [
      {
        path: "/",
        method: "GET",
      },
    ],
    authMiddleware
  ),
  jobPosition
);
router.use("/work-experiences", authMiddleware, workExperience);
router.use("/recruiters", authMiddleware, recruiter);
router.use("/requests", unless([{ path: "/accept-job", method: "POST" }], authMiddleware), request);

export default router;
