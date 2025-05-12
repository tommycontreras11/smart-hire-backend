import { Router } from "express";

import category from "./category";
import country from "./country";
import competency from "./competency";
import department from "./department";
import language from "./language";
import training from "./training";
import institution from "./institution";
import positionType from "./position-type";
import evaluationMethod from "./evaluation-method";
import jobPosition from "./job-position";

const router = Router();

router.use('/categories', category);
router.use('/countries', country);
router.use('/competencies', competency);
router.use('/departments', department);
router.use('/languages', language);
router.use('/trainings', training);
router.use('/institutions', institution);
router.use('/position-types', positionType);
router.use('/evaluation-methods', evaluationMethod);
router.use('/job-positions', jobPosition);

export default router;