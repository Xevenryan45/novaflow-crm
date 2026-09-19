import { Router } from "express";

import {
  changePassword,
  getSettings,
  updateProfile,
} from "../controllers/settingsController";

import { protect } from "../middleware/authMiddleware";

const router = Router();

router.use(protect);

router.get("/", getSettings);
router.patch("/", updateProfile);
router.patch("/password", changePassword);

export default router;