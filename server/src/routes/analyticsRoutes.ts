import { Router } from "express";
import { getAnalytics } from "../controllers/analyticsController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.use(protect);

router.get("/", getAnalytics);

export default router;