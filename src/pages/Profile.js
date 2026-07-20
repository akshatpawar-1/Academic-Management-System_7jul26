import { useAuth } from "../context/AuthContext";

function Profile() {

    const { user } = useAuth();

    return (
        <>
            <div className="page">

                <h1>My Profile</h1>

                <table border="1" cellPadding="10">

                    <tbody>

                        <tr>
                            <th>Name</th>
                            <td>{user?.name}</td>
                        </tr>

                        <tr>
                            <th>Username</th>
                            <td>{user?.username}</td>
                        </tr>

                        <tr>
                            <th>Email</th>
                            <td>{user?.email}</td>
                        </tr>

                        <tr>
                            <th>Role</th>
                            <td>{user?.role}</td>
                        </tr>

                    </tbody>

                </table>

            </div>
        </>
    );

}

export default Profile;