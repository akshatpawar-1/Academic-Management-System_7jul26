import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getStudentMarks } from "../services/markService";

import calculatePercentage from "../utils/percentageCalculator";
import calculateGrade from "../utils/gradeCalculator";
import Loader from "../components/Loader";

function StudentDashboard() {

    const { user } = useAuth();

    const [marks, setMarks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadMarks();

    }, []);

    const loadMarks = async () => {

	setLoading(true);

        try {

            const res = await getStudentMarks();

            console.log(res.data);

            setMarks(res.data);

        }
        catch (error) {

            console.log(error);

        }
	
	setLoading(false);

    };

    // Group Marks Semester Wise

    const semesterWiseMarks = {};

    marks.forEach((m) => {

        if (!semesterWiseMarks[m.semester])
            semesterWiseMarks[m.semester] = [];

        semesterWiseMarks[m.semester].push(m);

    });

    if (loading)
    	return <Loader />;
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

                <div className="student-dashboard">

                    <div className="semester-grid">

                        {

                            Object.keys(semesterWiseMarks)
                                .sort((a, b) => Number(b) - Number(a))
                                .map((semester) => {

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
                                            className="semester-card"
                                        >

                                            <div className="semester-header">

                                                <h2>Semester {semester}</h2>

                                            </div>

                                            <div className="semester-summary">

                                                <div className="summary-item">

                                                    <h3>Percentage</h3>

                                                    <p>{percentage}%</p>

                                                </div>

                                                <div className="summary-item">

                                                    <h3>Grade</h3>

                                                    <p>{grade}</p>

                                                </div>

                                            </div>

                                            <table className="semester-table">

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

                </div>

            </div>
        </>

    );

}

export default StudentDashboard;