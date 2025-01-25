import { DataTypes } from "sequelize";
import sequelize from "../db/dbConfig.js";
import bcrypt from "bcryptjs";
const User = sequelize.define("user",{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username:{
        type: DataTypes.STRING,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
        set(v){
           console.log("Inside setter "+v); 
           let saltKey = bcrypt.genSaltSync(10);
           let encryptedPassword = bcrypt.hashSync(v,saltKey);
           this.setDataValue("password",encryptedPassword);
        }
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    contact:{
        type: DataTypes.BIGINT
    }
});
//Sync method create table in your database 
sequelize.sync()
.then(()=>{
    console.log("User table created..");
}).catch(err=>{
    console.log(err);
});

export default User;
/*
  Sequelize model turn into model class and it also provide
  interface to interact with the database
  create()
  find()
  findOne()
  destroy()
  update()
  ------------ 
*/