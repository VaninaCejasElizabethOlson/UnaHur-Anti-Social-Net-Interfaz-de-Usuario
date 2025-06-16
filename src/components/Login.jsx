import "../style/Login.css";
import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

const Login = () => {
    const { setUser } = useContext(UserContext); // Obtiene la función setUser del contexto para guardar el usuario logueado globalmente
    const [nombre, setNombre] = useState(""); // Estado para guardar el nickname ingresado por el usuario
    const [contraseña, setContraseña] = useState(""); // Estado para la contraseña ingresada
    const [error, setError] = useState(""); // Estado para mostrar mensajes de error

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
        const res = await fetch("http://localhost:3000/users"); // Realiza una petición GET a la API para obtener los usuarios
        const data = await res.json(); // Convierte la respuesta en JSON
        
        // Busca si existe el nickname ingresado dentro de los usuarios recibidos
        const usuarioEncontrado = data.find(u => u.nickName === nombre);

        // Si no se encuentra el usuario, muestra un error
        if (!usuarioEncontrado) {
            setError("Usuario no encontrado.");
        return;
        }

    
        setUser(usuarioEncontrado); // Guarda el usuario encontrado en el contexto (y en localStorage automáticamente por el efecto en el provider)
        setError(""); // Limpia cualquier error previo
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
                onChange={e => setNombre(e.target.value)} // Actualiza estado al escribir
            />
            <input
                type="password"
                placeholder="Contraseña" // Texto guía
                value={contraseña} // Valor controlado por estado
                onChange={e => setContraseña(e.target.value)} // Actualiza estado al escribir 
            />
            <button type="submit">Iniciar sesión</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
);
};

export default Login;