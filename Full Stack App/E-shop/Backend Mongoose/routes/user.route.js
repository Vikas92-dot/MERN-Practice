import express from 'express';
import { signIn, signUp } from '../controller/user.controller.js';
import { body } from 'express-validator';
const router = express.Router();

router.post('/sign-up',
    body("name","Name is required").notEmpty(),
    body("email","Enter valid email").isEmail(),
    body("email","Email id required").notEmpty(),
    body("password","Password required").notEmpty(),
    body("password","Length should be 6 to 10").isLength({min:6 , max:10}),
    body("contact","Only digits allowed").isNumeric()
    ,signUp);

router.post('/sign-in',signIn);

export default router;