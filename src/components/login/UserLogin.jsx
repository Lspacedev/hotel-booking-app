import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { FaHotel } from "react-icons/fa";

function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();

  function login() {
    if (email === "" || password === "") {
      alert("Fields are required");
      return;
    }
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setLoading(false);
        alert("Log in successfully");
        navigation("/home");
      })
      .catch((err) => {
        setLoading(false);
        alert(err.message);
      });
  }
  function guestLogin() {
    setLoading(true);

    signInWithEmailAndPassword(
      auth,
      process.env.GUEST_EMAIL,
      process.env.GUEST_PASSWORD
    )
      .then(() => {
        setLoading(false);
        alert("Log in successfully");
        navigation("/home");
      })
      .catch((err) => {
        setLoading(false);
        alert(err.message);
      });
  }
  function handleNavigateRegister() {
    navigation("/registration");
  }

  return (
    <div className="UserLogin">
      <div className="login-register-container">
        <div className="login-img">
          <img src="images/capetownbeach.jpg" alt="login" />
        </div>
        <div className="login-form-container">
          <div className="logo-container" onClick={() => navigation("/")}>
            <img src="/images/logo-icon2.png" className="logo-icon-img" />
            <img src="/images/logo-text2.png" className="logo-text-img" />
          </div>
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

            <button
              className="submit-btn"
              onClick={loading ? console.log() : login}
            >
              {loading ? "Loading..." : "Submit"}
            </button>
            <button
              className="guest-submit-btn"
              onClick={loading ? console.log() : guestLogin}
            >
              {loading ? "Loading..." : "Guest"}
            </button>
          </div>
          <div className="login-to-register">
            Don't have an account?
            <p onClick={handleNavigateRegister}>Register here</p>
          </div>
          <Link to="/forgotPassword">Forgot password</Link>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
