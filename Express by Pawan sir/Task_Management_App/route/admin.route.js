import express from "express";
import { signInPage,signIn } from "../controller/admin.controller.js";

const router = express.Router();

router.get("/sign-in",signInPage);
router.post("/sign-in",signIn);

export default router;