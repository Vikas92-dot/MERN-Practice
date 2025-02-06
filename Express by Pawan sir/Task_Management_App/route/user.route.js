import express from 'express';
import { signUpPage,signUpAction,userDashboard, assignTask,signInUser ,signInPage, signOut,userTasks } from '../controller/user.controller.js';

const router = express.Router();


router.get('/sign-up',signUpPage);
router.post('/sign-up',signUpAction);
router.get('/sign-in',signInPage);
router.post('/sign-in',signInUser);
router.get('/dashboard',userDashboard);
router.post('/assign-task/:id',assignTask);
router.post('/sign-out',signOut);
router.get('/user-task',userTasks);

export default router;

