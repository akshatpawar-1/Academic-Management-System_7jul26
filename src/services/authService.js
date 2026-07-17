import api from "./api";

export const login = (data) => {

    return api.post("/auth/login", data);

};

export const logout = () => {

    return api.post("/auth/logout");

};

export const getSession = () => {

    return api.get("/session");

};