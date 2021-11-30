// react
import React from "react";

// third-party
import classNames from "classnames";
import { Link, matchPath, Redirect, Switch, Route } from "react-router-dom";

// application
import PageHeader from "../shared/PageHeader";

// pages
import AccountPageAddresses from "./AccountPageAddresses";
import AccountPageDashboard from "./AccountPageDashboard";
import AccountPageEditAddress from "./AccountPageEditAddress";
import AccountPageOrderDetails from "./AccountPageOrderDetails";
import AccountPageOrders from "./AccountPageOrders";
import AccountPagePassword from "./AccountPagePassword";
import AccountPageChangeContact from "./AccountPageChangeContact";
import AccountPageChangeEmail from "./AccountPageChangeEmail";
import AccountPageProfile from "./AccountPageProfile";
import AccountPageAddAddress from "./AccountPageAddAddress";
import AccountPageCompanyProfile from "./AccountPageCompanyProfile";
import merchantpage from "../merchant/merchantpage";
import AccountPageCreditCard from "./AccountPageCreditCard/AccountPageCreditCard";
import AccountPageAddCreditCard from "./AccountPageCreditCard/AccountPageAddCreditCard";
import Cookies from "universal-cookie";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import BusinessOutlinedIcon from "@material-ui/icons/BusinessOutlined";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import CreditCardOutlinedIcon from "@material-ui/icons/CreditCardOutlined";
import HistoryOutlinedIcon from "@material-ui/icons/HistoryOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import PasswordIcon from '@mui/icons-material/Password';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import icons from "../../pages/dashboard/variables/icons";
import "./AccountLayout.css";
import { url } from "../../services/utils";
// import EditShopProfile from "./editShopProfile/editShopProfile.component";

const cookies = new Cookies();
export default function AccountLayout(props) {
  const { match, location } = props;

  const breadcrumb = [
    { title: "Home", url: url.home },
    { title: "My Account", url: "" },
  ];

  const links = [
    // { title: "Dashboard", url: "dashboard" },
    { title: "My Profile", url: "profile", icons: <AccountCircleOutlinedIcon className="titleicon" /> },
    { title: "My Address", url: "addresses", icons: <LocationOnOutlinedIcon className="titleicon" /> },
    { title: "My Credit Cards", url: "creditcard", icons: <CreditCardOutlinedIcon className="titleicon" /> },
    { title: "Order History", url: "orders", icons: <HistoryOutlinedIcon className="titleicon" /> },
    { title: "Change Password", url: "password", icons: <PasswordIcon className="titleicon" /> },
    // { title: "My Shop", url: "editShopProfile", icons: <StorefrontOutlinedIcon className="titleicon" /> },
    // { title: "Logout", url: "login", icons: <ExitToAppOutlinedIcon className="titleicon" /> },
  ].map((link) => {
    const url = `${match.url}/${link.url}`;
    const isActive = matchPath(location.pathname, { path: url, exact: true });
    const classes = classNames("account-nav__item", {
      "account-nav__item--active": isActive,
    });
    // if (localStorage.getItem("roleid") !== "16") {
    //   if (link.title === "My Shop")
    //    { return "" }
    //   else {
    //     return (
    //       <li
    //         key={link.url}
    //         className={classes}
    //       >
    //         <Link to={link.url}>{link.title}</Link>
    //       </li>
    //     )
    //   }
    // } else {
    //   return (
    //     <li
    //       key={link.url}
    //       className={classes}
    //     >
    //       <Link to={link.url}>{link.title}</Link>
    //     </li>
    //   )
    // }
    if (localStorage.getItem("roleid") <= 15) {
      if (link.title === "Dashboard") {
        return (
          <li
            key={link.url}
            className={classes}
          // onClick={localStorage.setItem("management", true)}
          >
            <Link to={"/dashboard"}>{link.title}</Link>
          </li>
        );
      } else {
        return (
          <li key={link.url} className={classes}>
            <Link to={url}>{link.icons}{link.title}</Link>
          </li>
        );
      }
    } else {
      return (
        <li key={link.url} className={classes}>
          <Link to={url}>{link.icons}{link.title}</Link>
        </li>
      );
    }
  });

  return (
    <React.Fragment>
      <PageHeader header="My Account" breadcrumb={breadcrumb} />
      <div className="block container">
        <div className="space-limiter">
          <div className="row">
            <div className="col-12 col-lg-3 d-flex">
              <div
                className="account-nav flex-grow-1"
                style={{ backgroundColor: "#ffffff" }}
              >
                <h4 className="account-nav__title">Navigation</h4>
                <ul>
                  {links}
                </ul>
              </div>
            </div>
            <div className="col-12 col-lg-9 mt-lg-0">
              <Switch>
                <Redirect
                  exact
                  from={match.path}
                  to={`${match.path}/profile`}
                />
                <Route
                  exact
                  path={`${match.path}/profile`}
                  component={AccountPageProfile}
                />
                <Route
                  exact
                  path={`${match.path}/companyprofile`}
                  component={merchantpage}
                />
                <Route
                  exact
                  path={`${match.path}/orders`}
                  component={AccountPageOrders}
                />
                <Route
                  exact
                  path={`${match.path}/orders/:orderId`}
                  component={AccountPageOrderDetails}
                />
                <Route
                  exact
                  path={`${match.path}/addresses`}
                  component={AccountPageAddresses}
                />
                <Route
                  exact
                  path={`${match.path}/addresses/:addressId`}
                  component={AccountPageEditAddress}
                />
                <Route
                  exact
                  path={`${match.path}/address/:addressId`}
                  component={AccountPageAddAddress}
                />
                <Route
                  exact
                  path={`${match.path}/creditcard`}
                  component={AccountPageCreditCard}
                />
                {/* <Route
                  exact
                  path={`${match.path}/creditcard/:cardId`}
                  component={AccountPageAddCreditCard}
                /> */}
                <Route
                  exact
                  path={`${match.path}/changeContact`}
                  component={AccountPageChangeContact}
                />
                <Route
                  exact
                  path={`${match.path}/changeEmail`}
                  component={AccountPageChangeEmail}
                />
                <Route
                  exact
                  path={`${match.path}/password`}
                  component={AccountPagePassword}
                />
                {/* <Route
                  path={`${match.path}/editShopProfile`}
                  component={EditShopProfile} /> */}
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
