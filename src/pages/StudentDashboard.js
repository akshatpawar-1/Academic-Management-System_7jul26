import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getStudentMarks } from "../services/markService";

import calculatePercentage from "../utils/percentageCalculator";
import calculateGrade from "../utils/gradeCalculator";
import Loader from "../components/Loader";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";

function StudentDashboard() {

    const { user } = useAuth();

    const [marks, setMarks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showWelcome, setShowWelcome] = useState(false);

    useEffect(() => {

        loadMarks();

    }, []);

    useEffect(() => {

        const welcome = localStorage.getItem("showWelcome");

        if (welcome === "true") {

            setShowWelcome(true);

            const timer = setTimeout(() => {

                setShowWelcome(false);
                localStorage.removeItem("showWelcome");

            }, 5000);

            return () => clearTimeout(timer);

        }

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

    // Percentage trend across semesters, oldest to newest

    const trendData = Object.keys(semesterWiseMarks)
        .sort((a, b) => Number(a) - Number(b))
        .map((semester) => {

            const semesterMarks = semesterWiseMarks[semester];

            const marksArray = semesterMarks.map((m) => m.marks);

            const percentage = calculatePercentage(marksArray);

            return {
                semester: `Sem ${semester}`,
                percentage: Number(percentage)
            };

        });

    if (loading)
    	return <Loader />;
    return (

        <>
            <div className="page">

                <h1>Student Dashboard</h1>

                {

                    showWelcome && (

                        <div className="welcome">

                            <h4>Welcome, {user?.name}</h4>

                        </div>

                    )

                }

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

                <hr />

                {

                    trendData.length > 1 && (

                        <div className="panel chart-panel">

                            <h2>Percentage Trend</h2>

                            <div className="chart-container">

                                <ResponsiveContainer width="100%" height="100%">

                                    <LineChart data={trendData}>

                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="semester" />
                                        <YAxis domain={[0, 100]} allowDecimals={false} />
                                        <Tooltip />
                                        <Line
                                            type="monotone"
                                            dataKey="percentage"
                                            stroke="#2563eb"
                                            strokeWidth={2}
                                            dot={{ r: 4 }}
                                        />

                                    </LineChart>

                                </ResponsiveContainer>

                            </div>

                        </div>

                    )

                }

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

                                    // Total marks obtained vs total max marks
                                    // (each subject is assumed to be out of 100)

                                    const totalObtained = marksArray.reduce(
                                        (sum, m) => sum + Number(m),
                                        0
                                    );

                                    const totalMax = marksArray.length * 100;

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

                                                <div className="summary-item">

                                                    <h3>Total Marks</h3>

                                                    <p>{totalObtained}/{totalMax}</p>

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