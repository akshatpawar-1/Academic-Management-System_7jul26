import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, roles }) {

    const { user, loading } = useAuth();

    if (loading)
        return <h2>Loading...</h2>;

    if (!user)
        return <Navigate to="/login" replace />;

    if (!roles.includes(user.role))
        return <Navigate to="/login" replace />;

    return children;

}

export default ProtectedRoute;