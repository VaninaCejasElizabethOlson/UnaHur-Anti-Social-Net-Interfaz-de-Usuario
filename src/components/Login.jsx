import "../style/styles.css";
import "../style/register.css";
import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";

=======
>>>>>>> 47e413df065a58ae39a158c5c821d1dd912b94c7

const Login = () => {
  const { setUser } = useContext(UserContext); // Obtiene la función setUser del contexto para guardar el usuario logueado globalmente
  const [nombre, setNombre] = useState(""); // Estado para guardar el nickname ingresado por el usuario
  const [contraseña, setContraseña] = useState(""); // Estado para la contraseña ingresada
  const [error, setError] = useState(""); // Estado para mostrar mensajes de error
<<<<<<< HEAD
  const navigate = useNavigate();
=======
>>>>>>> 47e413df065a58ae39a158c5c821d1dd912b94c7

  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario (recargar la página)

    // Validación de campos vacíos
    if (!nombre || !contraseña) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    // Validación de contraseña fija
    if (contraseña !== "123456") {
      setError("Contraseña incorrecta.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/users"); // Realiza una petición GET a la API para obtener los usuarios
      const data = await res.json(); // Convierte la respuesta en JSON

      // Busca si existe el nickname ingresado dentro de los usuarios recibidos
      const usuarioEncontrado = data.find((u) => u.nickName === nombre);

      // Si no se encuentra el usuario, muestra un error
      if (!usuarioEncontrado) {
        setError("Usuario no encontrado.");
        return;
      }

<<<<<<< HEAD
      setUser(usuarioEncontrado);
      setError("");
      navigate("/home");

=======
      setUser(usuarioEncontrado); // Guarda el usuario encontrado en el contexto (y en localStorage automáticamente por el efecto en el provider)
      setError(""); // Limpia cualquier error previo
>>>>>>> 47e413df065a58ae39a158c5c821d1dd912b94c7
    } catch (error) {
      console.error("Error al buscar el usuario:", error); // Muestra el error en consola
      setError("Error de conexión."); // Muestra mensaje de error al usuario
    }
  };

  return (
    <div className="login-container">
      <h1>Iniciar sesion</h1>
      <form className="login" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre" // Texto guía
          value={nombre} // Valor controlado por estado
          onChange={(e) => setNombre(e.target.value)} // Actualiza estado al escribir
        />
        <input
          type="password"
          placeholder="Contraseña" // Texto guía
          value={contraseña} // Valor controlado por estado
          onChange={(e) => setContraseña(e.target.value)} // Actualiza estado al escribir
        />
        <button type="submit">Iniciar sesión</button>

        <Link to="/register" className="register">
          Registrate aqui
        </Link>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;
