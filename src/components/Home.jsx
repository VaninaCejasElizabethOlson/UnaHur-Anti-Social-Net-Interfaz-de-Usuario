import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Home = () => {
    const { user, setUser } = useContext(UserContext); // Extrae el usuario actual y la función para modificarlo desde el contexto global

    const handleLogout = () => {
        setUser(null);  // Al cerrar sesión, elimina el usuario del contexto.
                        // Gracias al useEffect en UserProvider, esto también borra el localStorage automáticamente.
    };

    return (
        <div>
            <h1>Bienvenido</h1>
            <h2>{user.nickName}</h2>
            <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
    );
};

export default Home;