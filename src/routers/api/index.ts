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

router.use('/auth', unless([
    { path: "/sign-in", method: "POST" },
    { path: "/sign-out", method: "POST" }
], authMiddleware), auth);
router.use('/categories', category);
router.use('/candidates', candidate);
router.use('/employees', employee);
router.use('/countries', country);
router.use('/competencies', competency);
router.use('/departments', department);
router.use('/languages', language);
router.use('/trainings', training);
router.use('/institutions', institution);
router.use('/position-types', positionType);
router.use('/evaluation-methods', evaluationMethod);
router.use('/job-positions', jobPosition);
router.use('/work-experiences', workExperience);
router.use('/recruiters', recruiter);
router.use('/requests', request);

export default router;