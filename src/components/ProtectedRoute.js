import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";

function ProtectedRoute({ children, roles }) {

    const { user, loading } = useAuth();

    if (loading)
        return <Loader />;

    if (!user)
        return <Navigate to="/login" replace />;

    if (!roles.includes(user.role))
        return <Navigate to="/login" replace />;

    return children;

}

export default ProtectedRoute;