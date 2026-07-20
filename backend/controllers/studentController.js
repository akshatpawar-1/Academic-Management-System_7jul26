const con = require("../config/db");
const bcrypt = require("bcrypt");

const addStudent = (req, res) => {

    const {
        rollno,
        username,
        name,
        email,
        password,
        program
    } = req.body;

    bcrypt.hash(password, 10, (error, hashedPassword) => {

        if (error)
            return res.status(500).json({
                message: "Password Hashing Error"
            });

        const sql = `
            insert into students
            (rollno, username, name, email, password, program)
            values (?, ?, ?, ?, ?, ?)
        `;

        con.query(
            sql,
            [
                rollno,
                username,
                name,
                email,
                hashedPassword,
                program
            ],
            (error, result) => {

                if (error)
                    return res.status(500).json({
                        message: "Database Error"
                    });

                res.json({
                    message: "Student Added Successfully"
                });

            }
        );

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

    const sql = `
        update students
        set
            rollno=?,
            username=?,
            name=?,
            email=?,
            program=?
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
    deleteStudent
};