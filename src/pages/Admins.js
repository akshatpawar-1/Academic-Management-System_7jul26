import { useState, useEffect } from "react";
import {
    addAdmin as saveAdmin,
    getAdmin,
    updateAdmin,
    deleteAdmin
} from "../services/adminService";

function Admins() {

    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [admins, setAdmins] = useState([]);
    const [editing, setEditing] = useState(false);
    const [id, setId] = useState(null);

    const hUsername = (event) => { setUsername(event.target.value); };
    const hName = (event) => { setName(event.target.value); };
    const hEmail = (event) => { setEmail(event.target.value); };
    const hPassword = (event) => { setPassword(event.target.value); };

    const loadAdmins = async () => {

        try {

            const res = await getAdmin();

            console.log(res.data);

            setAdmins(res.data);

        }
        catch (error) {

            console.log(error.response.data.message);

        }

    };

    const editAdmin = (admin) => {

        setId(admin.id);

        setUsername(admin.username);
        setName(admin.name);
        setEmail(admin.email);

        setPassword("");

        setEditing(true);

    };

    const removeAdmin = async (id) => {

        const ans = window.confirm("Are you sure you want to delete this admin?");

        if (!ans)
            return;

        try {

            const res = await deleteAdmin(id);

            console.log(res.data);

            loadAdmins();

        }
        catch (error) {

            console.log(error.response.data.message);

        }

    };

    useEffect(() => {

        loadAdmins();

    }, []);

    const saveAdminData = async (event) => {

        event.preventDefault();

        try {

            const data = {
                username,
                name,
                email,
                password
            };

            let res;

            if (editing) {

                res = await updateAdmin(id, data);

                setEditing(false);
                setId(null);

            }
            else {

                res = await saveAdmin(data);

            }

            console.log(res.data);

            setUsername("");
            setName("");
            setEmail("");
            setPassword("");

            loadAdmins();

        }
        catch (error) {

            console.log(error.response.data.message);

        }

    };

    const resetForm = () => {

    	setUsername("");
    	setName("");
    	setEmail("");
    	setPassword("");

    	setEditing(false);
    	setId(null);

    };

    return (

        <>
            <div className="page">

                <h1>Admin Management</h1>

                <form onSubmit={saveAdminData}>

                    <input
                        type="text"
                        placeholder="Enter Username"
                        value={username}
                        onChange={hUsername}
                        required
                    />

                    <br /><br />

                    <input
                        type="text"
                        placeholder="Enter Name"
                        value={name}
                        onChange={hName}
                        required
                    />

                    <br /><br />

                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={hEmail}
                        required
                    />

                    <br /><br />

                    {
                        !editing && (
                            <>
                                <input
                                    type="password"
                                    placeholder="Enter Password"
                                    value={password}
                                    onChange={hPassword}
                                    required
                                />

                                <br /><br />
                            </>
                        )
                    }
		    <div className="btn-row">
                    	<button type="submit">
                        	{editing ? "Update Admin" : "Add Admin"}
                    	</button>

		    	<button type="button"
				className="reset-btn"
				onClick={resetForm}
			>
    				Reset
		    	</button>
		    </div>

                </form>

                <hr />

                <h2>All Admins</h2>

                <table border="1" cellPadding="10">

                    <thead>

                        <tr>

                            <th>Username</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Edit</th>
                            <th>Delete</th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            admins.map((admin) => (

                                <tr key={admin.id}>

                                    <td>{admin.username}</td>
                                    <td>{admin.name}</td>
                                    <td>{admin.email}</td>
                                    <td>{admin.role}</td>

                                    <td>
                                        <button
                                            type="button"
					    className="edit-btn"
                                            onClick={() => editAdmin(admin)}
                                        >
                                            Edit
                                        </button>
                                    </td>

                                    <td>
                                        <button
                                            type="button"
					    className="delete-btn"
                                            onClick={() => removeAdmin(admin.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>

                                </tr>

                            ))
                        }

                    </tbody>

                </table>

            </div>
        </>

    );

}

export default Admins;