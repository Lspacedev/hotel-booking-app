import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";

function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigate();

  function login() {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Log in successfully");
        navigation("/home");
      })
      .catch((err) => {});
  }

  return (
    <div className="UserLogin">
      <div className="login-img">
        <img src="images/login-register.jpg" alt="login" />
      </div>
      <div className="login-form-container">
        <h2>ZaHotels.com</h2>
        <p>Log in to your account.</p>
        <div className="form">
          <div className="email">
            <label htmlFor="email">
              Email:
              <input
                type="email"
                id="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>

          <div className="password">
            <label htmlFor="password">
              Password:
              <input
                type="password"
                id="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>

          <button className="submit-btn" onClick={login}>
            Login
          </button>
        </div>
        <div className="login-to-register">
          Don't have an account?
          {/* <p onClick={handleNavigateRegister}>Register here</p> */}
        </div>
        <Link to="/forgotPassword">Forgot password</Link>
      </div>
    </div>
  );
}

export default UserLogin;
