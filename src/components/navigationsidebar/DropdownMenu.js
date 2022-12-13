import React /*, { useState } */ from "react";
// import { animated } from "react-spring";
// import { Spring } from "react-spring/renderprops";

function DropdownMenu(props) {
  let closedStyle = {
    height: 0,
  };

  let openStyle = {
    height: "auto",
  };

  const handleMenuDropDownClick = (e) => {
    props.handleClick();
  };

  let subMenus, subMenuContent, menuContent;
  let Subbadge = [
    localStorage.getItem("productEndorsementBadge"),
    localStorage.getItem("productBadge"),
    "",
  ];

  // if (props.title === "Products") {
  //   props.submenus.map((submenuItem, submenuindex) => {
  //     if (submenuItem.badge) {
  //       submenuItem.badge.text = Subbadge[submenuindex];
  //     }
  //   });
  // }

  let menu = props.menu;
  let submenus = JSON.parse(menu.submenus);
  if (submenus != null) {
    subMenus = submenus.map((submenu, index) => {
      return (
        <li key={index}>
          <a href={submenu.page}>
            {" "}
            {submenu.title}
            {submenu.badge ? (
              <span className={"badge badge-pill " + submenu.badge.class}>
                {" "}
                {submenu.badge.text}{" "}
              </span>
            ) : (
              ""
            )}
          </a>
        </li>
      );
    });
    // subMenuContent = (
    //   <Spring from={closedStyle} to={props.active ? openStyle : closedStyle}>
    //     {/* {(props) => (
    //       <animated.div className="sidebar-submenu" style={props}>
    //         <ul> {subMenus} </ul>
    //       </animated.div>
    //     )} */}
    //   </Spring>
    // );
  }
  const linkMenu = (
    <a
      onClick={(e) => {
        handleMenuDropDownClick(e);
      }}
    >
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
  );
  menuContent = (
    <>
      {" "}
      {linkMenu} {subMenuContent}{" "}
    </>
  );

  return (
    <li
      className={props.active ? "sidebar-dropdown active" : "sidebar-dropdown"}
    >
      {menuContent}
    </li>
  );
}

export default DropdownMenu;
