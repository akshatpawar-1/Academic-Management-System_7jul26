const con = require("../config/db");
const bcrypt = require("bcrypt");

const crypto = require("crypto");
const transporter = require("../config/email");

const addStudent = (req, res) => {

    const {
        rollno,
        username,
        name,
        email,
        password,
        program
    } = req.body;

    const photo = req.file ? req.file.filename : null;

    const verificationToken = crypto.randomBytes(32).toString("hex");

    // Check if email already exists in EITHER table
    const checkSql = `
        select email from users where email = ?
        union
        select email from students where email = ?
    `;

    con.query(checkSql, [email, email], (error, result) => {

        if (error)
            return res.status(500).json({
                message: "Database Error"
            });

        if (result.length > 0)
            return res.status(409).json({
                message: "Email already in use by another account"
            });

        bcrypt.hash(password, 10, (error, hashedPassword) => {

            if (error)
                return res.status(500).json({
                    message: "Password Hashing Error"
                });

            const sql = `
                insert into students
                (
                    rollno,
                    username,
                    name,
                    email,
                    password,
                    program,
                    photo,
                    email_verified,
                    verification_token
                )
                values (?, ?, ?, ?, ?, ?, ?, false, ?)
            `;

            con.query(
                sql,
                [
                    rollno,
                    username,
                    name,
                    email,
                    hashedPassword,
                    program,
                    photo,
                    verificationToken
                ],
                (error, result) => {

                    if (error)
                        return res.status(500).json({
                            message: error.message
                        });

                    const verificationLink =
                        `${process.env.BACKEND_URL}/students/verify/${verificationToken}`;

                    const mailOptions = {

                        from: process.env.EMAIL_USER,

                        to: email,

                        subject: "Academic Management System - Verify Your Email",

                        text:
                            `Hello ${name},\n\n` +
                            `Your student account has been created by the administrator.\n\n` +
                            `Please verify your email by clicking the link below:\n\n` +
                            `${verificationLink}\n\n` +
                            `After verification, you will be able to login.\n\n` +
                            `Academic Management System`
                    };

                    transporter.sendMail(mailOptions, (error, info) => {

                        if (error) {

                            // Remove student if email could not be sent
                            const deleteSql =
                                "delete from students where id=?";

                            con.query(deleteSql, [result.insertId]);

                            return res.status(500).json({
                                message: "Student Creation Failed. Verification Email Could Not Be Sent"
                            });
                        }

                        res.json({
                            message: "Student Added. Verification Email Sent Successfully"
                        });

                    });

                }
            );

        });

    });

};

const verifyEmail = (req, res) => {

    const token = req.params.token;

    const sql = `
        update students
        set
            email_verified = true,
            verification_token = null
        where verification_token=?
    `;

    con.query(sql, [token], (error, result) => {

        if (error)
            return res.status(500).send("Database Error");

        if (result.affectedRows === 0)
    		return res.status(400).send(`
        		<div style="
            			min-height:100vh;
            			display:flex;
            			justify-content:center;
            			align-items:center;
            			font-family:Arial, sans-serif;
            			background:#f5f7fa;
        		">
            			<div style="
                			text-align:center;
                			background:white;
                			padding:40px;
                			border-radius:12px;
                			box-shadow:0 4px 15px rgba(0,0,0,0.1);
            			">
                			<h2 style="color:#dc3545;">
                    				Verification Link Invalid or Already Used
                			</h2>
                			<p>
                    				Please request a new verification email.
                			</p>
            			</div>
        		</div>
    		`);

	res.send(`
    		<div style="
        		min-height:100vh;
        		display:flex;
        		justify-content:center;
        		align-items:center;
        		font-family:Arial, sans-serif;
        		background:#f5f7fa;
    		">
        		<div style="
            			text-align:center;
            			background:white;
            			padding:40px;
            			border-radius:12px;
            			box-shadow:0 4px 15px rgba(0,0,0,0.1);
        		">
            			<h2 style="color:#198754;">
                			Email Verified Successfully!
            			</h2>

            			<p>
                			Your student account has been verified successfully.
            			</p>

            			<p>
                			You can now login to the Academic Management System.
            			</p>
        		</div>
    		</div>
	`);

    });

};

const getStudents = (req, res) => {

    const sql = "select * from students order by rollno asc";

    con.query(sql, (error, result) => {

        if (error)
            return res.status(500).json({
                message: "Database Error"
            });

        res.json(result);

    });

};

const updateStudent = (req, res) => {

    const id = req.params.id;

    const {
        rollno,
        username,
        name,
        email,
        program
    } = req.body;

    const photo = req.file ? req.file.filename : null;

    // Check if email is used by ANOTHER account (users, or a different student)
    const checkSql = `
        select email from users where email = ?
        union
        select email from students where email = ? and id != ?
    `;

    con.query(checkSql, [email, email, id], (error, result) => {

        if (error)
            return res.status(500).json({
                message: "Database Error"
            });

        if (result.length > 0)
            return res.status(409).json({
                message: "Email already in use by another account"
            });

        const sql = `
            update students
            set
                rollno=?,
                username=?,
                name=?,
                email=?,
                program=?,
                photo = coalesce(?, photo)
            where id=?
        `;

        con.query(
            sql,
            [
                rollno,
                username,
                name,
                email,
                program,
                photo,
                id
            ],
            (error, result) => {

                if (error)
                    return res.status(500).json({
                        message: "Database Error"
                    });

                res.json({
                    message: "Student Updated Successfully"
                });

            }
        );

    });

};

const deleteStudent = (req, res) => {

    const id = req.params.id;

    const sql = "delete from students where id=?";

    con.query(sql, [id], (error, result) => {

        if (error)
            return res.status(500).json({
                message: "Database Error"
            });

        res.json({
            message: "Student Deleted Successfully"
        });

    });

};

module.exports = {
    addStudent,
    getStudents,
    updateStudent,
    deleteStudent,
    verifyEmail
};