import React, { PureComponent } from 'react'
import userImage from "../../assets/user.jpg";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
var CryptoJS = require("crypto-js");

const AccountDropdown = (props) => {
  const backtoinventory = (e) => {
    localStorage.setItem("management", true);
  };

  console.log("account dropdown")

  return (
    <div className="account-menu">
      {localStorage.getItem("isLogin") !== "false" && (
        <div>
          <div className="account-menu__divider" />
          <Link to="/account/profile" className="account-menu__user">
            <div className="account-menu__user-avatar">
              <img
                className="img-responsive img-rounded"
                src={userImage}
                alt="User "
              />
            </div>
            <div className="account-menu__user-info">
              <div className="account-menu__user-name">
                {localStorage.getItem("firstname")}
                <strong> {localStorage.getItem("lastname")}</strong>
              </div>
              <div className="account-menu__user-email">
                {localStorage.getItem("role")}
              </div>
            </div>
          </Link>
          <div className="account-menu__divider" />
          <ul className="account-menu__links">
  
            {localStorage.getItem("roleid") <= 15 && (
              window.location.hostname === "localhost" ?
                <li onClick={() => window.location.href = "http://localhost:3002/cms.myemporia.my/" + localStorage.getItem("username_encrypt") + "_" + localStorage.getItem("password")}><a>Inventory</a></li>
                :
                <li onClick={() => window.location.href = "https://cms.myemporia.my/" + localStorage.getItem("username_encrypt") + "_" + localStorage.getItem("password")}><a>Inventory</a></li>
            )}
            <li>
              <Link to="/account/profile">My Profile11</Link>
            </li>
            {/* <li>
              <Link to="/account/companyprofile">Company Profile</Link>
            </li> */}
            <li>
              <Link to="/account/addresses">My Addresses</Link>
            </li>
            {/* <li>
              <Link to="/account/creditcard">My Credit Cards</Link>
            </li> */}

            <li>
              <Link to="/account/orders">Order History</Link>
            </li>
            {/* <li>
              <Link to="/account/addresses">Addresses</Link>
            </li> */}
            <li>
              <Link to="/account/password">Password</Link>
            </li>
          </ul>
          <div className="account-menu__divider" />
          <ul className="account-menu__links account-menu__form-button">
            <li>
              <Button onClick={props.logout()}>Logout</Button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default AccountDropdown;