const con = require("../config/db");

const addMark = (req, res) => {

    const {
        student_id,
        subject,
        marks
    } = req.body;

    const sql = `
        insert into marks
        (student_id, subject, marks)
        values (?, ?, ?)
    `;

    con.query(
        sql,
        [student_id, subject, marks],
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
            marks.marks
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

const updateMark = (req, res) => {

    const id = req.params.id;

    const {
        student_id,
        subject,
        marks
    } = req.body;

    const sql = `
        update marks
        set
            student_id=?,
            subject=?,
            marks=?
        where id=?
    `;

    con.query(
        sql,
        [student_id, subject, marks, id],
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

module.exports = {
    addMark,
    getMarks,
    updateMark,
    deleteMark
};