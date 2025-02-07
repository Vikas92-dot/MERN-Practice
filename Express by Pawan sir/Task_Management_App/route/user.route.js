import express from 'express';
import { signUpPage,signUpAction,userDashboard, assignTask,signInUser ,signInPage, signOut,userTasks ,completeTask} from '../controller/user.controller.js';
import { body } from 'express-validator';

const router = express.Router();


router.get('/sign-up',signUpPage);
router.post('/sign-up',
    body("email","Invalid email id").isEmail(),
    body("email","Email id is required").notEmpty(),
    body("password","Password is required").notEmpty(),
    body("password","Invalid Password").isLength({min: 6, max: 10})
    ,signUpAction);
router.get('/sign-in',signInPage);
router.post('/sign-in',signInUser);
router.get('/dashboard',userDashboard);
router.post('/assign-task/:id',assignTask);
router.post('/sign-out',signOut);
router.get('/user-task/:userId',userTasks);
router.get('/complete-task/:taskId',completeTask);

export default router;

