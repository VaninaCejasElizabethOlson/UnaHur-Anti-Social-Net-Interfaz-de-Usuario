import "../style/styles.css";
import "../style/register.css";
import { Link, useNavigate } from "react-router";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";

const Register = () => {
  const { setUser } = useContext(UserContext); // Obtiene la función setUser del contexto para guardar el usuario logueado globalmente
  const [nombre, setNombre] = useState(""); // Estado para guardar el nickname ingresado por el usuario
  const [contraseña, setContraseña] = useState(""); // Estado para la contraseña ingresada
  const [email, setEmail] = useState(""); // Estado para la contraseña ingresada
  const [error, setError] = useState(""); // Estado para mostrar mensajes de error
  const [usuarioCreado, setUsuarioCreado] = useState(false); // Estado para el usuario creado
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario (recargar la página)

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
      if (usuarioEncontrado) {
        setError("Nombre de usuario en uso");
        return;
      }

      const resPost = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nickName: nombre,
          email: email,
        }),
      });

      if (resPost.status == 201) {
        setUsuarioCreado(true);
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }

      setError(""); // Limpia cualquier error previo
    } catch (error) {
      console.error("Error al buscar el usuario:", error); // Muestra el error en consola
      setError("Error de conexión."); // Muestra mensaje de error al usuario
    }
  };

  return (
    <div className="login-container">
      <h1>Registrate</h1>
      <form className="login" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre" // Texto guía
          value={nombre} // Valor controlado por estado
          onChange={(e) => setNombre(e.target.value)} // Actualiza estado al escribir
        />
        <input
          type="email"
          placeholder="Email" // Texto guía
          value={email} // Valor controlado por estado
          onChange={(e) => setEmail(e.target.value)} // Actualiza estado al escribir
        />
        <input
          type="password"
          placeholder="Contraseña" // Texto guía
          value={contraseña} // Valor controlado por estado
          onChange={(e) => setContraseña(e.target.value)} // Actualiza estado al escribir
        />
        <button type="submit">Registrarse</button>
        <Link to="/login" className="register">
          Ya tengo cuenta
        </Link>
      </form>
      {usuarioCreado && (
        <div className="alert success">
          <span className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20"
              viewBox="0 0 24 24"
              fill="#6ee7b7"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M12 0C5.371 0 0 5.372 0 12s5.371 12 12 12 12-5.372 12-12S18.629 0 12 0zm-1.2 17.1l-4.9-4.9 1.4-1.4 3.5 3.5 6.5-6.5 1.4 1.4-7.9 7.9z" />
            </svg>
          </span>
          <span className="message">Usuario creado con éxito</span>
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Register;
