import express from 'express';
import {CreateTask} from '../controller/task.controller.js';
const route = express.Router();

route.get('/addtask',CreateTask);

export default route;   