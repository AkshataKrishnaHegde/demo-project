import { signInWithGoogle } from "../components/firebase";
import { useNavigate } from "react-router-dom"; 
import "../styles/Login.css";
import img from "./loginPageImg.avif";

const Login = () => {
  const navigate = useNavigate(); 

  const handleLogin = async () => {
    const user = await signInWithGoogle();
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/home"); 
  };

  return (
    <div className="login-container">
      <div className="login-image">
        <img src={img} alt="LoginImage" />
      </div>
      <div className="login-content">
        <h2 className="login-title">Sign In</h2>
        <button className="google-login-btn" onClick={handleLogin}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
