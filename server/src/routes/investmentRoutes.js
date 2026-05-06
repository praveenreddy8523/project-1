import { Router } from "express";
import { investmentController } from "../controllers/investmentController.js";

const router = Router();

router.post("/AddInvestment",investmentController.addInvestment);
router.get("/GetInvestments",investmentController.getInvestments);


export default router;