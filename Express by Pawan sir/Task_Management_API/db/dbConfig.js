import { Sequelize } from "sequelize";

const sequelize = new Sequelize("task_management_api","root","root",{
    host: "localhost",
    dialect: "mysql"
});

sequelize.authenticate() //It is a method to check database connected or not
    .then(result=>{
        console.log("Database connnected...");
    }).catch(err=>{
        console.log(err);
        
        console.log("Database not connnected...");
    });

export default sequelize;