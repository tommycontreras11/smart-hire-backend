import { Router } from "express";

import country from "./country";
import language from "./language";

const router = Router();

router.use('/countries', country);
router.use('/languages', language);

export default router;