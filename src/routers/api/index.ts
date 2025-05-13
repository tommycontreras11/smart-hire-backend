import { Router } from "express";

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

const router = Router();

router.use('/categories', category);
router.use('/candidates', candidate);
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

export default router;