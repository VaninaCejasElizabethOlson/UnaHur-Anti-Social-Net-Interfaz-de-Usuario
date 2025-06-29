import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "../style/Layout.css";

const Layout = ({ children }) => {
    const { user, setUser } = useContext(UserContext); // Obtenemos usuario y función para logout desde el contexto

    // Función para cerrar sesión: limpia usuario global y localStorage
    const handleLogout = () => {
        setUser(null);
    };

    return (
        <div>
        {/* Barra de navegación */}
        <header className="navbar">
            <div className="navbar-left">
                {/* Logo o nombre de la app que enlaza al home */}
                <Link to="/">UnaHur Anti-Social</Link>
            </div>

            <div className="navbar-right">
                {/* Botón/Link "Inicio" que lleva a /home */}
                <Link to="/" className="navbar-button">
                    Inicio
                </Link>

                {user ? (
                    <>
                    <Link to="/perfil" className="navbar-button">
                        Mi Perfil
                    </Link>
                        <button onClick={handleLogout} className="navbar-button">
                            Cerrar Sesión
                        </button>
                    </>
                    ) : (
                        <Link to="/login" className="navbar-button">
                            Login
                        </Link>
                    )}
                </div>
        </header>

        {/* Aquí se renderiza el contenido de cada vista */}
        <main>{children}</main>
        </div>
    );
};

export default Layout;

