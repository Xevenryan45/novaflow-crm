import { Router } from "express";

import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
} from "../controllers/projectController";

import { protect } from "../middleware/authMiddleware";

const router = Router();

router.use(protect);

router.get("/", getProjects);
router.post("/", createProject);
router.patch("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;