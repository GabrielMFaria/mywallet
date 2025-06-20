import { Router } from "express";
import { signUp, signIn } from "../controllers/authController.js";
import { signUpSchema, signInSchema } from "../schemas/authSchemas.js";
import validateSchema from "../middlewares/validateSchema.js";

const authRouter = Router();

authRouter.post("/sign-up", validateSchema(signUpSchema), signUp);
authRouter.post("/sign-in", validateSchema(signInSchema), signIn);

export default authRouter;
