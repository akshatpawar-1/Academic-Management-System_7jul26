import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import ConfirmDialog from "../components/ConfirmDialog";

function Logout() {

    const navigate = useNavigate();

    const { setUser } = useAuth();

    const [showConfirmDialog, setShowConfirmDialog] = useState(true);
    const [loggingOut, setLoggingOut] = useState(false);

    const cancelLogout = () => {

        setShowConfirmDialog(false);

        navigate("/");

    };

    const confirmLogout = async () => {

        setShowConfirmDialog(false);
        setLoggingOut(true);

        try {

            const res = await logout();

            console.log(res.data);

            setUser(null);

        }
        catch (error) {

            if (error.response)
                console.log(error.response.data.message);
            else
                console.log(error);

        }
        finally {

            navigate("/login", { replace: true });

        }

    };

    return (

        <>

            <ConfirmDialog
                show={showConfirmDialog}
                title="Logout"
                message="Are you sure you want to logout?"
                onConfirm={confirmLogout}
                onCancel={cancelLogout}
            />

            <div className="page">

                <h2>
                    {loggingOut ? "Logging Out..." : "Logout"}
                </h2>

            </div>

        </>

    );

}

export default Logout;