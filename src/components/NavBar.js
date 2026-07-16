import { Link } from "react-router-dom";
import { ROUTES } from "../utils/constants";

function Navbar() {

    return (
        <>
            <div className="navbar">

                <Link to={ROUTES.HOME}>Home</Link>

                <Link to={ROUTES.DASHBOARD}>Dashboard</Link>

                <Link to={ROUTES.STUDENTS}>Students</Link>

                <Link to={ROUTES.MARKS}>Marks</Link>

                <Link to={ROUTES.REPORTS}>Reports</Link>

                <Link to={ROUTES.PROFILE}>Profile</Link>

                <Link to={ROUTES.ADMINS}>Admins</Link>

                <Link to={ROUTES.LOGIN}>Login</Link>

            </div>
        </>
    );

}

export default Navbar;