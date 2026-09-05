import { Router } from "express";

import {
  createCustomer,
  deleteCustomer,
  getCustomer,
  getCustomers,
  updateCustomer,
} from "../controllers/customerController";

import { protect } from "../middleware/authMiddleware";

const router = Router();

router.use(protect);

router.get("/", getCustomers);
router.post("/", createCustomer);

router.get("/:id", getCustomer);
router.patch("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);

export default router;