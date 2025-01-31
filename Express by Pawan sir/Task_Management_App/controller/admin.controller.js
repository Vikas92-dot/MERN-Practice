import pool from "../db/dbConfig.js";
import Admin from '../model/admin.model.js';
export const dashboard = (request,response,next)=>{
    return response.render("dashboard.ejs");
}
export const signInPage = (request,response,next)=>{
    return response.render("signin.ejs");
}
export const signIn = (request,response,next)=>{
    let {email,password} = request.body;
    let admin = new Admin(null,email,password);
        admin.authenticate().then(result=>{
            return result.length ? response.redirect('/task/all-task') : response.redirect("/admin/sign-in"); 
        }).catch(err=>{ 
            return response.render('error.ejs');
        })
    }
