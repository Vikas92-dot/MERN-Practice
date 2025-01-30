import express from 'express';
import {CreateTaskPage,CreateTask} from '../controller/task.controller.js';
const router = express.Router();

router.get('/create-task',CreateTaskPage);
router.post('/create-task',CreateTask)

export default router;   