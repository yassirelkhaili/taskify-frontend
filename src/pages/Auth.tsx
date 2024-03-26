import { Link } from "react-router-dom";

const Auth = () => {
  return (
    <nav className="h-screen flex justify-center items-center">
      <div className="flex gap-2">
      <Link to="/login">Login</Link>|<Link to="/register">Register</Link>
      </div>
    </nav>
  );
};

export default Auth;
