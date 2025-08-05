import React, { useContext, useState, useEffect  } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "../style/Layout.css";

const Layout = ({ children }) => {
    const { user, setUser } = useContext(UserContext); // Obtenemos usuario y función para logout desde el contexto
    const [darkMode, setDarkMode] = useState(false);
    // Función para cerrar sesión: limpia usuario global y localStorage
    const handleLogout = () => {
        setUser(null);
    };

    const modoOscuro = ()=>{
        setDarkMode(!darkMode);
    }
      useEffect(() => {
    if (darkMode) {
      document.body.classList.add("bg-dark", "text-white");
    } else {
      document.body.classList.remove("bg-dark", "text-white");
    }
    }, [darkMode]);

    return (
        <div>
            {/* Barra de navegación */}
            <header className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                        {/* Logo o nombre de la app que enlaza al home */}
                        <Link className="navbar-brand fw-bold" to="/">UnaHur Anti-Social</Link>
              
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMenu">
                        <span className="navbar-toggler-icon"></span>
                        </button>

                    <div className="collapse navbar-collapse" id="navbarMenu">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                {/* Botón/Link "Inicio" que lleva a /home */}
                                <Link to="/" className="nav-link">
                                    Inicio
                                </Link>
                            </li>
                            <li className="nav-item">
                                <button
                                onClick={modoOscuro}
                                className="theme-toggle-btn btn rounded-5"
                                title="Cambiar tema"
                                >
                                <i className={`bi ${darkMode ? "bi-moon-fill" : "bi-sun-fill"}`}></i>
                                </button>
                            </li>
                        
                            {user ? (
                                <>
                                <li className="nav-item">
                                    <Link to="/perfil" className="nav-link">
                                        Mi Perfil
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <button onClick={handleLogout} className="btn btn-outline-light fw-bold ms-lg-3 mt-2 mt-lg-0">
                                        Cerrar Sesión
                                    </button>
                                </li>

                                </>
                                ) : (
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link">
                                        Login
                                    </Link>
                                </li>    

                                )}
                        </ul>
                    </div>
                </div>
            </header>

            {/* Aquí se renderiza el contenido de cada vista */}
            <main>{children}</main>
        </div>
    );
};

export default Layout;

