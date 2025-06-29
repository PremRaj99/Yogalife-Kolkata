import express from "express";
import { feedback } from "../controllers/feedback.controller.js";

const router = express.Router();

// router method
router.post("/", feedback);

export default router;
