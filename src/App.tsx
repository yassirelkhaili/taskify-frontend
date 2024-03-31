import Auth from "./pages/Auth";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./providers/ProtectedRoute";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AuthChecker from "./providers/AuthChecker";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route element={<AuthChecker />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default App;
