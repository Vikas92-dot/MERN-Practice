import pool from "../db/dbConfig.js";

export default class Role{
    constructor(role){
        this.role = role;
    }
    static fetchRole(){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(!err){
                    let sql = "select * from role";
                    con.query(sql,(err,result)=>{
                        err ? reject(err) : resolve(result);
                    })
                }
                else reject(err);
            })
        })
    }
}