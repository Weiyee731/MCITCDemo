// react
import React from "react";

// third-party
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

// application
import Dropdown from "./Dropdown";
import DropdownCurrency from "./DropdownCurrency";
import DropdownLanguage from "./DropdownLanguage";

import SocialLinks from '../shared/SocialLinks';
import { Button } from "react-bootstrap";

function Topbar() {
  const links = [
    {
      title: <FormattedMessage id="topbar.aboutUs" defaultMessage="About Us" />,
      url: "/site/about-us",
    },
    {
      title: (
        <FormattedMessage id="topbar.contacts" defaultMessage="Contacts" />
      ),
      url: "/site/contact-us",
    },
    {
      title: (
        <FormattedMessage
          id="topbar.storeLocation"
          defaultMessage="Store Location"
        />
      ),
      url: "",
    },
    {
      title: (
        <FormattedMessage id="topbar.trackOrder" defaultMessage="Track Order" />
      ),
      url: "/shop/track-order",
    },
    {
      title: <FormattedMessage id="topbar.blog" defaultMessage="Blog" />,
      url: "/blog/category-classic",
    },
  ];

  const registerURL = window.location.hostname === "localhost" ? "http://localhost:3002/cms.myemporia.my/register/" + localStorage.getItem("username_encrypt") + "/" + localStorage.getItem("id") : "https://cms.myemporia.my/ecommerceCMSDev/register/" + localStorage.getItem("username_encrypt") + "/" + localStorage.getItem("id");

  const loginURL = window.location.hostname === "localhost" ? "http://localhost:3002/cms.myemporia.my/" + localStorage.getItem("username_encrypt") + "/" + localStorage.getItem("password") : "https://cms.myemporia.my/ecommerceCMSDev/" + localStorage.getItem("username_encrypt") + "/" + localStorage.getItem("password");
  return (
    <div className="site-header__topbar topbar">
      <div className="topbar__container container">
        <div className="topbar__row">
          {/* {linksList} */}
          <div className="topbar__spring" />
          {/* <div className="topbar__item">
                        <Dropdown
                            title={<FormattedMessage id="topbar.myAccount" defaultMessage="My Account" />}
                            items={accountLinks}
                        />
                    </div> */}
          <div className="topbar__item">
            {/* <DropdownCurrency /> */}
            <SocialLinks  shape="circle" />
          </div>
          <div className="topbar__item">
            {/* <DropdownLanguage /> */}
            <Button style={{ fontSize: "9pt", background: "inherit", border: "transparent", color: "white", height: "1vw", display: "flex", alignItems: "center", fontFamily: 'Helvetica' }}>
              Customer Care
            </Button>
          </div>
          <div className="topbar__item">
            {/* <DropdownLanguage /> */}
            {localStorage.getItem("isLogin") === "true" && localStorage.getItem("roleid") === "17" &&
              <Button
                style={{ fontSize: "9pt", background: "inherit", border: "transparent", height: "1vw", display: "flex", alignItems: "center", fontFamily: 'Helvetica' }}>
                <a style={{ color: "white" }} href={registerURL} target="_blank" rel="noreferrer">Sign up Seller Account</a>
              </Button>}
            {localStorage.getItem("isLogin") === "true" && parseInt(localStorage.getItem("roleid")) < 17 &&
              <Button
                style={{ fontSize: "9pt", background: "inherit", border: "transparent", height: "1vw", display: "flex", alignItems: "center", fontFamily: 'Helvetica' }}>
                <a style={{ color: "white" }} href={loginURL} target="_blank" rel="noreferrer">Seller account</a>
              </Button>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
