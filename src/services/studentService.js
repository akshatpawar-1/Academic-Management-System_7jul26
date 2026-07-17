import api from "./api";

export const addStudent = (data) => {

    return api.post("/students", data);

};

export const getStudents = () => {

    return api.get("/students");

};

export const updateStudent = (id, data) => {

    return api.put(`/students/${id}`, data);

};

export const deleteStudent = (id) => {

    return api.delete(`/students/${id}`);

};