const mysql = require("mysql2");

const con = mysql.createConnection({

    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME

});

con.connect((err) => {

    if (err) {

        console.error("Database Connection Failed");
        console.error(err.message);

    }
    else {

        console.log("Database Connected Successfully");

    }

});
module.exports = con;