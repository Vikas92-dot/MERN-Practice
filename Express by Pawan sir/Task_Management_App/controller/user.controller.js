import User from "../model/user.model.js";

export const signUpPage = (request,response)=>{
    return response.render("sign-up.ejs");
}
export const signUpAction = async (request,response)=>{
    try{
        let {name,email,password} = request.body;
        let isCreated = User.create({name,email,password});
        if(isCreated){
            console.log("sign up successfully..");
            
            response.render('user-sign-in.ejs');
        }
    }
    catch(err){
        return response.render("error.ejs");
    }
}