import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";

function Profile() {

    const { user, loading } = useAuth();

    if (loading)
        return <Loader />;

    return (
        <>
            <div className="page">

                <h1>My Profile</h1>

                <div className="profile-card">

                    {/* Left Side */}
                    <div className="profile-photo-section">

                        {
                            user?.photo ?

                                <img
                                    src={`http://localhost:5000/uploads/${user.photo}`}
                                    alt="Profile"
                                    className="profile-img"
                                />

                                :

                                <img
                                    src="/default-user.png"
                                    alt="Default"
                                    className="profile-img"
                                />

                        }

                    </div>

                    {/* Right Side */}
                    <div className="profile-details-section">

                        <div className="profile-row">
                            <span className="profile-label">Name</span>
                            <span className="profile-value">{user?.name}</span>
                        </div>

                        <div className="profile-row">
                            <span className="profile-label">Username</span>
                            <span className="profile-value">{user?.username}</span>
                        </div>

                        <div className="profile-row">
                            <span className="profile-label">Email</span>
                            <span className="profile-value">{user?.email}</span>
                        </div>

                        <div className="profile-row">
                            <span className="profile-label">Role</span>
                            <span className="profile-value">
                                {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
                            </span>
                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}

export default Profile;