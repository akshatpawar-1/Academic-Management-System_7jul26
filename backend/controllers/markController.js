const con = require("../config/db");

const addMark = (req, res) => {

    const {
        student_id,
        subject,
        marks,
	semester
    } = req.body;

    const sql = `
        insert into marks
        (student_id, subject, marks, semester)
        values (?, ?, ?, ?)
    `;

    con.query(
        sql,
        [student_id, subject, marks, semester],
        (error, result) => {

            if (error) {
                console.log(error);
                return res.status(500).json({
                    message: "Database Error"
                });
            }

            res.json({
                message: "Marks Added Successfully"
            });

        }
    );

};

const getMarks = (req, res) => {

    const sql = `
        select
            marks.id,
            students.rollno,
            students.name,
            marks.student_id,
            marks.subject,
            marks.marks,
	    marks.semester
        from marks
        join students
        on marks.student_id = students.id
        order by students.rollno ASC
    `;

    con.query(sql, (error, result) => {

        if (error) {
            console.log(error);
            return res.status(500).json({
                message: "Database Error"
            });
        }

        res.json(result);

    });

};

const getStudentMarks = (req, res) => {

    const student_id = req.session.user.id;

    const sql = `
        select
	    id,
            subject,
            marks,
	    semester
        from marks
        where student_id = ?
        order by semester,subject;
    `;

    con.query(sql, [student_id], (error, result) => {

        if (error) {

            console.log(error);

            return res.status(500).json({
                message: "Database Error"
            });

        }

        res.json(result);

    });

};

const updateMark = (req, res) => {

    const id = req.params.id;

    const {
        student_id,
        subject,
        marks,
	semester
    } = req.body;

    const sql = `
        update marks
        set
            student_id=?,
            subject=?,
            marks=?,
	    semester=?
        where id=?
    `;

    con.query(
        sql,
        [student_id, subject, marks, semester , id],
        (error, result) => {

            if (error) {
                console.log(error);
                return res.status(500).json({
                    message: "Database Error"
                });
            }

            res.json({
                message: "Marks Updated Successfully"
            });

        }
    );

};

const deleteMark = (req, res) => {

    const id = req.params.id;

    const sql = "delete from marks where id=?";

    con.query(sql, [id], (error, result) => {

        if (error) {
            console.log(error);
            return res.status(500).json({
                message: "Database Error"
            });
        }

        res.json({
            message: "Marks Deleted Successfully"
        });

    });

};

//used by admin reports
const getStudentSemesterReport = (req, res) => {

    const { student_id, semester } = req.params;

    const sql = `
        select
            students.rollno,
            students.name,
            students.program,
            marks.subject,
            marks.marks,
            marks.semester
        from marks
        join students
        on marks.student_id = students.id
        where marks.student_id = ?
        and marks.semester = ?
        order by marks.subject ASC
    `;

    con.query(sql, [student_id, semester], (error, result) => {

        if (error) {

            console.log(error);

            return res.status(500).json({
                message: "Database Error"
            });

        }

        res.json(result);

    });

};

//used by student reports
const getMySemesterReport = (req, res) => {

    const student_id = req.session.user.id;
    const { semester } = req.params;

    const sql = `
        SELECT
            students.rollno,
            students.name,
            students.program,
            marks.subject,
            marks.marks,
            marks.semester
        FROM marks
        JOIN students
        ON marks.student_id = students.id
        WHERE marks.student_id = ?
        AND marks.semester = ?
        ORDER BY marks.subject ASC
    `;

    con.query(sql, [student_id, semester], (error, result) => {

        if (error) {

            console.log(error);

            return res.status(500).json({
                message: "Database Error"
            });

        }

        res.json(result);

    });

};

module.exports = {
    addMark,
    getMarks,
    getStudentMarks,
    getStudentSemesterReport,
    getMySemesterReport,
    updateMark,
    deleteMark
};