import { Sequelize } from "sequelize";

//Parameters are database name and mysql db name and password
//
const sequelize = new Sequelize("testsequelize","root","root",{
    host: 'localhost',
    dialect: 'mysql', //It generate query corrospondence to given Database in dialect 
    logging: console.log
});

//All sequalize methods return promise
sequelize.authenticate() 
.then(()=>{
    console.log("Databse connected...");
}).catch(err=>{
    console.log("Error...",err);
});

export default sequelize;