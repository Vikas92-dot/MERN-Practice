import express from 'express';
import {CreateTaskPage,CreateTask,FetchTask, FetchTaskById} from '../controller/task.controller.js';
import { verify } from '../middleware/auth.js';
const router = express.Router();

router.get('/create-task',verify,CreateTaskPage);
router.post('/create-task',verify,CreateTask)
router.get('/all-task',verify,FetchTask);
router.get('/load-task/:priorityId',verify,FetchTaskById)
export default router;  