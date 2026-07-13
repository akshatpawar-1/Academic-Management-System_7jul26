const mysql = require("mysql2");

const con = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "abc123",
    database: "academic_management_system"

});

con.connect((err) => {

    if (err) {

        console.log("Database Connection Failed");
        console.log(err.message);

    }
    else {

        console.log("Database Connected Successfully");

    }

});
module.exports = con;