import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import "../style/crearPost.css"; 

const CrearPost = () => {
  const { user } = useContext(UserContext);

  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [imageUrls, setImageUrls] = useState([""]);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  // Traer etiquetas al cargar
  useEffect(() => {
    fetch("http://localhost:3001/tags")
      .then((res) => res.json())
      .then((data) => setTags(data))
      .catch((error) => console.error("Error al cargar tags", error));
  }, []);

  // Limpiar mensajes después de 3 segundos
  useEffect(() => {
    if (mensaje || error) {
      const timer = setTimeout(() => {
        setMensaje("");
        setError("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [mensaje, error]);

  const handleImageUrlChange = (index, value) => {
    const updatedUrls = [...imageUrls];
    updatedUrls[index] = value;
    setImageUrls(updatedUrls);
  };

  const addImageField = () => {
    setImageUrls([...imageUrls, ""]);
  };

  const removeImageField = (index) => {
    const updatedUrls = [...imageUrls];
    updatedUrls.splice(index, 1);
    setImageUrls(updatedUrls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMensaje("");
    setError("");

    if (!description.trim()) {
      setError("La descripción es obligatoria");
      return;
    }

    console.log("user:", user);
    console.log("POST data:",{
        description,
        userId: user?.id,
        tags: selectedTags,
    });




    try {
      // Crear el post
      const resPost = await fetch("http://localhost:3001/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description,
          userId: user.id,
          tags: selectedTags || [],
        }),
      });

      if (!resPost.ok) throw new Error("Error al crear el post");

      const postCreated = await resPost.json();

      // Subir imágenes si hay
      const urlsFiltradas = imageUrls.filter((url) => url.trim() !== "");

      for (let url of urlsFiltradas) {
        await fetch("http://localhost:3001/postimages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            url,
            postId: postCreated._id,
          }),
        });
      }

      setMensaje("¡Publicación creada exitosamente!");
      setDescription("");
      setSelectedTags([]);
      setImageUrls([""]);
      

    } catch (error) {
      console.error(error);
      setError("Hubo un error al crear el post.");
    }
  };

  if (!user) {
    return <p>Debes iniciar sesión para crear un post.</p>;
  }

  return (
    <div className="post-detail-container">
      <h2>Crear Nueva Publicación</h2>

      {mensaje && (
        <p className="banner-success">{mensaje}</p>
      )}

      {error && (
        <p className="banner-error">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="crear-post-form">
        {/* Descripción */}
        <div>
          <label>Descripción *</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {/* URLs de imágenes */}
        <div>
          <label>URLs de Imágenes</label>
          {imageUrls.map((url, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: "0.5rem",
                marginBottom: "0.5rem",
              }}
            >
              <input
                type="text"
                value={url}
                placeholder="https://..."
                onChange={(e) => handleImageUrlChange(i, e.target.value)}
              />
              <button
                type="button"
                onClick={() => removeImageField(i)}
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                X
              </button>
            </div>
          ))}
          <button type="button" onClick={addImageField}>
            + Agregar campo de imagen
          </button>
        </div>

        {/* Tags */}
        <div>
          <label>Etiquetas</label>
          <select
            multiple
            value={selectedTags}
            onChange={(e) =>
              setSelectedTags(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
          >
            {tags.map((tag) => (
              <option key={tag._id} value={tag._id}>
                {tag.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Publicar</button>
      </form>


      <Link to="/home" className="btn-volver-home">← Volver a Home</Link>
    </div>

    
  );
};

export default CrearPost;
