import { Link } from "react-router-dom";
import { ROUTES } from "../utils/constants";
import { useAuth } from "../context/AuthContext";

function Navbar() {

    const { user, loading } = useAuth();

    if (loading)
        return null;

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
                    <Link to={ROUTES.LOGOUT}>Logout</Link>
                }

            </div>
        </>

    );

}

export default Navbar;