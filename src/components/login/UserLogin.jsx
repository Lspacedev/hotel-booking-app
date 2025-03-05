import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { FaHotel } from "react-icons/fa";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setUsers } from "../../app/userSlice";
import { collectionGroup, collection, getDocs } from "firebase/firestore";

function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();
  const dispatch = useDispatch();

  function login() {
    if (email === "" || password === "") {
      alert("Fields are required");
      return;
    }
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            console.log({ user });
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            localStorage.setItem("uid", JSON.stringify(uid)); // ...

            dispatch(setUser(uid));
            await fetchUsers();
            setLoading(false);

            navigation("/home");
            // ...
          } else {
            // User is signed out
            // ...
            dispatch(setUser(""));
          }
        });
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
        onAuthStateChanged(auth, (user) => {
          if (user) {
            console.log({ user });
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            localStorage.setItem("uid", JSON.stringify(uid)); // ...
            dispatch(setUser(uid));
            setLoading(false);

            navigation("/home");

            // ...
          } else {
            // User is signed out
            // ...
            dispatch(setUser(""));
          }
        });
      })
      .catch((err) => {
        setLoading(false);
        alert(err.message);
      });
  }
  function handleNavigateRegister() {
    navigation("/registration");
  }
  async function fetchUsers() {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));

      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      dispatch(setUsers(data));
    } catch (error) {
      console.log(error);
    }
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
                Email
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
                Password
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
