import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { collection, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../config/firebase";

function Success() {
  const navigation = useNavigate();
  const user = useSelector((state) => state.user.currentUser);
  function navigateHome() {
    navigation("/");
    addNotification(user);
  }
  async function addNotification(userId) {
    try {
      const usersCollection = collection(db, "users");
      const userRef = doc(usersCollection, userId);

      await updateDoc(userRef, {
        notifications: arrayUnion({
          message: `Your just made a payment`,
        }),
      });
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="Success">
      <div>
        Payment successful
        <div onClick={navigateHome}>Go back to Zahotels.com</div>
      </div>
    </div>
  );
}

export default Success;
