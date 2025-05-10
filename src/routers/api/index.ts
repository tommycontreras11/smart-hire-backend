import { Router } from "express";

import country from "./country";
import language from "./language";
import category from "./category";
import positionType from "./position-type";

const router = Router();

router.use('/categories', category);
router.use('/countries', country);
router.use('/languages', language);
router.use('/position-types', positionType);

export default router;