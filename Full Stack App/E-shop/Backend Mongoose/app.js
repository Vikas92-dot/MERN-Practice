import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import UserRouter from './routes/user.route.js';
import dotenv from 'dotenv'

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect(process.env.MONGODB_URL)
    .then(result=>{
    console.log("Atlas connected....");
   app.use("/user",UserRouter);
   app.listen(process.env.PORT,()=>{
    console.log("Server Started At http://localhost:3000");
    })})
    .catch(err=>{
        console.log(err);
    })


