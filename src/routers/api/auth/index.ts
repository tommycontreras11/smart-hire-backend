import { SignInDTO } from "./../../../dto/auth.dto";
import { Router } from "express";
import { validateDTO } from "../../../middlewares/dto/validate-dto.middleware";
import {
    meController,
    signInController,
    signOutController,
} from "./../../../controllers/auth";

const router = Router();

router.get("/me", meController);
router.post("/sign-in", validateDTO(SignInDTO), signInController);
router.post("/sign-out", signOutController);

export default router;