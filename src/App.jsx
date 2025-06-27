import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import PostDetail from "./pages/PostDetail";
import CrearPost from "./pages/CrearPost";

function App() {
  const { user, setUser } = useContext(UserContext);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/post/:id" element={<PostDetail />} />
      <Route path="/crear-post" element={<CrearPost />} />
    </Routes>
  );
}

export default App;
