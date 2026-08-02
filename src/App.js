import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "./utils/constants";

import { AuthProvider } from "./context/AuthContext";

import NavBar from "./components/NavBar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Marks from "./pages/Marks";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Admins from "./pages/Admins";
import Logout from "./pages/Logout";
import StudentDashboard from "./pages/StudentDashboard";
import StudentReports from "./pages/StudentReports";

import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";

function App() {

    return (

        <AuthProvider>

            <BrowserRouter>

                <NavBar />

                <Routes>

                    <Route
                        path={ROUTES.HOME}
                        element={<Home />}
                    />

                    <Route
                        path={ROUTES.LOGIN}
                        element={
                            <GuestRoute>
                                <Login />
                            </GuestRoute>
                        }
                    />

                    <Route
                        path={ROUTES.DASHBOARD}
                        element={
                            <ProtectedRoute roles={["admin", "super_admin"]}>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path={ROUTES.STUDENTS}
                        element={
                            <ProtectedRoute roles={["admin", "super_admin"]}>
                                <Students />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path={ROUTES.MARKS}
                        element={
                            <ProtectedRoute roles={["admin", "super_admin"]}>
                                <Marks />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path={ROUTES.REPORTS}
                        element={
                            <ProtectedRoute roles={["admin", "super_admin"]}>
                                <Reports />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path={ROUTES.PROFILE}
                        element={
                            <ProtectedRoute roles={["admin", "super_admin", "student"]}>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path={ROUTES.ADMINS}
                        element={
                            <ProtectedRoute roles={["super_admin"]}>
                                <Admins />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path={ROUTES.LOGOUT}
                        element={
                            <ProtectedRoute roles={["admin", "super_admin", "student"]}>
                                <Logout />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path={ROUTES.STUDENT_DASHBOARD}
                        element={
                            <ProtectedRoute roles={["student"]}>
                                <StudentDashboard />
                            </ProtectedRoute>
                        }
                    />

		    <Route
    			path={ROUTES.STUDENT_REPORTS}
    			element={
			    <ProtectedRoute roles={["student"]}>
				<StudentReports />
			    </ProtectedRoute>
			}
		    />	

                    <Route
                        path="*"
                        element={<NotFound />}
                    />

                </Routes>

            </BrowserRouter>

        </AuthProvider>

    );

}

export default App;