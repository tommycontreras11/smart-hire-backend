import { Router } from "express";
import { validateDTO } from "../../../middlewares/dto/validate-dto.middleware";
import {
    getProfileController,
    meController,
    signInController,
    signOutController,
} from "./../../../controllers/auth";
import { signUpController } from "./../../../controllers/auth/sign-up.controller";
import { SignInDTO, SignUpDTO } from "./../../../dto/auth.dto";

const router = Router();

router.post("/sign-up", validateDTO(SignUpDTO), signUpController);
router.post("/sign-in", validateDTO(SignInDTO), signInController);
router.post("/sign-out", signOutController);
router.get("/me", meController);
router.get("/account/:uuid/profile", getProfileController);

export default router;