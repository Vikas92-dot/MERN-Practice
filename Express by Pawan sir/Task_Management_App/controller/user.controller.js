import { validationResult } from "express-validator";
import Role from "../model/role.model.js";
import Task from "../model/task.module.js";
import User from "../model/user.model.js";
import bcrypt from 'bcryptjs';


export const completeTask = async (request,response,next)=>{
    let taskId = request.params.taskId;
    let isComplete = await Task.remove(taskId);
    if(isComplete){
        console.log("Successfully remove..Task");
        return response.redirect('/user/dashboard');
    }
    else{
        response.render('error.ejs');
    }

}

export const userTasks = async (request,response,next)=>{
    let userId = request.params.userId;
    console.log(userId);
    await Task.getUserTasks(userId).then(result=>{
        let tasks = result;
        return response.render('user-task.ejs',{tasks});
    })
    
    
    
}

export const signOut = (request,response,next)=>{
    request.session.isLoggedIn = false;
    request.session.currentUser = null;
    request.session.destroy();
    return response.redirect("/user/sign-in");
}

export const signInPage = (request,response,next)=>{
    return response.render('user-sign-in.ejs');
} 

export const userDashboard = (request,response,next)=>{
    let userId = request.query.userId;
    
    return response.render('user-dashboard.ejs',{userId});
}

export const signInUser = (request,response,next)=>{
    let {email,password} = request.body;
    let user = new User(null, null, email, null, null);

        user.authenticateUser().then(result=>{
            console.log(result);
            
            if(result.length != 0){
                console.log(result[0]);
                
                let hashPassword = result[0].password;  // Fetch the correct hashed password
                let status = bcrypt.compareSync(password,hashPassword);
                return status ? response.redirect(`/user/dashboard?userId=${result[0].id}`) : response.redirect('/user/sign-in'); 
            }
            else
                return response.redirect("/user/sign-in");
            
        }).catch(err=>{ 
            console.log(err);
            
            return response.render('error.ejs');
        })
    }

export const signUpPage = async (request,response)=>{
    let allRoles = await Role.fetchRole();
    return response.render("sign-up.ejs",{allRoles});
}
export const assignTask = async (request,response,next)=>{
    let taskId = request.params.taskId;
    let isAssigned = await User.assignTaskId(taskId);

    if(isAssigned){
        return response.redirect('task/all-task');
    }
    else {
        console.log("Not assigned");
        response.render('error.ejs');}
}

export const signUpAction =  (request,response)=>{
    
        const errors = validationResult(request);//if this is empty means all validations are passed which we applied in route

        if(errors.isEmpty()){

        let {name,email,password,role} = request.body;
        let saltKey = bcrypt.genSaltSync(10); //generate saltkey with 10 rounds
        password = bcrypt.hashSync(password,saltKey); //stored hashed password in password
        
        User.create({name,email,password,role})
        .then(result=>{
            console.log(result);
            
            console.log("sign up successfully..");
            
            response.render('user-sign-in.ejs');
        }).catch(err=>{
            console.log(err);
            
            return response.render("error.ejs");
        })
        
    }
    else{
        
        console.log({error: "Bad request",errors: errors.array()});
        
        return response.render('error.ejs');
    }
}