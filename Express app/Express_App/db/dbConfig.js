import mysql from "mysql2";

const pool = mysql.createPool({
    user: "root",   
    password: "root",
    database: "ejs_app",
    host: "localhost"   
});

export default pool;