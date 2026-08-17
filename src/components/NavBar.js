import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../utils/constants";
import { useAuth } from "../context/AuthContext";
import ConfirmDialog from "../components/ConfirmDialog";
import { logout } from "../services/authService";

function Navbar() {
    const { user, loading, setUser } = useAuth();
    const navigate = useNavigate();
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    if (loading)
        return null;

    const handleLogout = async () => {
        setShowConfirmDialog(false);
        try {
            await logout();
            setUser(null);
            navigate(ROUTES.LOGIN, { replace: true });
        } catch (error) {
            console.log(
                error.response?.data?.message || error.message
            );
        }
    };

    const cancelLogout = () => {
        setShowConfirmDialog(false);
    };

    return (
        <>
            <div className="navbar">
                <Link to={ROUTES.HOME}>Home</Link>
                {
                    user &&
                    (user.role === "admin" || user.role === "super_admin") &&
                    <>
                        <Link to={ROUTES.DASHBOARD}>Dashboard</Link>
                        <Link to={ROUTES.STUDENTS}>Students</Link>
                        <Link to={ROUTES.MARKS}>Marks</Link>
                        <Link to={ROUTES.REPORTS}>Reports</Link>
                    </>
                }
                {
                    user &&
                    user.role === "student" &&
                    <>
                        <Link to={ROUTES.STUDENT_DASHBOARD}>Dashboard</Link>
                        <Link to={ROUTES.STUDENT_REPORTS}>My Reports</Link>
                    </>
                }
                {
                    user &&
                    <Link to={ROUTES.PROFILE}>Profile</Link>
                }
                {
                    user &&
                    user.role === "super_admin" &&
                    <Link to={ROUTES.ADMINS}>Admins</Link>
                }
                {
                    !user &&
                    <Link to={ROUTES.LOGIN}>Login</Link>
                }
                {
                    user &&
                    <span className="navbar-logout-wrapper">
                        <button
                            type="button"
                            className="navbar-logout"
                            onClick={() => setShowConfirmDialog(true)}
                        >
                            Logout
                        </button>

                        <ConfirmDialog
                            show={showConfirmDialog}
                            title="Logout"
                            message="Are you sure you want to logout?"
                            onConfirm={handleLogout}
                            onCancel={cancelLogout}
                        />
                    </span>
                }
            </div>
        </>
    );
}

export default Navbar;