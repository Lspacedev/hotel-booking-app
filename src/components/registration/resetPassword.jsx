import { useState } from "react";
import { auth } from "../../config/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
function ResetPassword() {
  const [email, setEmail] = useState("");

  function forgotPassword() {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Check your email");
      })
      .catch((err) => {});
  }
  return (
    <div className="ResetPassword">
      <h4>Reset your password</h4>

      <input
        type="email"
        placeholder="Enter email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={forgotPassword}>Reset Password</button>
    </div>
  );
}

export default ResetPassword;
