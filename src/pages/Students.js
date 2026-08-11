import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import {
  addStudent as saveStudent,
  getStudents,
  updateStudent,
  deleteStudent,
} from "../services/studentService";
import Loader from "../components/Loader";
import { FiSearch } from "react-icons/fi";
import { validateStudent } from "../utils/validation";
import { FiEye, FiEyeOff } from "react-icons/fi";

function Students() {
  const photoRef = useRef();

  const [rollno, setRollno] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [program, setProgram] = useState("");
  const [photo, setPhoto] = useState(null);
  const [search, setSearch] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const [students, setStudents] = useState([]);

  const [editing, setEditing] = useState(false);
  const [id, setId] = useState(null);

  const [loading, setLoading] = useState(true);

  const [showPassword, setShowPassword] = useState(false);

  const hRollno = (event) => setRollno(event.target.value);
  const hUsername = (event) => setUsername(event.target.value);
  const hName = (event) => setName(event.target.value);
  const hEmail = (event) => setEmail(event.target.value);
  const hPassword = (event) => setPassword(event.target.value);
  const hProgram = (event) => setProgram(event.target.value);
  const hPhoto = (event) => setPhoto(event.target.files[0]);
  const hSearch = (event) => setSearch(event.target.value);

  const loadStudents = async () => {
    setLoading(true);

    try {
      const res = await getStudents();

      setStudents(res.data);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const editStudent = (student) => {
    setId(student.id);

    setRollno(student.rollno);
    setUsername(student.username);
    setName(student.name);
    setEmail(student.email);
    setProgram(student.program);

    setPassword("");
    setPhoto(null);
    photoRef.current.value = "";

    setEditing(true);
  };

  const removeStudent = async (id) => {
    const ans = window.confirm(
      "Are you sure you want to delete this Student?"
    );

    if (!ans) return;

    try {
      const res = await deleteStudent(id);

      toast.success(res.data.message);

      loadStudents();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const saveStudentData = async (event) => {
    event.preventDefault();

    const error = validateStudent(
      { rollno, username, name, email, password, program, photo },
      editing
    );

    if (error) {
      toast.error(error);
      return;
    }

    setIsAdding(true);
    try {
      const data = new FormData();

      data.append("rollno", rollno);
      data.append("username", username);
      data.append("name", name);
      data.append("email", email);
      data.append("program", program);

      if (!editing) {
        data.append("password", password);
      }

      if (photo) {
        data.append("photo", photo);
      }

      let res;

      if (editing) {
        res = await updateStudent(id, data);

        setEditing(false);
        setId(null);
      } else {
        res = await saveStudent(data);
      }

      toast.success(res.data.message);

      setRollno("");
      setUsername("");
      setName("");
      setEmail("");
      setPassword("");
      setProgram("");
      setPhoto(null);
      photoRef.current.value = "";

      loadStudents();

    } catch (error) {

      toast.error(error.response?.data?.message || error.message);

    } finally{

      setIsAdding(false);

    }
  };

  const resetForm = () => {
    setRollno("");
    setUsername("");
    setName("");
    setEmail("");
    setPassword("");
    setProgram("");
    setPhoto(null);
    photoRef.current.value = "";

    setEditing(false);
    setId(null);
    setShowPassword(false);
  };

  const filteredStudents = students.filter(
    (s) =>
      s.rollno.toLowerCase().includes(search.toLowerCase()) ||
      s.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <Loader />;

  return (
    <>
      <div className="page">
        <h1>Student Management</h1>

        <form onSubmit={saveStudentData}>
          <input
            type="text"
            placeholder="Enter Roll No"
            value={rollno}
            onChange={hRollno}
          />

          <br />
          <br />

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
        		aria-label={showPassword ? "Hide password" : "Show password"}
    		>
        		{showPassword ? <FiEyeOff /> : <FiEye />}
    		</button>
	      </div>

              <br />
            </>
          )}

          <input
            type="text"
            placeholder="Enter Program"
            value={program}
            onChange={hProgram}
          />

          <br />
          <br />

          <input
            ref={photoRef}
            type="file"
            accept="image/*"
            onChange={hPhoto}
          />

          <br />
          <br />

          <div className="btn-row">
            <button
    		type="submit"
    		disabled={isAdding}
	    >
    		{isAdding
        		? "Adding Student..."
        		: editing
            			? "Update Student"
            			: "Add Student"
    		}
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

        <h2>All Students</h2>

        <div className="search-container">
          <FiSearch className="search-icon" />

          <input
            type="text"
            className="search-box"
            placeholder="Search by Roll No or Name..."
            value={search}
            onChange={hSearch}
          />
        </div>

        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Photo</th>
              <th>Roll No</th>
              <th>User Name</th>
              <th>Name</th>
              <th>Email</th>
              <th>Program</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td>
                  {student.photo ? (
                    <img
                      src={`http://localhost:5000/uploads/${student.photo}`}
                      alt="Student"
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

                <td>{student.rollno}</td>
                <td>{student.username}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.program}</td>

                <td>
                  <button
                    type="button"
                    className="edit-btn"
                    onClick={() => editStudent(student)}
                  >
                    Edit
                  </button>
                </td>

                <td>
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => removeStudent(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Students;