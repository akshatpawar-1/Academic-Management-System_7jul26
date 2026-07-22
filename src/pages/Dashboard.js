import { useEffect, useState } from "react";
import { getDashboard } from "../services/dashboardService";

function Dashboard() {

    const [dashboard, setDashboard] = useState({

        students: 0,
        admins: 0,
        recentStudent: null

    });

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const res = await getDashboard();

            console.log(res.data);

            setDashboard(res.data);

        }
        catch (error) {

            console.log(error.response?.data?.message || error.message);

        }

    };

    return (

        <>
            <div className="page">

                <h1>Dashboard</h1>

                <div className="dashboard-cards">

                    <div className="card">
                        <h2>Total Students</h2>
                        <h1>{dashboard.students}</h1>
                    </div>

                    <div className="card">
                        <h2>Total Admins</h2>
                        <h1>{dashboard.admins}</h1>
                    </div>

                </div>

                <hr />

                <h2>Recently Added Student</h2>

                {

                    dashboard.recentStudent ? (

                        <table border="1" cellPadding="10">

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

                    ) : (

                        <p>No students added yet.</p>

                    )

                }

            </div>
        </>

    );

}

export default Dashboard;