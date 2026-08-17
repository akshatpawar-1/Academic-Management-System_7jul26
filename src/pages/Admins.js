import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import {
  addAdmin as saveAdmin,
  getAdmin,
  updateAdmin,
  deleteAdmin,
} from "../services/adminService";
import Loader from "../components/Loader";
import ConfirmDialog from "../components/ConfirmDialog";
import { FiSearch } from "react-icons/fi";
import { validateAdmin } from "../utils/validation";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { MdVerified } from "react-icons/md";

function Admins() {
  const photoRef = useRef();

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState(null);
  const [search, setSearch] = useState("");

  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editing, setEditing] = useState(false);
  const [id, setId] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState(null);

  const hUsername = (event) => setUsername(event.target.value);
  const hName = (event) => setName(event.target.value);
  const hEmail = (event) => setEmail(event.target.value);
  const hPassword = (event) => setPassword(event.target.value);
  const hPhoto = (event) => setPhoto(event.target.files[0]);
  const hSearch = (event) => setSearch(event.target.value);

  const loadAdmins = async () => {
    setLoading(true);

    try {
      const res = await getAdmin();
      setAdmins(res.data);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }

    setLoading(false);
  };

  const editAdmin = (admin) => {
    setId(admin.id);

    setUsername(admin.username);
    setName(admin.name);
    setEmail(admin.email);

    setPassword("");
    setPhoto(null);
    photoRef.current.value = "";

    setEditing(true);
  };

  const removeAdmin = (id) => {
    setAdminToDelete(id);
    setShowConfirmDialog(true);
  };

  const confirmDeleteAdmin = async () => {
    setShowConfirmDialog(false);

    try {
      const res = await deleteAdmin(adminToDelete);

      toast.success(res.data.message);

      setAdminToDelete(null);

      loadAdmins();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);

      setAdminToDelete(null);
    }
  };

  const cancelDeleteAdmin = () => {
    setShowConfirmDialog(false);
    setAdminToDelete(null);
  };

  useEffect(() => {
    loadAdmins();
  }, []);

  const saveAdminData = async (event) => {
    event.preventDefault();

    const error = validateAdmin(
      { username, name, email, password },
      editing
    );

    if (error) {
      toast.error(error);
      return;
    }

    setIsAdding(true);

    try {
      const data = new FormData();

      data.append("username", username);
      data.append("name", name);
      data.append("email", email);

      if (!editing) {
        data.append("password", password);
      }

      if (photo) {
        data.append("photo", photo);
      }

      let res;

      if (editing) {
        res = await updateAdmin(id, data);

        setEditing(false);
        setId(null);
      } else {
        res = await saveAdmin(data);
      }

      toast.success(res.data.message);

      setUsername("");
      setName("");
      setEmail("");
      setPassword("");
      setPhoto(null);
      photoRef.current.value = "";
      setShowPassword(false);

      loadAdmins();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsAdding(false);
    }
  };

  const resetForm = () => {
    setUsername("");
    setName("");
    setEmail("");
    setPassword("");
    setPhoto(null);
    photoRef.current.value = "";

    setEditing(false);
    setId(null);
    setShowPassword(false);
  };

  const filteredAdmins = admins.filter(
    (a) =>
      a.username.toLowerCase().includes(search.toLowerCase()) ||
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <Loader />;

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
          />

          <br />
          <br />

          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={hName}
          />

          <br />
          <br />

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={hEmail}
          />

          <br />
          <br />

          {!editing && (
            <>
              <div className="password-container">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  value={password}
                  onChange={hPassword}
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              <br />
            </>
          )}

          <input
            ref={photoRef}
            type="file"
            accept="image/*"
            onChange={hPhoto}
          />

          <br />
          <br />

          <div className="btn-row">
            <button type="submit" disabled={isAdding}>
              {isAdding
                ? "Adding Admin..."
                : editing
                ? "Update Admin"
                : "Add Admin"}
            </button>

            <button
              type="button"
              className="reset-btn"
              onClick={resetForm}
              disabled={isAdding}
            >
              Reset
            </button>
          </div>
        </form>

        <hr />

        <h2>All Admins</h2>

        <div className="search-container">
          <FiSearch className="search-icon" />

          <input
            type="text"
            className="search-box"
            placeholder="Search by Name Username or Email..."
            value={search}
            onChange={hSearch}
          />
        </div>

        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Photo</th>
              <th>Username</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {filteredAdmins.map((admin) => (
              <tr key={admin.id}>
                <td>
                  {admin.photo ? (
                    <img
                      src={`http://localhost:5000/uploads/${admin.photo}`}
                      alt="Admin"
                      width="70"
                      height="70"
                      style={{
                        borderRadius: "50%",
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                    />
                  ) : (
                    "No Photo"
                  )}
                </td>

                <td>{admin.username}</td>
                <td>{admin.name}</td>

                <td>
                  {admin.email}

                  {admin.email_verified ? (
                    <MdVerified
                      style={{
                        color: "#16a34a",
                        marginLeft: "6px",
                        verticalAlign: "middle",
                      }}
                      title="Verified"
                    />
                  ) : null}
                </td>

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

                <td className="confirm-delete-cell">
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => removeAdmin(admin.id)}
                  >
                    Delete
                  </button>

                  {showConfirmDialog && adminToDelete === admin.id && (
                    <ConfirmDialog
                      show={showConfirmDialog}
                      title="Delete Admin"
                      message="Are you sure you want to delete this admin?"
                      onConfirm={confirmDeleteAdmin}
                      onCancel={cancelDeleteAdmin}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Admins;