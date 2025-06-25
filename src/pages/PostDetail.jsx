import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../style/postDetail.css"; // Asegúrate de tener este archivo creado

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [imagenes, setImagenes] = useState([]);

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

      </div>
      ); 
};

export default PostDetail;
