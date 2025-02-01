import pool from "../db/dbConfig.js";
import Admin from '../model/admin.model.js';
export const dashboard = (request,response,next)=>{
    return response.render("dashboard.ejs");
}
export const signInPage = (request,response,next)=>{
    return response.render("signin.ejs");
}
export const signInAction = (request,response,next)=>{
    let {email,password} = request.body;
    let admin = new Admin(null,email,password);
        admin.authenticate().then(result=>{
            if(result.length != 0){
                request.session.currentUserId = result[0].id;
                request.session.currentUserEmail = result[0].email;
                request.session.isLoggedIn = true;
                return response.redirect("/admin/dashboard");
            }
            else
                return response.redirect("/admin/sign-in");
            
        }).catch(err=>{ 
            return response.render('error.ejs');
        })
    }
