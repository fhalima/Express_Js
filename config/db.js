let mysql =require('mysql')

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'ferraoun',
    password : 'ferraoun',
    database : 'express_symf_BD'
})

connection.connect();
module.exports = connection