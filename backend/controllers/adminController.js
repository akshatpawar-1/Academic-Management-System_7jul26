const con = require("../config/db");
const bcrypt = require("bcrypt");

const addAdmin = (req, res) => {

	const {
        	username,
        	name,
        	email,
        	password

    	} = req.body;

	bcrypt.hash(password, 10, (error, hash) => {

    		if (error)
        		return res.status(500).json({
            		message: "bcrypt Error"

        	});
		const sql = `
			insert into users
			(username,name,email,password,role)
			values(?,?,?,?,?)
		`;

		con.query(sql,[username,name,email,hash,"admin"],(error, result) => {

        		if (error)
            			return res.status(500).json({message: "Database Error"});

        		res.json({

            			message: "Admin Added Successfully"

        		});

    		}
		);
	});
};

const getAdmin = (req, res) => {

    const sql = `
    select
        id,
        username,
        name,
        email,
        role
    from users
    where role = "admin"
    `;

    con.query(sql, (error, result) => {

        if (error)
            return res.status(500).json({
                message: "Database Error"
            });

        res.json(result);

    });

};

const updateAdmin = (req, res) => {

    const { id } = req.params;

    const {
        username,
        name,
        email
    } = req.body;

    const sql = `
    update users
    set
        username = ?,
        name = ?,
        email = ?
    where id = ?
    `;

    con.query(sql,
        [
            username,
            name,
            email,
            id
        ],

        (error, result) => {

            if (error)
                return res.status(500).json({
                    message: "Database Error"
                });

            res.json({
                message: "Admin Updated Successfully"
            });

        }

    );

};

const deleteAdmin = (req, res) => {

    const { id } = req.params;

    const sql = `
    delete from users
    where id = ?
    `;

    con.query(sql, [id], (error, result) => {

        if (error)
            return res.status(500).json({
                message: "Database Error"
            });

        res.json({
            message: "Admin Deleted Successfully"
        });

    });

};

module.exports = {
    addAdmin,
    getAdmin,
    updateAdmin,
    deleteAdmin
};