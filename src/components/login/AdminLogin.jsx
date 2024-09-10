import { useEffect, useState } from "react";

function AdminLogin() {
  return (
    <div className="AdminLogin">
      <div className="login-img">
        {/* <img src="images/shop.jpg" alt="login" /> */}
      </div>
      <div className="login-form-container">
        <h2>ZaHotels.com | Admin</h2>
        <p>Log in to your admin account.</p>
        <form>
          <div className="name">
            <label htmlFor="name">
              Admin name:
              <input
                type="text"
                id="name"
                name="name"
                // onChange={(e) => handleChange(e)}
                //value={loginDetails.name}
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
                //onChange={(e) => handleChange(e)}
                //value={loginDetails.password}
              />
            </label>
          </div>

          <input
            type="submit"
            value="Log in"
            //onClick={(e) => handleSubmit(e)}
          ></input>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
