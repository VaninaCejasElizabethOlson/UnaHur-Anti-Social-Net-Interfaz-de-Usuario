import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import Login from "./components/Login";
import Home from "./components/Home";

function App() {
  const { user, setUser } = useContext(UserContext);

  return (
    <div className="App">
      {!user
        ? <Login />
        : <Home />}
    </div>
  );
}

export default App;