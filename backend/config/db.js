const mysql = require("mysql2");

const con = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "abc123",
    database: "academic_management_system"

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