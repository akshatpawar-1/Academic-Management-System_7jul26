import api from "./api";

export const addAdmin = (data) => {

    return api.post("/admins", data);

};

export const getAdmin = () => {

    return api.get("/admins");

};

export const updateAdmin = (id, data) => {

    return api.put(`/admins/${id}`, data);

};

export const deleteAdmin = (id) => {

    return api.delete(`/admins/${id}`);

};