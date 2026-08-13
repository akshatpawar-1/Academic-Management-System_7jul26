const con = require("../config/db");
const getDashboard = (req, res) => {
    const dashboard = {};
    con.query(
        "select count(*) as total from students",
        (error, result) => {
            if (error)
                return res.status(500).json({
                    message: "Database Error"
                });
            dashboard.students = result[0].total;
            con.query(
                "select count(*) as total from users",
                (error, result) => {
                    if (error)
                        return res.status(500).json({
                            message: "Database Error"
                        });
                    dashboard.admins = result[0].total;
                    con.query(
                        `
                        select
                            rollno,
                            name,
                            program
                        from students
                        order by id desc
                        limit 1
                        `,
                        (error, students) => {
                            if (error)
                                return res.status(500).json({
                                    message: "Database Error"
                                });
                            dashboard.recentStudent = students[0] || null;
                         
                            con.query(
                                `
                                select
                                    students.name,
                                    marks.subject,
                                    marks.semester,
                                    marks.marks
                                from marks
                                join students
                                on marks.student_id = students.id
                                order by marks.id desc
                                limit 5
                                `,
                                (error, marks) => {
                                    if (error)
                                        return res.status(500).json({
                                            message: "Database Error"
                                        });
                                    dashboard.recentMarks = marks;

                                    con.query(
                                        "select round(avg(marks), 2) as collegeAverage from marks",
                                        (error, result) => {
                                            if (error)
                                                return res.status(500).json({
                                                    message: "Database Error"
                                                });
                                            dashboard.collegeAverage = result[0].collegeAverage || 0;

                                            con.query(
                                                `
                                                select
                                                    students.id,
                                                    students.name,
                                                    avg(marks.marks) as avgMarks
                                                from students
                                                join marks
                                                on marks.student_id = students.id
                                                group by students.id, students.name
                                                `,
                                                (error, studentAverages) => {
                                                    if (error)
                                                        return res.status(500).json({
                                                            message: "Database Error"
                                                        });
                                                    dashboard.studentAverages = studentAverages;
                                                    res.json(dashboard);
                                                }
                                            );
                                        }
                                    );
                                }
                            );
                        }
                    );
                }
            );
        }
    );
};
module.exports = {
    getDashboard
};