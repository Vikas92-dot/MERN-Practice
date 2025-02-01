export const verify = (request,response,next)=>{
    if(request.session.isLoggedIn){
        return next();
    }
    else
        //console.log(request.session.isLoggedIn);
        
        response.redirect("/admin/sign-in");
}