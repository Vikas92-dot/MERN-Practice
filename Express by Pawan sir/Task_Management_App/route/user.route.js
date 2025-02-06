import express from 'express';
import { signUpPage,signUpAction,userDashboard, assignTask,signInUser } from '../controller/user.controller.js';

const router = express.Router();


router.get('/sign-up',signUpPage);
router.post('/sign-up',signUpAction);
router.post('/sign-in',signInUser);
router.get('/user-dashboard',userDashboard);
router.post('/assign-task/:id',assignTask);


export default router;

