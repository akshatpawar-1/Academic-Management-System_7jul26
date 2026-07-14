const con = require("../config/db");
const bcrypt = require("bcrypt");

const login = (req, res) => {

    const { username, password } = req.body;

    const sql = "select * from users where username = ?";

    con.query(sql, [username], (error, result) => {

        if (error)
            return res.status(500).json({ message: "Database Error" });

        if (result.length === 0)
            return res.status(404).json({ message: "User Not Found" });

        const user = result[0];

        bcrypt.compare(password, user.password, (error, same) => {

            if (error)
                return res.status(500).json({ message: "Authentication Error" });

            if (!same)
                return res.status(401).json({ message: "Invalid Password" });

            req.session.user = {

    		id: user.id,
    		username: user.username,
    		role: user.role

	    };

	    res.json({

    		message: "Login Successful",

    		user: {

        		id: user.id,
        		username: user.username,
        		name: user.name,
        		email: user.email,
        		role: user.role

    		}

	    });
	});

    });

};
module.exports = {login};