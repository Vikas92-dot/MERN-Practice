import pool from "../db/dbConfig.js";
import Admin from '../model/admin.model.js';
import User from "../model/user.model.js";

export const signout = (request,response,next)=>{
    request.session.isLoggedIn = false;
    request.session.currentUser = null;
    request.session.destroy();
    return response.redirect("/admin/sign-in");
}

export const usersList =  (request,response,next)=>{
    let userId = request.query.userId;  // Use query instead of params
    
    User.fetchUsersById(userId)
            .then(result=>{
                console.log(result);
                return response.render("user-list.ejs",{usersList: result});
            }).catch(err=>{
                console.log(err);
                
                return response.render("error.ejs");
            })
}


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
