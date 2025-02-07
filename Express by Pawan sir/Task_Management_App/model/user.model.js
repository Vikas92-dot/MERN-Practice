import pool from "../db/dbConfig.js";

export default class User{
    constructor(id,name,email,password,role){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    
    }
    authenticateUser(){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(!err){
                    let sql = "select * from user where email = ?";
                    con.query(sql,[this.email],(err,result)=>{
                        con.release();
                        console.log(result);
                        
                        err ? reject(err) : resolve(result);
                    })
                }
                else
                    reject(err);
            })
        })
    }
    static assignTaskId(id){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(!err){
                    let sql = "insert into (taskId) values (?)";
                    con.query(sql,[id],(err,result)=>{
                        con.release();
                        err ? reject(err) : resolve(true);
                    })
                }
                else reject(err);
            })
        })
    }
    static fetchUsersById(role){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(!err){
                    let sql = "select * from user where role = ?";
                    con.query(sql,[role],(err,result)=>{
                        err ? reject(err) : resolve(result);
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
                    let sql = "INSERT INTO user (name,email,password,role) VALUES (?,?,?,?)";
                    con.query(sql,[task.name,task.email,task.password,task.role],(err,result)=>{
                        con.release();
                        err ? reject(err) : resolve(result);
                    })
                }
                else reject(err);
            })
        })
    }
}