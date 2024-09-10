import { useState, useEffect } from "react";
import HomePage from "./components/main/HomePage";
import ResultsPage from "./components/main/ResultsPage";
import AccomodationCard from "./components/main/AccomodationCard";
import UserDashboard from "./components/user/UserDashboard";
import "./App.css";
import AdminDashboard from "./components/admin/AdminDashboard";
import UserLogin from "./components/login/UserLogin";
import AdminLogin from "./components/login/AdminLogin";
import UserRegistration from "./components/registration/UserRegistration";
import Checkout from "./components/checkout/Checkout";
import ProtectedRouteReg from "./components/protected-routes/ProtectedRouteReg";
import ProtectedRoutes from "./components/protected-routes/ProtectedRoutes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  collectionGroup,
  query,
  collection,
  getDocs,
} from "firebase/firestore";
import { auth } from "./config/firebase";

//import { ref, listAll } from "firebase/storage";
//import { storage } from "./config/firebase";
import { db } from "./config/firebase";
import { getStorage, getDownloadURL, ref, listAll } from "firebase/storage";
import { useDispatch } from "react-redux";
import { setAccomodations } from "./app/accomodationsSlice";

function App() {
  const [acc, setAcc] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchAccomodations();
  }, []);
  async function fetchAccomodations() {
    try {
      const querySnapshot = await getDocs(collectionGroup(db, "accomodations"));
      //  const adminDocRef = adminRef.doc('A2Kvj5vTHdfJde8Sl8KV8rw1e2v1');
      //   const accomodationsRef = adminDocRef.collection('accomodations');
      //   const querySnapshot = await accomodationsRef.get();

      //const accomodationsRef = query(collectionGroup(db, 'landmarks')

      // const querySnapshot = await getDocs(collection(db, "admin"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      //setAcc(data);
      console.log(data);
      dispatch(setAccomodations(data));

      //setTransactions(data);
    } catch (error) {
      console.log(error);
    }
  }

  // Create a reference under which you want to list
  // const storage = getStorage();
  // const imagesRef = ref(storage, "K0F2qKu4p6VdAaRXbCVL");
  // listAll(imagesRef)
  //   .then((res) => {
  //     res.prefixes.forEach((folderRef) => {
  //       // All the prefixes under listRef.
  //       // You may call listAll() recursively on them.
  //       console.log({ folderRef });
  //     });
  //     res.items.forEach((itemRef) => {
  //       // All the items under listRef.
  //       getDownloadURL(itemRef)
  //         .then((url) => {
  //           console.log(url);
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });
  //     });
  //   })
  //   .catch((error) => {
  //     // Uh-oh, an error occurred!
  //   });

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="results" element={<ResultsPage />}>
            <Route path=":result_id" element={<AccomodationCard />} />
          </Route>
          <Route element={<ProtectedRouteReg auth={auth} />}>
            <Route exact path="registration" element={<UserRegistration />} />
            <Route exact path="login" element={<UserLogin />} />
          </Route>

          <Route element={<ProtectedRoutes auth={auth} />}>
            <Route path="home" element={<UserDashboard />}>
              {/* <Route
                index
                element={
                  <
                  />
                }
              />
              <Route path="lists" element={<DisplayLists />}>
                <Route path=":list_name" element={<List />} />
              </Route>
              <Route path="profile" element={<Profile />} /> */}
            </Route>
          </Route>

          {/* <HomePage /> */}
          {/* <ResultsPage /> */}
          {/* <AccomodationCard /> */}
          {/* <UserDashboard /> */}
          {/* <AdminDashboard /> */}
          {/* <UserLogin /> */}
          {/* <AdminLogin /> */}
          {/* <UserRegistration /> */}
          {/* <Checkout /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
