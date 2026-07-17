const con = require("../config/db");

const addStudent = (req, res) => {

    const {
        rollno,
        username,
        name,
        email,
	password,
        program,
        semester
    } = req.body;

    const sql = `
        insert into students
        (rollno,username,name,email,password,program,semester)
        values(?,?,?,?,?,?,?)
    `;

    con.query(
        sql,
        [rollno,username, name, email,password, program, semester],
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
	password,
        program,
        semester
    } = req.body;

    const sql = `
        update students
        set rollno=?,
	    username=?,
            name=?,
            email=?,
	    password=?,
            program=?,
            semester=?
        where id=?
    `;

    con.query(
        sql,
        [
            rollno,
	    username,
            name,
            email,
	    password,
            program,
            semester,
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