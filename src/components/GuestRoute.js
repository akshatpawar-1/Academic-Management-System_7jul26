import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";

function GuestRoute({ children }) {

    const { user, loading } = useAuth();

    if (loading)
        return <Loader />;

    if (user) {

        if (user.role === "student")
            return <Navigate to="/student-dashboard" replace />;

        return <Navigate to="/dashboard" replace />;

    }

    return children;

}

export default GuestRoute;