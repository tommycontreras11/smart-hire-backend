import { Router } from "express";
import { statusCode } from "./../../utils/status.util";

const router = Router();

router.get("/health", (_req, res) => {
  res.status(statusCode.OK).json({ healthy: true });
});

export default router;