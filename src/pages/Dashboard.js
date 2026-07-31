import { useEffect, useState } from "react";
import { getDashboard } from "../services/dashboardService";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";

function Dashboard() {

    const { user } = useAuth();

    const [showWelcome, setShowWelcome] = useState(false);
    const [loading, setLoading] = useState(true);

    const [dashboard, setDashboard] = useState({
        students: 0,
        admins: 0,
        recentStudent: null,
        recentMarks: []
    });

    useEffect(() => {

        loadDashboard();

    }, []);

    useEffect(() => {

        const welcome = localStorage.getItem("showWelcome");

        if (welcome === "true") {

            setShowWelcome(true);

            const timer = setTimeout(() => {

                setShowWelcome(false);
                localStorage.removeItem("showWelcome");

            }, 15000);

            return () => clearTimeout(timer);

        }

    }, []);

    const loadDashboard = async () => {

        setLoading(true);

        try {

            const res = await getDashboard();

            setDashboard(res.data);

        }
        catch (error) {

            console.log(error.response?.data?.message || error.message);

        }

        setLoading(false);

    };

    if (loading)
        return <Loader />;

    return (

        <div className="page">

            <h1>Dashboard</h1>

            {

                showWelcome && (

                    <div className="welcome">

                        <h4>Welcome, {user.name}</h4>

                    </div>

                )

            }

            <div className="dashboard-cards">

                <div className="stat-card">

                    <h2>Total Students</h2>

                    <p>{dashboard.students}</p>

                </div>

                <div className="stat-card">

                    <h2>Total Admins</h2>

                    <p>{dashboard.admins}</p>

                </div>

            </div>

            <hr className="divider" />

            <div className="dashboard-panels">

                {/* Recently Added Student */}

                <div className="panel">

                    <h2>Recently Added Student</h2>

                    {

                        dashboard.recentStudent ? (

                            <>

                                <table>

                                    <tbody>

                                        <tr>

                                            <th>Roll No</th>
                                            <td>{dashboard.recentStudent.rollno}</td>

                                        </tr>

                                        <tr>

                                            <th>Name</th>
                                            <td>{dashboard.recentStudent.name}</td>

                                        </tr>

                                        <tr>

                                            <th>Program</th>
                                            <td>{dashboard.recentStudent.program}</td>

                                        </tr>

                                    </tbody>

                                </table>

                                <Link
                                    className="panel-link"
                                    to="/students"
                                >

                                    View All Students →

                                </Link>

                            </>

                        ) : (

                            <p className="empty-state">

                                No students added yet.

                            </p>

                        )

                    }

                </div>

                {/* Recently Added Marks */}

                <div className="panel">

                    <h2>Recently Added Marks</h2>

                    {

                        dashboard.recentMarks &&
                            dashboard.recentMarks.length > 0 ? (

                            <>

                                <table>

                                    <thead>

                                        <tr>

                                            <th>Student</th>
                                            <th>Subject</th>
                                            <th>Semester</th>
                                            <th>Marks</th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {

                                            dashboard.recentMarks.map((m, index) => (

                                                <tr key={index}>

                                                    <td>{m.name}</td>
                                                    <td>{m.subject}</td>
                                                    <td>{m.semester}</td>
                                                    <td>{m.marks}</td>

                                                </tr>

                                            ))

                                        }

                                    </tbody>

                                </table>

                                <Link
                                    className="panel-link"
                                    to="/marks"
                                >

                                    View All Marks →

                                </Link>

                            </>

                        ) : (

                            <p className="empty-state">

                                No marks added yet.

                            </p>

                        )

                    }

                </div>

            </div>

        </div>

    );

}

export default Dashboard;