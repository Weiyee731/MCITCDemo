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
import AccountPageProfile from "./AccountPageProfile";
import AccountPageAddAddress from "./AccountPageAddAddress";
import AccountPageCompanyProfile from "./AccountPageCompanyProfile";
import AccountPageCreditCard from "./AccountPageCreditCard/AccountPageCreditCard";
import AccountPageAddCreditCard from "./AccountPageCreditCard/AccountPageAddCreditCard";
import Cookies from "universal-cookie";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import BusinessOutlinedIcon from "@material-ui/icons/BusinessOutlined";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import CreditCardOutlinedIcon from "@material-ui/icons/CreditCardOutlined";
import HistoryOutlinedIcon from "@material-ui/icons/HistoryOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import icons from "../../pages/dashboard/variables/icons";
import "./AccountLayout.css";

const cookies = new Cookies();
export default function AccountLayout(props) {
  const { match, location } = props;

  const breadcrumb = [
    { title: "Home", url: "" },
    { title: "My Account", url: "" },
  ];

  // const icons = [
  //   <AccountCircleOutlinedIcon />,
  //   <BusinessOutlinedIcon />,
  //   <LocationOnOutlinedIcon />,
  //   <CreditCardOutlinedIcon />,
  //   <HistoryOutlinedIcon />,
  //   <ExitToAppOutlinedIcon />,
  // ];
  const links = [
    // { title: "Dashboard", url: "dashboard" },
    { title: "My Profile", url: "profile", icons:  <AccountCircleOutlinedIcon className="titleicon" /> },
    { title: "Company Profile", url: "companyprofile", icons:  <BusinessOutlinedIcon className="titleicon"/> },
    { title: "My Address", url: "addresses", icons:  <LocationOnOutlinedIcon className="titleicon"/> },
    { title: "My Credit Cards", url: "creditcard", icons:  <CreditCardOutlinedIcon className="titleicon"/> },
    { title: "Order History", url: "orders", icons:  <HistoryOutlinedIcon className="titleicon"/> },
    { title: "Logout", url: "login", icons:  <ExitToAppOutlinedIcon className="titleicon"/> },
  ].map((link) => {
    const url = `${match.url}/${link.url}`;
    const isActive = matchPath(location.pathname, { path: url, exact: true });
    const classes = classNames("account-nav__item", {
      "account-nav__item--active": isActive,
    });
    // alert(localStorage.getItem("roleid"));
    if (localStorage.getItem("roleid") <= 15) {
      if (link.title === "Dashboard") {
        return (
          <li
            key={link.url}
            className={classes}
            onClick={localStorage.setItem("management", true)}
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
    } else if (localStorage.getItem("roleid") == 15) {
      if (link.title === "Dashboard") {
        return (
          <li
            key={link.url}
            className={classes}
            onClick={localStorage.setItem("management", true)}
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

      <div className="block">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-3 d-flex">
              <div
                className="account-nav flex-grow-1"
                style={{ backgroundColor: "#ffffff" }}
              >
                <h4 className="account-nav__title">Navigation</h4>
                <ul>
                  { links}
                </ul>
              </div>
            </div>
            <div className="col-12 col-lg-9 mt-4 mt-lg-0">
              <Switch>
                <Redirect
                  exact
                  from={match.path}
                  to={`${match.path}/dashboard`}
                />
                <Route
                  exact
                  path={`${match.path}/dashboard`}
                  component={AccountPageDashboard}
                />
                <Route
                  exact
                  path={`${match.path}/profile`}
                  component={AccountPageProfile}
                ></Route>
                <Route
                  exact
                  path={`${match.path}/companyprofile`}
                  component={AccountPageCompanyProfile}
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
                  path={`${match.path}/password`}
                  component={AccountPagePassword}
                />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
