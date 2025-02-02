import Task from "../model/task.module.js";
import TaskPriority from "../model/task_priority.model.js"


export const EditTaskAction = async (request,response,next)=>{
    try{
        let {id,title,description,priorityId} = request.body;
        let status = "Active";
        let date = new Date();
        date = date.getDate() +"/"+(date.getMonth()+1)+"/"+date.getFullYear();
        let isEdited = await Task.editTask({id,title,description,priorityId,status,date});
        console.log("body ",id);
        
        if (isEdited) {
            return response.redirect("/task/all-task?success=Task edited successfully!");
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
    Task.findAll()
        .then(result=>{
            console.log(result);
            return response.render("all-task.ejs",{taskList: result});
        }).catch(err=>{
            return response.render("error.ejs");
        })
}
export const CreateTaskPage = async (request,response,next)=>{
    try{
        let taskPriorities = await TaskPriority.findAll();
        const successMessage = request.query.success;
        console.log(taskPriorities);
        
        return response.render("create-task.ejs",{taskPriorities,successMessage});
    }
    catch(err){
        console.log(err);
        
        return response.render("error.ejs");
    }
}
export const CreateTask = async (request,response,next)=>{
    try{
        let {title,description,priorityId} = request.body;
        let status = "Active";
        let date = new Date();
        date = date.getDate() +"/"+(date.getMonth()+1)+"/"+date.getFullYear();
        let isCreated = await Task.create({title,description,priorityId,status,date});
        if (isCreated) {
            return response.redirect("/task/create-task?success=Task created successfully!");
        }

    }
    catch(err){
        console.log(err);
        
        return response.render("error.ejs");
    }
}