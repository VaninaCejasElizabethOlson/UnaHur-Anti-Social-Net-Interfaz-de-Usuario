import { createContext, useState, useEffect } from "react";

// Crea un nuevo contexto de usuario
export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
    // Intentar cargar usuario desde localStorage
        const userStorage = localStorage.getItem("user");
        return userStorage ? JSON.parse(userStorage) : null;
    });

    useEffect(() => {
    // Guardar en localStorage si cambia el usuario
    if (user) {
        localStorage.setItem("user", JSON.stringify(user));
    } else {
        localStorage.removeItem("user");
    }
}, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;