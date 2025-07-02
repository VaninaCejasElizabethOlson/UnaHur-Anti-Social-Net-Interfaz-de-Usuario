import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import PostItem from "../components/PostItem"; // asegurate de tener este archivo creado
import "../style/home.css";
import { Link } from "react-router-dom";

const Home = () => {
  const { user, setUser } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  const handleCrearPost = () => {
  if (!user) {
    alert("Debes iniciar sesión para crear una publicación");
    navigate("/login");
    return;
  }
  navigate("/crear-post");
};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resPosts = await fetch("http://localhost:3001/posts");
        const postsData = await resPosts.json();

        const postsWithDetails = await Promise.all(
          postsData.map(async (post) => {
            const [resComments, resImages] = await Promise.all([
              fetch(`http://localhost:3001/comments/post/${post.id}`),
              fetch(`http://localhost:3001/postimages/post/${post.id}`)
            ]);

            const comentarios = await resComments.json();
            const imagenes = await resImages.json();

            return { ...post, comentarios: comentarios.length, imagenes };
          })
        );

        setPosts(postsWithDetails);
      } catch (error) {
        console.error("Error al cargar publicaciones:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home-container">
      <h1>Bienvenido</h1>
      <h2>{user?.nickName}</h2>

      <button onClick={handleCrearPost} class="btn btn-publicar">
        <i class="bi bi-plus-circle"></i> Crear Nueva Publicación
      </button>

      <div className="feed">
        <h3><i class="bi bi-newspaper"></i> Feed de publicaciones recientes</h3>
        {posts.length === 0 ? (
          <p>Cargando publicaciones...</p>
        ) : (
          posts.map((post) => <PostItem key={post.id} post={post} />)
        )}
      </div>
    </div>
  );
};

export default Home;
