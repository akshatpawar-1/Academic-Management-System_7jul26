const con = require("../config/db");
const bcrypt = require("bcrypt");

const login = (req, res) => {
    const { username, password } = req.body;

    // ---------- CHECK ADMIN / SUPER ADMIN ----------
    const sqlUsers = "select * from users where username=?";
    con.query(sqlUsers, [username], (error, result) => {
        if (error)
            return res.status(500).json({
                message: "Database Error"
            });
        if (result.length > 0) {
            const user = result[0];
            if (!user.email_verified)
                return res.status(403).json({
                    message: "Please verify your email before logging in"
                });
            bcrypt.compare(password, user.password, (error, same) => {
                if (error)
                    return res.status(500).json({
                        message: "Authentication Error"
                    });
                if (!same)
                    return res.status(401).json({
                        message: "Invalid Password"
                    });
                req.session.user = {
                    id: user.id,
                    username: user.username,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    photo: user.photo,
                    email_verified: user.email_verified
                };
                return res.json({
                    message: "Login Successful",
                    user: req.session.user
                });
            });
        }
        // ---------- CHECK STUDENT ----------
        else {
            const sqlStudents = "select * from students where username=?";
            con.query(sqlStudents, [username], (error, result) => {
                if (error)
                    return res.status(500).json({
                        message: "Database Error"
                    });
                if (result.length === 0)
                    return res.status(404).json({
                        message: "User Not Found"
                    });
                const student = result[0];
                if (!student.email_verified)
                    return res.status(403).json({
                        message: "Please verify your email before logging in"
                    });
                bcrypt.compare(password, student.password, (error, same) => {
                    if (error)
                        return res.status(500).json({
                            message: "Authentication Error"
                        });
                    if (!same)
                        return res.status(401).json({
                            message: "Invalid Password"
                        });
                    req.session.user = {
                        id: student.id,
                        rollno: student.rollno,
                        username: student.username,
                        name: student.name,
                        email: student.email,
                        program: student.program,
                        semester: student.semester,
                        photo: student.photo,
                        email_verified: student.email_verified,
                        role: "student"
                    };
                    return res.json({
                        message: "Login Successful",
                        user: req.session.user
                    });
                });
            });
        }
    });
};

const logout = (req, res) => {
    req.session.destroy((error) => {
        if (error)
            return res.status(500).json({
                message: "Logout Failed"
            });
        res.json({
            message: "Logout Successful"
        });
    });
};

module.exports = {
    login,
    logout
};