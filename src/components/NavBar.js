import { Link } from "react-router-dom";

function Navbar() {

    return (
        <>
            <div className="navbar">

                <Link to="/">Home</Link>

                <Link to="/dashboard">Dashboard</Link>

                <Link to="/students">Students</Link>

                <Link to="/marks">Marks</Link>

                <Link to="/reports">Reports</Link>

                <Link to="/profile">Profile</Link>

                <Link to="/login">Login</Link>

            </div>
        </>
    );

}

export default Navbar;