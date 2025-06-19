import { useContext } from "react";
import { UserContext } from "../context/UserContext";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
import "../style/home.css";

const Home = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <div className="home-container">
      <h1>Bienvenido</h1>
      <h2>{user?.nickName}</h2>

      <div className="feature-box">
        <h3>📌 Tu progreso</h3>
        <p>Publicaciones recientes, comentarios, y más se mostrarán acá.</p>
      </div>

      <div className="quick-links">
        <button className="action-btn">Crear publicación</button>
        <button className="action-btn">Explorar feed</button>
        <button onClick={handleLogout} className="logout-btn">Cerrar sesión</button>
      </div>
    </div>
  );
};

export default Home;
=======

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
>>>>>>> 47e413df065a58ae39a158c5c821d1dd912b94c7
