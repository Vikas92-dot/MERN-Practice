import pool from "../db/dbConfig.js";

export default class Product{
    constructor(id, title, price){
        this.id = id;
        this.title = title;
        this.price = price;
    }

    save(){
      return new Promise((resolve,reject)=>{
        pool.getConnection((err,con)=>{
            if(!err){
              let sql = "insert into product(title,price) values(?,?)";
              con.query(sql,[this.title,this.price],(err,result)=>{
                err ? reject(err) : resolve(result);
                con.release();
              });
            }
            else
              reject(err);
        });
      });
    }

    static getProduct(){
      return new Promise((resolve,reject)=>{
        pool.getConnection((err,con)=>{
            if(!err){
              let sql ="select * from product";
              con.query(sql,(err,result)=>{
                err ? reject(err) : resolve(result);
                con.release();
              });
            }
            else
              reject(err);
        })
      });
    }
    static delete(id){
       return new Promise((resolve,reject)=>{
        pool.getConnection((err,con)=>{
            if(!err){
              let sql = "delete from product where id = ?";
              con.query(sql,[id],(err,result)=>{
                err ? reject(err) : resolve(result);
                con.release();
              });
            }
            else
              reject(err);
        })
       }); 
        
    }

    static getProductById(id){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(!err){
                  let sql = "select * from product where id = ?";
                  con.query(sql,[id],(err,result)=>{
                    err ? reject(err) : resolve(result);
                    con.release();
                  });
                }
                else
                  reject(err);
            })
           });
    }
    update(){
        return new Promise((resolve,reject)=>{
            pool.getConnection((err,con)=>{
                if(!err){
                  let sql = "update product set title=?,price=? where id = ?";
                  con.query(sql,[this.title,this.price,this.id],(err,result)=>{
                    err ? reject(err) : resolve(result);
                    con.release();
                  });
                }
                else
                  reject(err);
            })
           });
    }
}