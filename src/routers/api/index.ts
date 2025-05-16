import { Router } from "express";
import { unless } from "./../../utils/unless.util";
import { authMiddleware } from "./../../middlewares/auth/auth.middleware";

import auth from "./auth";
import category from "./category";
import candidate from "./candidate";
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

router.use('/auth', auth);
router.use('/categories', unless([{ path: "/", method: "POST" }], authMiddleware), category);
router.use('/candidates', unless([{ path: "/", method: "POST" }], authMiddleware), candidate);
router.use('/countries', unless([{ path: "/", method: "POST" }], authMiddleware), country);
router.use('/competencies', unless([{ path: "/", method: "POST" }], authMiddleware), competency);
router.use('/departments', unless([{ path: "/", method: "POST" }], authMiddleware), department);
router.use('/languages', unless([{ path: "/", method: "POST" }], authMiddleware), language);
router.use('/trainings', unless([{ path: "/", method: "POST" }], authMiddleware), training);
router.use('/institutions', unless([{ path: "/", method: "POST" }], authMiddleware), institution);
router.use('/position-types', unless([{ path: "/", method: "POST" }], authMiddleware), positionType);
router.use('/evaluation-methods', unless([{ path: "/", method: "POST" }], authMiddleware), evaluationMethod);
router.use('/job-positions', unless([{ path: "/", method: "POST" }], authMiddleware), jobPosition);
router.use('/work-experiences', unless([{ path: "/", method: "POST" }], authMiddleware), workExperience);
router.use('/recruiters', unless([{ path: "/", method: "POST" }], authMiddleware), recruiter);
router.use('/requests', unless([{ path: "/", method: "POST" }], authMiddleware), request);

export default router;