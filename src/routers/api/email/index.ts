import {
  sendHiredEmailController,
  sendInterviewEmailController,
} from "./../../../controllers/email";
import {
  SendHiredEmailDTO,
  SendInterviewEmailDTO,
} from "./../../../dto/email.dto";
import { Router } from "express";
import { validateDTO } from "../../../middlewares/dto/validate-dto.middleware";

const router = Router();

router.post(
  "/send-interview",
  validateDTO(SendInterviewEmailDTO),
  sendInterviewEmailController
);
router.post(
  "/send-hired",
  validateDTO(SendHiredEmailDTO),
  sendHiredEmailController
);

export default router;
