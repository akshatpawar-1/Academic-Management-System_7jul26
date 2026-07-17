import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/authService";
import { useAuth } from "../context/AuthContext";

function Logout() {

    const navigate = useNavigate();

    const { setUser } = useAuth();

    useEffect(() => {

        const logoutUser = async () => {

            const ans = window.confirm("Are you sure you want to logout?");

            if (!ans) {

                navigate("/");
                return;

            }

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

        logoutUser();

    }, [navigate, setUser]);

    return (

        <div className="page">

            <h2>Logging Out...</h2>

        </div>

    );

}

export default Logout;