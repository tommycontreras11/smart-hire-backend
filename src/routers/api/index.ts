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
router.use('/categories', unless([{ path: "/", method: "GET" }], authMiddleware), category);
router.use('/candidates', unless([{ path: "/", method: "POST" }], authMiddleware), candidate);
router.use('/employees', employee);
router.use('/countries', unless([{ path: "/", method: "GET" }], authMiddleware), country);
router.use('/competencies', unless([{ path: "/", method: "GET" }], authMiddleware), competency);
router.use('/departments', unless([{ path: "/", method: "GET" }], authMiddleware), department);
router.use('/languages', unless([{ path: "/", method: "GET" }], authMiddleware), language);
router.use('/trainings', unless([{ path: "/", method: "GET" }], authMiddleware), training);
router.use('/institutions', unless([{ path: "/", method: "GET" }], authMiddleware), institution);
router.use('/position-types', unless([{ path: "/", method: "GET" }], authMiddleware), positionType);
router.use('/evaluation-methods', unless([{ path: "/", method: "GET" }], authMiddleware), evaluationMethod);
router.use('/job-positions', unless([{ path: "/", method: "GET" }], authMiddleware), jobPosition);
router.use('/work-experiences', unless([{ path: "/", method: "GET" }], authMiddleware), workExperience);
router.use('/recruiters', unless([{ path: "/", method: "GET" }], authMiddleware), recruiter);
router.use('/requests', unless([{ path: "/", method: "GET" }], authMiddleware), request);

export default router;