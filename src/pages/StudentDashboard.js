import { useEffect, useState } from "react";

import { useAuth } from "../context/AuthContext";

import { getStudentMarks } from "../services/markService";

import calculatePercentage from "../utils/percentageCalculator";
import calculateGrade from "../utils/gradeCalculator";

function StudentDashboard() {

    const { user } = useAuth();

    const [marks, setMarks] = useState([]);

    useEffect(() => {

        loadMarks();

    }, []);

    const loadMarks = async () => {

        try {

            const res = await getStudentMarks();

            console.log(res.data);

            setMarks(res.data);

        }
        catch (error) {

            console.log(error);

        }

    };

    // Group marks semester-wise
    const semesterWiseMarks = {};

    marks.forEach((m) => {

        if (!semesterWiseMarks[m.semester])
            semesterWiseMarks[m.semester] = [];

        semesterWiseMarks[m.semester].push(m);

    });

    return (

        <>
            <div className="page">

                <h1>Student Dashboard</h1>

                <h2>Welcome, {user?.name}</h2>

                <table border="1" cellPadding="10">

                    <tbody>

                        <tr>
                            <th>Roll No</th>
                            <td>{user?.rollno}</td>
                        </tr>

                        <tr>
                            <th>Program</th>
                            <td>{user?.program}</td>
                        </tr>

                    </tbody>

                </table>

                <br />

                {

                    Object.keys(semesterWiseMarks).map((semester) => {

                        const semesterMarks = semesterWiseMarks[semester];

                        const marksArray = semesterMarks.map(
                            (m) => m.marks
                        );

                        const percentage =
                            calculatePercentage(marksArray);

                        const grade =
                            calculateGrade(Number(percentage));

                        return (

                            <div
                                key={semester}
                                style={{
                                    marginBottom: "40px"
                                }}
                            >

                                <h2>Semester {semester}</h2>

                                <table border="1" cellPadding="10">

                                    <tbody>

                                        <tr>

                                            <th>Percentage</th>

                                            <td>{percentage}%</td>

                                        </tr>

                                        <tr>

                                            <th>Grade</th>

                                            <td>{grade}</td>

                                        </tr>

                                    </tbody>

                                </table>

                                <br />

                                <table border="1" cellPadding="10">

                                    <thead>

                                        <tr>

                                            <th>Subject</th>
                                            <th>Marks</th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {

                                            semesterMarks.map((m) => (

                                                <tr key={m.id}>

                                                    <td>{m.subject}</td>
                                                    <td>{m.marks}</td>

                                                </tr>

                                            ))

                                        }

                                    </tbody>

                                </table>

                            </div>

                        );

                    })

                }

            </div>
        </>

    );

}

export default StudentDashboard;