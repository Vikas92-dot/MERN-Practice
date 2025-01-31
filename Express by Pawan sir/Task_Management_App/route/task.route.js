import express from 'express';
import {CreateTaskPage,CreateTask,FetchTask, FetchTaskById} from '../controller/task.controller.js';
const router = express.Router();

router.get('/create-task',CreateTaskPage);
router.post('/create-task',CreateTask)
router.get('/all-task',FetchTask);
router.get('/load-task/:priorityId',FetchTaskById)
export default router;   