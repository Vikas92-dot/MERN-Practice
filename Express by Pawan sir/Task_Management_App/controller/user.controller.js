import Role from "../model/role.model.js";
import User from "../model/user.model.js";


export const signInUser = (request,response,next)=>{
    let {email,password} = request.body;
    let user = new User(null,email,password);
        user.authenticateUser().then(result=>{
            if(result.length != 0){
                request.session.currentUserId = result[0].id;
                request.session.currentUserEmail = result[0].email;
                request.session.isLoggedIn = true;
                return response.redirect("/user/user-dashboard");
            }
            else
                return response.redirect("/user/sign-in");
            
        }).catch(err=>{ 
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
export const userDashboard = (request,response,next)=>{
    return response.render('user-dashboard.ejs')
}
export const signUpAction = async (request,response)=>{
    try{
        let {name,email,password,role} = request.body;
        let isCreated = User.create({name,email,password,role});
        if(isCreated){
            console.log("sign up successfully..");
            
            response.render('user-sign-in.ejs');
        }
    }
    catch(err){
        return response.render("error.ejs");
    }
}