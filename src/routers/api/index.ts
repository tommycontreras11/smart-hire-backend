import { Router } from "express";

import country from "./country";

const router = Router();

router.use('/countries', country);

export default router;