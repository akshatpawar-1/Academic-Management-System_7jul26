import { createContext, useContext, useEffect, useState } from "react";
import { getSession } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadUser = async () => {

        try {

            const res = await getSession();

            setUser(res.data.user);

        }
        catch {

            setUser(null);

        }

        setLoading(false);

    };

    useEffect(() => {

        loadUser();

    }, []);

    return (

        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                loadUser
            }}
        >
            {children}
        </AuthContext.Provider>

    );

};

export const useAuth = () => useContext(AuthContext);