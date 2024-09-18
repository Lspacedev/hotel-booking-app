import "./App.css";
import { useEffect } from "react";
import HomePage from "./components/main/HomePage";
import ResultsPage from "./components/main/ResultsPage";
import AccomodationCard from "./components/main/AccomodationCard";
import UserDashboard from "./components/user/UserDashboard";

import UserLogin from "./components/login/UserLogin";
import UserProfile from "./components/profiles/UserProfile";
import UserRegistration from "./components/registration/UserRegistration";
import ResetPassword from "./components/registration/resetPassword";
import Checkout from "./components/checkout/Checkout";
import ProtectedRouteReg from "./components/protected-routes/ProtectedRouteReg";
import ProtectedRoutes from "./components/protected-routes/ProtectedRoutes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { collectionGroup, collection, getDocs } from "firebase/firestore";
import { auth } from "./config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { db } from "./config/firebase";
import { useDispatch, useSelector } from "react-redux";
import { setAccomodations } from "./app/accomodationsSlice";
import { setUser, setUsers } from "./app/userSlice";
import Bookings from "./components/user/Bookings";
import Reviews from "./components/user/Reviews";
import Favourites from "./components/user/Favourites";
import Success from "./components/checkout/Sucess";
import Cancel from "./components/checkout/Cancel";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        dispatch(setUser(uid));
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }, []);

  useEffect(() => {
    fetchAccomodations();
    fetchUsers();
  }, []);
  async function fetchAccomodations() {
    try {
      const querySnapshot = await getDocs(collectionGroup(db, "accomodations"));

      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      dispatch(setAccomodations(data));
    } catch (error) {
      console.log(error);
    }
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

  const user = useSelector((state) => state.user.currentUser);
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/forgotPassword" element={<ResetPassword />} />
          <Route path="results" element={<ResultsPage />}>
            <Route path=":result_id" element={<AccomodationCard />} />
          </Route>
          <Route element={<ProtectedRouteReg auth={user} />}>
            <Route exact path="registration" element={<UserRegistration />} />
            <Route exact path="login" element={<UserLogin />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="success" element={<Success />} />
            <Route path="cancel" element={<Cancel />} />
          </Route>

          <Route element={<ProtectedRoutes auth={user} />}>
            <Route path="home" element={<UserDashboard />}>
              <Route index element={<Bookings />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="favourites" element={<Favourites />} />

              <Route path="profile" element={<UserProfile userId={user} />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
