import express from "express";
import { signInPage,signIn, dashboard } from "../controller/admin.controller.js";

const router = express.Router();

router.get("/sign-in",signInPage);
router.post("/sign-in",signIn);
router.get("/dashboard",dashboard)

export default router;