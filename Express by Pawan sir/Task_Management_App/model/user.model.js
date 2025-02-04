import pool from "../db/dbConfig.js";

export default class User{
    constructor(id,name,email,password){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }
    static create(task){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(!err){
                    let sql = "INSERT INTO user (name,email,password) VALUES (?,?,?)";
                    con.query(sql,[task.name,task.email,task.password],(err,result)=>{
                        con.release();
                        err ? reject(err) : resolve(true);
                    })
                }
                else reject(err);
            })
        })
    }
}