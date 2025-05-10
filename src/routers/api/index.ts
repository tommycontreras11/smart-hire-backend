import { Router } from "express";

import category from "./category";
import country from "./country";
import competency from "./competency";
import language from "./language";
import positionType from "./position-type";
import evaluationMethod from "./evaluation-method";

const router = Router();

router.use('/categories', category);
router.use('/countries', country);
router.use('/competencies', competency);
router.use('/languages', language);
router.use('/position-types', positionType);
router.use('/evaluation-methods', evaluationMethod);

export default router;