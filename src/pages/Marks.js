import { useState, useEffect } from "react";
import {
    addMark as saveMark,
    getMarks,
    updateMark,
    deleteMark
} from "../services/markService";

import { getStudents } from "../services/studentService";
import Loader from "../components/Loader";
import { FiSearch } from "react-icons/fi";

function Marks() {

    const [student_id, setStudentId] = useState("");
    const [subject, setSubject] = useState("");
    const [marks, setMarks] = useState("");
    const [semester, setSemester] = useState("");

    const [students, setStudents] = useState([]);
    const [allMarks, setAllMarks] = useState([]);

    const [editing, setEditing] = useState(false);
    const [id, setId] = useState(null);

    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const hStudentId = (event) => { setStudentId(event.target.value); };
    const hSubject = (event) => { setSubject(event.target.value); };
    const hMarks = (event) => { setMarks(event.target.value); };
    const hSemester = (event) => { setSemester(event.target.value); };
    const hSearch = (event) =>{ setSearch(event.target.value); };

    const loadStudents = async () => {

        try {

            const res = await getStudents();

            setStudents(res.data);

        }
        catch (error) {

            console.log(error.response.data.message);

        }

    };

    const loadMarks = async () => {

        setLoading(true);

        try {

            const res = await getMarks();

            console.log(res.data);

            setAllMarks(res.data);

        }
        catch (error) {

            console.log(error.response.data.message);

        }

        setLoading(false);

    };

    useEffect(() => {

        loadStudents();
        loadMarks();

    }, []);

    const editMark = (mark) => {

        setId(mark.id);

        setStudentId(mark.student_id);
        setSubject(mark.subject);
        setMarks(mark.marks);
        setSemester(mark.semester);

        setEditing(true);

    };

    const removeMark = async (id) => {

        const ans = window.confirm("Are you sure you want to delete this Mark?");

        if (!ans)
            return;

        try {

            const res = await deleteMark(id);

            console.log(res.data);

            loadMarks();

        }
        catch (error) {

            console.log(error.response.data.message);

        }

    };

    const saveMarkData = async (event) => {

        event.preventDefault();

        try {

            const data = {

                student_id,
                subject,
                marks,
                semester

            };

            let res;

            if (editing) {

                res = await updateMark(id, data);

                setEditing(false);
                setId(null);

            }
            else {

                res = await saveMark(data);

            }

            console.log(res.data);

            setStudentId("");
            setSubject("");
            setMarks("");
            setSemester("");

            loadMarks();

        }
        catch (error) {

            console.log(error.response.data.message);

        }

    };

    const resetForm = () => {

        setStudentId("");
        setSubject("");
        setMarks("");
        setSemester("");

        setEditing(false);
        setId(null);

    };

    const filteredallMarks = allMarks.filter((m) =>
    	m.rollno.toLowerCase().includes(search.toLowerCase()) ||
    	m.name.toLowerCase().includes(search.toLowerCase()) ||
    	m.subject.toLowerCase().includes(search.toLowerCase())
    );

    if (loading)
        return <Loader />;

    return (

        <>
            <div className="page">

                <h1>Marks Management</h1>

                <form onSubmit={saveMarkData}>

                    <select
                        value={student_id}
                        onChange={hStudentId}
                        required
                    >

                        <option value="">
                            Select Student
                        </option>

                        {

                            students.map((student) => (

                                <option
                                    key={student.id}
                                    value={student.id}
                                >

                                    {student.rollno} - {student.name}

                                </option>

                            ))

                        }

                    </select>

                    <br /><br />

                    <input
                        type="text"
                        placeholder="Enter Subject"
                        value={subject}
                        onChange={hSubject}
                        required
                    />

                    <br /><br />

                    <input
                        type="number"
                        placeholder="Enter Marks"
                        value={marks}
                        onChange={hMarks}
                        required
                    />

                    <br /><br />

                    <select
                        value={semester}
                        onChange={hSemester}
                        required
                    >

                        <option value="">
                            Select Semester
                        </option>

                        <option value="1">Semester 1</option>
                        <option value="2">Semester 2</option>
                        <option value="3">Semester 3</option>
                        <option value="4">Semester 4</option>
                        <option value="5">Semester 5</option>
                        <option value="6">Semester 6</option>
                        <option value="7">Semester 7</option>
                        <option value="8">Semester 8</option>

                    </select>

                    <br /><br />

                    <div className="btn-row">

                        <button type="submit">

                            {editing ? "Update Marks" : "Add Marks"}

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

                <h2>All Marks</h2>

		<div className="search-container">

    			<FiSearch className="search-icon" />

    			<input
        			type="text"
        			className="search-box"
        			placeholder="Search by Roll No Name or Subject..."
        			value={search}
        			onChange={hSearch}
    			/>

		</div>

                <table border="1" cellPadding="10">

                    <thead>

                        <tr>

                            <th>Roll No</th>
                            <th>Name</th>
                            <th>Semester</th>
                            <th>Subject</th>
                            <th>Marks</th>
                            <th>Edit</th>
                            <th>Delete</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            filteredallMarks.map((mark) => (

                                <tr key={mark.id}>

                                    <td>{mark.rollno}</td>
                                    <td>{mark.name}</td>
                                    <td>{mark.semester}</td>
                                    <td>{mark.subject}</td>
                                    <td>{mark.marks}</td>

                                    <td>

                                        <button
                                            type="button"
                                            className="edit-btn"
                                            onClick={() => editMark(mark)}
                                        >

                                            Edit

                                        </button>

                                    </td>

                                    <td>

                                        <button
                                            type="button"
                                            className="delete-btn"
                                            onClick={() => removeMark(mark.id)}
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

export default Marks;