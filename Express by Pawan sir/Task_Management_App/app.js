import express from 'express';
import AdminRouter from "./route/admin.route.js";
import TaskRouter from "./route/task.route.js";
import bodyParser from 'body-parser';
import UserRouter from './route/user.route.js';
import session from 'express-session';

const app = express();
const port = 3000;

app.set("view engine","ejs");
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({secret:"believeinyourself",resave: true,saveUninitialized: true}));

//http://localhost:3000/admin/sign-in
app.use('/admin',AdminRouter);
app.use('/task',TaskRouter);
app.use('/user',UserRouter);

app.listen(port,()=>{
    console.log("Server started at http://localhost:3000");
})

