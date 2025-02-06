import express from "express";
import { signInPage,signInAction, dashboard, usersList, signout } from "../controller/admin.controller.js";
import { verify } from "../middleware/auth.js";

const router = express.Router();

router.get("/sign-in",signInPage);
router.post("/sign-in",signInAction);
router.get("/dashboard",verify,dashboard);
router.get('/userlist',verify,usersList);
router.post('/sign-out',verify,signout);


export default router;