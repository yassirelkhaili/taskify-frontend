import Auth from "./pages/Auth"
import Home from "./pages/Home"
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from "./providers/ProtectedRoute";

const App = () => {
  return (
    <Routes>
        <Route path="/" element={<Auth />} />
        <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Home />} />
          </Route>
      </Routes>
  )
}

export default App