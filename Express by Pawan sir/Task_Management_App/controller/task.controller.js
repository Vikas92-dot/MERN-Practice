import { response } from "express";
import Task from "../model/task.module.js";
import TaskPriority from "../model/task_priority.model.js"
import Role from "../model/role.model.js";

export const assignTask = async (request,response,next)=>{
    let {userId} = request.body;
    let isAssigned = await Task.assign({userId});
    if(isAssigned){
        console.log("Successfully assigned..Task");
        return response.redirect('/task/create-task');
    }
    else{
        response.render('error.ejs');
    }

}

export const DeleteTask = async (request,response,next)=>{
    try{
        let taskId = request.params.id;
        let isDelete = Task.delete(taskId);
        
        if(isDelete){
            return response.redirect('/task/all-task?delete=Task deleted successfully!');
        }
    }
    catch(err){
        console.log(err);
        response.render("error.ejs");
    }
}

export const EditTaskAction = async (request,response,next)=>{
    try{
        let {id,title,description,priorityId} = request.body;
        let status = "Active";
        let date = new Date();
        date = date.getDate() +"/"+(date.getMonth()+1)+"/"+date.getFullYear();
        let isEdited = await Task.editTask({id,title,description,priorityId,status,date});
        console.log("body ",id);
        
        if (isEdited) {
            return response.redirect("/task/all-task?edit=Task edited successfully!");
        }

    }
    catch(err){
        console.log(err);
        
        return response.render("error.ejs");
    }

}

export const EditTaskPage = async (request,response,next)=>{
    try{
        let taskId = request.params.id;
        let taskPriorities = await TaskPriority.findAll();
        let taskD = await Task.getById(taskId)
        .then(result=>{
            let taskDetails = result[0];
            console.log("taskDe:",result);
            return response.render("edit-task.ejs",{taskPriorities, taskDetails});
        })
        .catch(err=>{
            console.log(err);
            return response.render("error.ejs");
        })
        
    }
    catch(err){
        console.log(err);
        
        return response.render("error.ejs");
    }
    
}


export const FetchTaskById = (request,response,next)=>{
    let priorityId = request.params.priorityId;
    Task.findByPriority(priorityId)
        .then(result=>{
            console.log(result);
            return response.render("all-task.ejs",{taskList: result});
        }).catch(err=>{
            console.log(err);
            return response.render("error.ejs");
        })
}
export const FetchTask =  (request,response)=>{
    const deleteMessage = request.query.delete;
    const editMessage = request.query.edit;

    Task.findAll()
        .then(result=>{
            console.log(result);
            return response.render("all-task.ejs",{taskList: result, deleteMessage, editMessage});
        }).catch(err=>{
            return response.render("error.ejs");
        })
}
export const CreateTaskPage = async (request,response,next)=>{
    try{
        let taskPriorities = await TaskPriority.findAll();
        let allRoles = await Role.fetchRole();
        const successMessage = request.query.success;
        console.log(taskPriorities);
        
        return response.render("create-task.ejs",{taskPriorities,allRoles,successMessage});
    }
    catch(err){
        console.log(err);
        
        return response.render("error.ejs");
    }
}
export const CreateTask = async (request,response,next)=>{
    try{
        let {title,description,priorityId,userId} = request.body;
        let status = "Active";
        let date = new Date();
        date = date.getDate() +"/"+(date.getMonth()+1)+"/"+date.getFullYear();
        let isCreated = await Task.create({title,description,priorityId,status,date,userId});
        
        if (isCreated) {
            return response.redirect(`/admin/userlist?userId=${userId}`);
        }

    }
    catch(err){
        console.log(err);
        
        return response.render("error.ejs");
    }
}