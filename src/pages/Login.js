import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { validateLogin } from "../utils/validation";
import { FiEye, FiEyeOff } from "react-icons/fi";
function Login() {
  const navigate = useNavigate();
  const { loadUser } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const hUsername = (event) => {
    setUsername(event.target.value);
  };
  const hPassword = (event) => {
    setPassword(event.target.value);
  };
  const loginUser = async (event) => {
    event.preventDefault();
    const error = validateLogin({ username, password });
    if (error) {
      toast.error(error);
      return;
    }
    try {
      const data = {
        username,
        password,
      };
      const res = await login(data);
      await loadUser();
      setUsername("");
      setPassword("");
      localStorage.setItem("showWelcome", "true");
      if (res.data.user.role === "student") {
        navigate("/student-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response) toast.error(error.response.data.message);
      else toast.error("Server Not Running");
    }
  };
  return (
    <>
      <div className="page">
        <h1>Login</h1>
        <form onSubmit={loginUser}>
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={hUsername}
          />
          <br />
          <br />
          <div className="password-container">
    		<input
        		type={showPassword ? "text" : "password"}
        		placeholder="Enter Password"
       		 	value={password}
        		onChange={hPassword}
    		/>
    		<button
        		type="button"
        		className="password-toggle"
        		onClick={() => setShowPassword(!showPassword)}
        		aria-label={showPassword ? "Hide password" : "Show password"}
    		>
        		{showPassword ? <FiEyeOff /> : <FiEye />}
    		</button>
	  </div>
          <br />
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
}
export default Login;