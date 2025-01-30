import Task from "../model/task.module.js";
import TaskPriority from "../model/task_priority.model.js"

export const CreateTask = async (request,response,next)=>{
    try{
        let {title,description,priorityId} = request.body;
        let status = "Active";
        let date = new Date();
        date = date.getDate() +"/"+(date.getMonth()+1)+"/"+date.getFullYear();
        let isCreated = await Task.create({title,description,priorityId,status,date});
        return response.redirect("/task/create-task");
    }
    catch(err){
        console.log(err);
        
        return response.render("error.ejs");
    }
}
export const CreateTaskPage = async (request,response,next)=>{
    try{
        let taskPriorities = await TaskPriority.findAll();
        console.log(taskPriorities);
        
        return response.render("create-task.ejs",{taskPriorities});
    }
    catch(err){
        console.log(err);
        
        return response.render("error.ejs");
    }
}