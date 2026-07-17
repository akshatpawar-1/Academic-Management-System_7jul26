import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function GuestRoute({ children }) {

    const { user, loading } = useAuth();

    if (loading)
        return <h2>Loading...</h2>;

    if (user) {

        if (user.role === "student")
            return <Navigate to="/student-dashboard" replace />;

        return <Navigate to="/dashboard" replace />;

    }

    return children;

}

export default GuestRoute;