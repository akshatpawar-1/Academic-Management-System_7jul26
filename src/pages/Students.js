import { useState, useEffect } from "react";
import {
    addStudent as saveStudent,
    getStudents,
    updateStudent,
    deleteStudent
} from "../services/studentService";

function Students() {

    const [rollno, setRollno] = useState("");
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [program, setProgram] = useState("");
    const [students, setStudents] = useState([]);
    const [editing, setEditing] = useState(false);
    const [id, setId] = useState(null);

    const hRollno = (event) => setRollno(event.target.value);
    const hUsername = (event) => setUsername(event.target.value);
    const hName = (event) => setName(event.target.value);
    const hEmail = (event) => setEmail(event.target.value);
    const hPassword = (event) => setPassword(event.target.value);
    const hProgram = (event) => setProgram(event.target.value);

    const loadStudents = async () => {

        try {

            const res = await getStudents();

            setStudents(res.data);

        }
        catch (error) {

            console.log(error.response.data.message);

        }

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

        // Never prefill password
        setPassword("");

        setEditing(true);

    };

    const removeStudent = async (id) => {

        const ans = window.confirm("Are you sure you want to delete this Student?");

        if (!ans)
            return;

        try {

            const res = await deleteStudent(id);

            console.log(res.data);

            loadStudents();

        }
        catch (error) {

            console.log(error.response.data.message);

        }

    };

    const saveStudentData = async (event) => {

        event.preventDefault();

        try {

            let data;

            if (editing) {

                data = {
                    rollno,
                    username,
                    name,
                    email,
                    program
                };

            }
            else {

                data = {
                    rollno,
                    username,
                    name,
                    email,
                    password,
                    program
                };

            }

            let res;

            if (editing) {

                res = await updateStudent(id, data);

                setEditing(false);
                setId(null);

            }
            else {

                res = await saveStudent(data);

            }

            console.log(res.data);

            setRollno("");
            setUsername("");
            setName("");
            setEmail("");
            setPassword("");
            setProgram("");

            loadStudents();

        }
        catch (error) {

            console.log(error.response.data.message);

        }

    };

    const resetForm = () => {

        setRollno("");
        setUsername("");
        setName("");
        setEmail("");
        setPassword("");
        setProgram("");

        setEditing(false);
        setId(null);

    };

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
                        required
                    />

                    <br /><br />

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

                    {!editing && (
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
                    )}

                    <input
                        type="text"
                        placeholder="Enter Program"
                        value={program}
                        onChange={hProgram}
                        required
                    />

                    <br /><br />

                    <div className="btn-row">

                        <button type="submit">
                            {editing ? "Update Student" : "Add Student"}
                        </button>

                        <button
                            type="button"
                            className="reset-btn"
                            onClick={resetForm}
                        >
                            Reset
                        </button>

                    </div>

                </form>

                <hr />

                <h2>All Students</h2>

                <table border="1" cellPadding="10">

                    <thead>

                        <tr>

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

                        {students.map((student) => (

                            <tr key={student.id}>

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