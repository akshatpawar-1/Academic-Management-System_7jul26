const con = require("../config/db");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const transporter = require("../config/email");

const addAdmin = (req, res) => {

    const { username, name, email, password } = req.body;

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
            return res.status(500).json({ message: "Database Error" });

        if (result.length > 0)
            return res.status(409).json({
                message: "Email already in use by another account"
            });

        bcrypt.hash(password, 10, (error, hash) => {

            if (error)
                return res.status(500).json({ message: "bcrypt Error" });

            const sql = `
                insert into users
                (username, name, email, password, role, photo, email_verified, verification_token)
                values (?, ?, ?, ?, ?, ?, false, ?)
            `;

            con.query(
                sql,
                [username, name, email, hash, "admin", photo, verificationToken],
                (error, result) => {

                    if (error)
                        return res.status(500).json({ message: error.message });

                    const verificationLink =
                        `${process.env.BACKEND_URL}/admins/verify/${verificationToken}`;

                    const mailOptions = {
                        from: process.env.EMAIL_USER,
                        to: email,
                        subject: "Academic Management System - Verify Your Admin Account",
                        text:
                            `Hello ${name},\n\n` +
                            `Your admin account has been created by the superadmin.\n\n` +
                            `Please verify your email by clicking the link below:\n\n` +
                            `${verificationLink}\n\n` +
                            `After verification, you will be able to login.\n\n` +
                            `Academic Management System`
                    };

                    transporter.sendMail(mailOptions, (error, info) => {

                        if (error) {
                            const deleteSql = "delete from users where id=?";
                            con.query(deleteSql, [result.insertId]);

                            return res.status(500).json({
                                message: "Admin Creation Failed. Verification Email Could Not Be Sent"
                            });
                        }

                        res.json({
                            message: "Admin Added. Verification Email Sent Successfully"
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
        update users
        set
            email_verified = true,
            verification_token = null
        where verification_token = ? and role = "admin"
    `;

    con.query(sql, [token], (error, result) => {

        if (error)
            return res.status(500).send("Database Error");

        if (result.affectedRows === 0)
            return res.status(400).send(`
                <div style="min-height:100vh;display:flex;justify-content:center;align-items:center;font-family:Arial, sans-serif;background:#f5f7fa;">
                    <div style="text-align:center;background:white;padding:40px;border-radius:12px;box-shadow:0 4px 15px rgba(0,0,0,0.1);">
                        <h2 style="color:#dc3545;">Verification Link Invalid or Already Used</h2>
                        <p>Please request a new verification email.</p>
                    </div>
                </div>
            `);

        res.send(`
            <div style="min-height:100vh;display:flex;justify-content:center;align-items:center;font-family:Arial, sans-serif;background:#f5f7fa;">
                <div style="text-align:center;background:white;padding:40px;border-radius:12px;box-shadow:0 4px 15px rgba(0,0,0,0.1);">
                    <h2 style="color:#198754;">Email Verified Successfully!</h2>
                    <p>Your admin account has been verified successfully.</p>
                    <p>You can now login to the Academic Management System.</p>
                </div>
            </div>
        `);

    });

};

const getAdmin = (req, res) => {
    const sql = `
        select id, username, name, email, role, photo, email_verified
        from users
        where role = "admin"
    `;
    con.query(sql, (error, result) => {
        if (error)
            return res.status(500).json({ message: "Database Error" });
        res.json(result);
    });
};

const updateAdmin = (req, res) => {

    const { id } = req.params;

    const { username, name, email } = req.body;

    const photo = req.file ? req.file.filename : null;

    // Check if email is used by ANOTHER account (a different user, or a student)
    const checkSql = `
        select email from users where email = ? and id != ?
        union
        select email from students where email = ?
    `;

    con.query(checkSql, [email, id, email], (error, result) => {

        if (error)
            return res.status(500).json({ message: "Database Error" });

        if (result.length > 0)
            return res.status(409).json({
                message: "Email already in use by another account"
            });

        const sql = `
            update users
            set
                username = ?,
                name = ?,
                email = ?,
                photo = coalesce(?, photo)
            where id = ?
        `;

        con.query(sql, [username, name, email, photo, id], (error, result) => {
            if (error)
                return res.status(500).json({ message: "Database Error" });
            res.json({ message: "Admin Updated Successfully" });
        });

    });

};

const deleteAdmin = (req, res) => {
    const { id } = req.params;
    const sql = "delete from users where id = ?";
    con.query(sql, [id], (error, result) => {
        if (error)
            return res.status(500).json({ message: "Database Error" });
        res.json({ message: "Admin Deleted Successfully" });
    });
};

module.exports = {
    addAdmin,
    getAdmin,
    updateAdmin,
    deleteAdmin,
    verifyEmail
};