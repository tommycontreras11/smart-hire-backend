import { Router } from "express";

import country from "./country";
import language from "./language";
import category from "./category";

const router = Router();

router.use('/categories', category);
router.use('/countries', country);
router.use('/languages', language);

export default router;