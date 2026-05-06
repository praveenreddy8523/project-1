import { Router } from "express";
import { authController } from "../controllers/authController.js";

const router = Router();
    router.get("/Login", authController.userLogin);
    router.get("/AdminLogin", authController.adminLogin);
    router.get("/ForgotPassword",authController.forgotPassword);



export default router;
