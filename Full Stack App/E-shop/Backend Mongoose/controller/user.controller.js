import { validationResult } from "express-validator";
import { User } from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

const generateToken = (userEmail)=>{
    let payload = {subject:userEmail};
    return jwt.sign(payload,process.env.SECRET_KEY);
}

export const signIn = async (request,response,next)=>{
    try {
        let {email,password} = request.body;
        let user = await User.findOne({email});
        if(!user){
            return response.status(401).json({message:"User not found"});
        }
        let hashPassword = user.password;
        let status = bcrypt.compareSync(password,hashPassword);
        return status ? response.status(200).json({message:"Sign in Success",user,token:generateToken(user.email)})
         : response.status(401).status(401).json({error:"Invalid password"});

    } catch (error) {
        console.log(error);
        return response.status(500).json({message:"Internal Server error"});
    }
}

export const signUp = async(request,response,next)=>{
    try {
        let error = validationResult(request);
        if(!error.isEmpty()){
            return response.status(401).json({error:"Bad request..",error});
        }
        let {password} = request.body;
        let saltKey = bcrypt.genSaltSync(10);  
        password = bcrypt.hashSync(password,saltKey); 
        request.body.password = password;     
        const user = await User.create(request.body);
        if(!user){
            return response.status(401).json({message: "bad request"});
        }
        return response.status(201).json({message: "Sign up success",user});
    } catch (error) {
        console.log(error);
    }
}