import express from 'express';
import { signUpPage,signUpAction } from '../controller/user.controller.js';
const router = express.Router();


router.get('/sign-up',signUpPage);
router.post('/sign-up',signUpAction);
// router.get('/sign-in',)

export default router;

