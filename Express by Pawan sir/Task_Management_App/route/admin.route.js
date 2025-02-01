import express from "express";
import { signInPage,signInAction, dashboard } from "../controller/admin.controller.js";
import { verify } from "../middleware/auth.js";

const router = express.Router();

router.get("/sign-in",signInPage);
router.post("/sign-in",signInAction);
 router.get("/dashboard",verify,dashboard)

export default router;