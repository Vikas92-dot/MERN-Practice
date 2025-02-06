import pool from "../db/dbConfig.js";
let insertedTaskId;

export default class Task{
    constructor(id,title,description,status,date,priorityId){
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
        this.date = date;
        this.priorityId = priorityId;
    }

    static getUserTasks(userId){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(!err){
                    let sql = "SELECT task.id AS task_id, task.title, task.description,task.status, task.date, task.priorityId, user.name AS assigned_user FROM task LEFT JOIN user ON task.userId = user.id WHERE user.id = ?;"
                    con.query(sql,[userId],(err,result)=>{
                        con.release();
                        console.log(result);
                        err ? reject(err) : resolve(result);
                        
                    })
                }
                else reject(err);
            })
        })
    }

     //For adding the user_id and role_Id
     static assign(task){
        return new Promise((resolve , reject)=>{
            pool.getConnection((err , con)=>{
                if(!err){
                    let sql = "UPDATE task SET userId = ? where id = ?";
                    con.query(sql , [task.userId , insertedTaskId] , (err , result)=>{
                        con.release();
                        console.log(insertedTaskId);
                        
                        err ? reject(err) : resolve(result);
                    })
                }else {
                    console.log(err);
                    
                }
            })
        })
    }
    static delete(id){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(!err){
                    let sql = "DELETE from task where id = ?";
                    con.query(sql,[id],(err,result)=>{
                        err ? reject(err) : resolve(true);
                    })
                }
                else reject(err);
            })
        })
    }
    static editTask(task){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(!err){
                     let sql = "UPDATE task SET title = ?,description = ?,date = ?,priorityId = ? WHERE id = ?";
                     con.query(sql,[task.title,task.description,task.date,task.priorityId*1,task.id],(err,result)=>{
                        con.release();
                        err ? reject(err) : resolve(true);
                     })
                }
                else reject(err);
            })
        })
    }
    static create(task){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(!err){
                     let sql = "insert into task(title,description,date,priorityId,userId) values (?,?,?,?,?)";
                     con.query(sql,[task.title,task.description,task.date,task.priorityId*1,task.userId*1],(err,result)=>{
                        con.release();
                        console.log(result);
                        insertedTaskId = result.insertId;
                        
                        err ? reject(err) : resolve(result);
                     })
                }
                else reject(err);
            })
        })
    }
    static findAll(){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(!err){
                    let sql = "SELECT task.id,task.title,task.description,task.date,task.status,task.priorityId,task_priority.priority FROM task INNER JOIN task_priority ON task.priorityId = task_priority.id";
                    con.query(sql,(err,result)=>{
                        con.release();
                        err ? reject(err) : resolve(result);
                    })
                }
                else reject(err);
            })
        })
    }
    static findByPriority(id){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(!err){
                    let sql = "SELECT task.id,task.title,task.description,task.date,task.status,task.priorityId,task_priority.priority FROM task inner join task_priority ON task.priorityId = task_priority.id WHERE task.priorityId = ?"
                    con.query(sql,[id*1],(err,result)=>{
                        con.release();
                        err ? reject(err) : resolve(result);
                    })
                }
                else reject(err);
            })
        })
    }
    static getById(id){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(!err){
                    let sql = "select * from task where id = ?";
                    
                    con.query(sql,[id],(err,result)=>{
                        console.log("Model",sql,result);
                        con.release();
                        err ? reject(err) : resolve(result);
                    })
                }
                else reject(err);
            })
        })
    }
    
}