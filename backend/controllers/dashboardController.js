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

                            res.json(dashboard);

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