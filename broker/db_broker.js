const mysql = require('mysql2')

// Configuration for querying SQL database
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

const table = process.env.MYSQL_TABLE

// Select All
module.exports.SelectAll = () => {
    return new Promise((resolve, reject) => {
        pool.query('Select * from ??', table, (err, results) => {
            err ? reject(err) : resolve(results)
        })
    })
}

// Find by property
module.exports.FindBy = (prop, val) => {
    return new Promise((resolve, reject) => {
        pool.query('Select * from ?? where (?? = ?)', [table, prop, val], (err, results) => {
            err ? reject(err) : resolve(results)
        })
    })
}

// Sort by property
module.exports.SortBy = (prop) => {
    return new Promise((resolve, reject) => {
        pool.query('Select * from ?? order by ??', [table, prop], (err, results) => {
            err ? reject(err) : resolve(results)
        })
    })
}

// Insert task
module.exports.Insert = (object) =>{
    return new Promise((resolve, reject)=>{
        pool.query( "INSERT INTO ?? (??) VALUES (?)", [table, Object.keys(object), Object.values(object)],(err, results) =>{
            err ? reject(err) : resolve(results)
        })
    })
}

// Update status of task
module.exports.Update = (prop, val, object) =>{
    return new Promise((resolve, reject)=>{
        pool.query("UPDATE ?? SET ? WHERE (?? = ?)", [table, object, prop, val], (err, results) =>{
            err ? reject(err) : resolve(results)
        })
    })
}

// Delete task
module.exports.Delete = (prop, val) =>{
    return new Promise((resolve, reject)=>{
        pool.query( "DELETE FROM ?? WHERE (?? = ?)", [table, prop, val], (err, results) =>{
            err ? reject(err) : resolve(results)
        })
    })
}