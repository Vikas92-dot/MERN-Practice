import express from 'express';
import {CreateTaskPage,CreateTask,FetchTask, FetchTaskById,EditTaskPage,EditTaskAction,DeleteTask,assignTask} from '../controller/task.controller.js';
import { verify } from '../middleware/auth.js';

const router = express.Router();

router.get('/create-task',verify,CreateTaskPage);
router.post('/create-task',verify,CreateTask);
router.get('/all-task',verify,FetchTask);
router.get('/load-task/:priorityId',verify,FetchTaskById)
router.get('/edit-task/:id',verify,EditTaskPage);
router.post('/edit-task',verify,EditTaskAction);
router.get('/delete-task/:id',verify,DeleteTask);
router.post('/assign',assignTask);
export default router;  