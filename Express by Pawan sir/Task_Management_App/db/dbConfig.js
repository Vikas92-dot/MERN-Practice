import mysql from 'mysql2';

const pool = mysql.createPool({
    user:"root",
    password: "root",
    host: "localhost",
    connectionLimit: 100,
    database: 'task_management'
})
export default pool;