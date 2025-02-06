import Role from "../model/role.model.js";
import User from "../model/user.model.js";

export const userTasks = (request,response,next)=>{

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

export const signInUser = (request,response,next)=>{
    let {email,password} = request.body;
    let user = new User(null,email,password);
        user.authenticateUser().then(result=>{
            console.log(result);
            
            if(result.length != 0){
                
                return response.redirect(`/user/dashboard?userId=${result[0].id}`);
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