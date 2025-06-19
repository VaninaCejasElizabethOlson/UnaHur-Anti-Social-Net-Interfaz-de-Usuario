import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import "../style/home.css";

const Home = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/"); // Redirecciona al login o página principal
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
        <button onClick={handleLogout} className="logout-btn">
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default Home;
