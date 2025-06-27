import { useParams } from "react-router-dom";
import { useEffect, useState, useContext} from "react";
import { UserContext } from "../context/UserContext"; 
import { Link } from "react-router-dom";
import "../style/postDetail.css"; // Asegúrate de tener este archivo creado

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [imagenes, setImagenes] = useState([]);
  const { user } = useContext(UserContext); // Obtengo el usuario actual 
  const [nuevoComentario, setNuevoComentario] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const postRes = await fetch(`http://localhost:3001/posts/${id}`);
      const postData = await postRes.json();
      setPost(postData);

      const commentsRes = await fetch(`http://localhost:3001/comments/post/${id}`);
      const commentsData = await commentsRes.json();
      setComentarios(commentsData);

      const imagesRes = await fetch(`http://localhost:3001/postimages/post/${id}`);
      const imagesData = await imagesRes.json();
      setImagenes(imagesData);
    };

    fetchData();
  }, [id]);
const handelComentario = async (e) => {
  e.preventDefault();
  if (!nuevoComentario.trim()) return;

  const response = await fetch(`http://localhost:3001/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: nuevoComentario,
      postId: id,
      userId: user.id, // Asumiendo que el usuario tiene un ID
    }),
  });

  if(response.ok) {
    const comentarioAgregado  = await response.json();
    setComentarios([...comentarios, comentarioAgregado]);
    setNuevoComentario(""); // Limpiar el campo de comentario
  }else {
    console.error("Error al agregar el comentario");
  }
};


if (!post) return <p>Cargando publicación...</p>;

  return (
    <div className="post-detail-container">
        <h2>{post.description}</h2>
        {imagenes.length > 0 && (
          <div className="post-images">
            {imagenes.map((img) => (
              <img
                key={img.id}
                src={img.url}
                alt={`Imagen ${img.id}`}
                className="detalle-img"
              />
            ))}
          </div>
        )}

        <div className="comentarios-section">
          <h3>💬 Comentarios</h3>
          {comentarios.length === 0 ? (
            <p>No hay comentarios aún.</p>
          ) : (
            <ul>
              {comentarios.map((c, i) => (
                <li key={i}>{c.content}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Formulario para agregar un comentario nuevo: */}
          {user ? (
            <form onSubmit={handelComentario} className="comentario-form">
              <textarea
                value={nuevoComentario}
                onChange={(e) => setNuevoComentario(e.target.value)}
                placeholder="Escribe tu comentario..."
                required
              />  
              <button type="submit">Comentar</button>
            </form>
          ) : (
            <p style={ {marginTop:"1rem"}}>Inicia sesión para comentar.</p>
          )}
    <Link to="/home" className="btn-volver-home">← Volver a Home</Link>     
      </div>
  ); 
};

export default PostDetail;
