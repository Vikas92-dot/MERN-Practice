import express from 'express';
import AdminRouter from "./route/admin.route.js";
import TaskRouter from "./route/task.route.js";
import bodyParser from 'body-parser';
const app = express();
const port = 3000;

app.set("view engine","ejs");
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//http://localhost:3000/admin/sign-in
app.use('/admin',AdminRouter);
app.use('/task',TaskRouter);


app.listen(port,()=>{
    console.log("Server started at http://localhost:3000");
})

