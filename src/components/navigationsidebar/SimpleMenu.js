import React from "react";
import Cookies from "universal-cookie";
// import Button from "@mui/material/Button";

const cookies = new Cookies();

const backtoecommerce = (e) => {
  if(e === "Back to Ecommerce"){
    localStorage.setItem("management", false)
  }
};

function SimpleMenu(props) {
  let menu = props.menu;
    return(
      <li >
        <a href={menu.page} key={menu} onClick={() => backtoecommerce(menu.title)}>
          <i className={menu.icon}></i>
          <span className="menu-text">{menu.title}</span>
          
          {menu.badge ? (
            <span className={"badge badge-pill " + menu.badge.class}>
              {" "}
              {menu.badge.text}{" "}
            </span>
          ) : (
            ""
          )}
        </a>
      </li>
    )
}

export default SimpleMenu;
