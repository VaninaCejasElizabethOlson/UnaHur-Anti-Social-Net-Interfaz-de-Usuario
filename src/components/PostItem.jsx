import { useNavigate } from "react-router-dom";
import "../style/postitem.css"; 

const PostItem = ({ post }) => {
  const navigate = useNavigate();

  return (
    <div className="post-item">
      <p><strong>{post.User.nickName}</strong> dijo:</p>
      <p>{post.description}</p>

      {post.imagenes.length > 0 && (
  <img
    src={post.imagenes[0].url}
    alt="imagen del post"
    className="post-img"
  />
)}


      <div className="tags">
        {post.Tags.map((tag) => (
          <span key={tag.id} className="tag">#{tag.name}</span>
        ))}
      </div>

      <p>💬 {post.comentarios} comentarios</p>

      <button onClick={() => navigate(`/post/${post.id}`)}  class="btn btn-success btn-ver-mas"> <i class="bi bi-chevron-down"></i>   Ver más</button>
    </div>
  );
};

export default PostItem;
