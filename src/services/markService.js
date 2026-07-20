import api from "./api";

export const addMark = (data) => {

    return api.post("/marks", data);

};

export const getMarks = () => {

    return api.get("/marks");

};

export const updateMark = (id, data) => {

    return api.put(`/marks/${id}`, data);

};

export const deleteMark = (id) => {

    return api.delete(`/marks/${id}`);

};

export const getStudentMarks = () => {

    return api.get("/marks/student");

};