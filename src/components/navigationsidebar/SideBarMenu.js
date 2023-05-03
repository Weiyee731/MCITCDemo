import React, { useState, Component } from "react";
import SideBarConfig from "../navigationsidebar/MenuConfig";
import { browserHistory } from "react-router";
import DropdownMenu from "../navigationsidebar/DropdownMenu";
import SimpleMenu from "../navigationsidebar/SimpleMenu";
import Dropdown from "react-bootstrap/Dropdown";
import userImage from "../../assets/user.jpg";
import logo from "../../assets/logo.png";
import { Sidebar, Menu } from "react-pro-sidebar";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { GitAction } from "../../store/action/gitAction";
import { connect } from "react-redux";

let renderCustomHorizontalThumb = ({ style, ...props }) => {
  const thumbStyle = {
    backgroundColor: `rgba(255,255,255,0.3)`,
    width: "4px",
    right: "-2px",
  };
  return <div style={{ ...style, ...thumbStyle }} {...props} />;
};

function mapStateToProps(state) {
  return {
    allstocks: state.counterReducer["products"],
    allpages: state.counterReducer["pages"],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    callLogout: (credentials) => dispatch(GitAction.CallLogout(credentials)),
    CallUserPage: (propsData) => dispatch(GitAction.CallUserPage(propsData)),
  };
}

const SideBarMenu = ({
  image,
  collapsed,
  rtl,
  toggled,
  handleToggleSidebar,
  callLogout,
  pages,
  propsData,
}) => {
  // alert(pages.length);
  let initialMenuItems = [];
  pages.forEach((menu, index) => {
    let active = menu.active === "true" ? true : false;
    initialMenuItems.push({
      active: active,
    });
  });

  const cookies = new Cookies();
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const handleMenuDropDownClick = (e, index) => {
    let newArray = menuItems.map((item, idx) => {
      index === idx ? (item.active = !item.active) : (item.active = false);
      return item;
    });
    setMenuItems([...newArray]);
  };

  const renderSideBarMenuItem = () => {
    return pages.length === 0
      ? ""
      : pages.map((menu, index) => {
        let liElementList = "";
        if (menu.type === "header") {
          liElementList = (
            <li key={"dropdown" + index} className="header-menu">
              <span>{menu.title}</span>
            </li>
          );
        } else if (menu.type === "dropdown") {
          liElementList = (
            <DropdownMenu
              menu={menu}
              active={
                menuItems[index].active ? menuItems[index].active : false
              }
              key={"sidebar" + index}
              handleClick={(e) => handleMenuDropDownClick(e, index)}
            />
          );
        } else if (menu.type === "simple") {
          liElementList = <SimpleMenu key={menu} menu={menu} />;
        }
        return liElementList;
      });
  };

  const CustomDropDownToggle = React.forwardRef(
    ({ children, onClick }, ref) => (
      <a
        href=""
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
      >
        {children}
      </a>
    )
  );

  const logout = () => {
    propsData.callLogout({ UserID: localStorage.getItem("id") });
    this.props.history.push("/");
    localStorage.clear();
    cookies.set("isLogin", false);
  };

  return (
    <div style={{ height: "100%" }}>
      {/* {alert("" + theme)} */}
      <Sidebar
        collapsed={collapsed}
        toggled={toggled}
        breakPoint="md"
        onToggle={handleToggleSidebar}
      >
        <Menu>
          <nav id="sidebar" className="sidebar-wrapper">
            <div className="sidebar-content">
              {/* <Scrollbars renderThumbVertical={renderCustomHorizontalThumb}> */}
                <div
                  className="sidebar-item sidebar-brand"
                  style={{ height: "auto", textAlign: "center", backgroundColor: 'rgba(77, 77, 77, 1)' }}
                >
                  <a href="/">
                    <img src={logo} width="80%" alt="logo" />
                  </a>
                </div>
                <div className="sidebar-item sidebar-header d-flex flex-nowrap">
                  <div className="user-pic">
                    <img
                      className="img-responsive img-rounded"
                      src={userImage}
                      alt="User "
                    />
                  </div>
                  <div className="user-info">
                    <span className="user-name">
                      {localStorage.getItem("firstname")}
                      <strong> {localStorage.getItem("lastname")}</strong>
                    </span>
                    <span className="user-role">
                      {" "}
                      {localStorage.getItem("role")}
                    </span>
                    <span className="user-status">
                      <i className="fa fa-circle"></i>
                      <span>online</span>
                    </span>
                  </div>
                </div>
                <div className="sidebar-item sidebar-search">
                  <div>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control search-menu"
                        placeholder="Search..."
                      />
                      <div className="input-group-append">
                        <span className="input-group-text">
                          <i className="fa fa-search" aria-hidden="true"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" sidebar-item sidebar-menu">
                  <ul>{renderSideBarMenuItem()}</ul>
                </div>
              {/* </Scrollbars> */}
            </div>
            <div className="sidebar-footer">
              <Dropdown>
                <Dropdown.Toggle as={CustomDropDownToggle} id="dropdown-basic">
                  <i className="fa fa-bell"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu className="notifications">
                  <Dropdown.Header className="notifications-header">
                    <i className="fa fa-bell"></i>
                    &nbsp;Notifications
                  </Dropdown.Header>
                  <Dropdown.Divider />
                  <Dropdown.Item href="#/toremove">
                    <div className="notification-content">
                      <div className="icon">
                        <i className="fas fa-check text-success border border-success"></i>
                      </div>
                      <div>
                        <div className="notification-detail">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. In totam explicabo
                        </div>
                        <div className="notification-time">6 minutes ago</div>
                      </div>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item href="#/toremove">
                    <div className="notification-content">
                      <div className="icon">
                        <i className="fas fa-exclamation text-info border border-info"></i>
                      </div>
                      <div>
                        <div className="notification-detail">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. In totam explicabo
                        </div>
                        <div className="notification-time">Today</div>
                      </div>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item href="#/toremove">
                    <div className="notification-content">
                      <div className="icon">
                        <i className="fas fa-exclamation-triangle text-warning border border-warning"></i>
                      </div>
                      <div>
                        <div className="notification-detail">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. In totam explicabo
                        </div>
                        <div className="notification-time">Yesterday</div>
                      </div>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item className="text-center" href="#/toremove">
                    View all notifications
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown>
                <Dropdown.Toggle as={CustomDropDownToggle} id="dropdown-basic">
                  <i className="fa fa-envelope"></i>
                  <span className="badge badge-pill badge-success notification">
                    7
                  </span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="messages">
                  <Dropdown.Header>
                    <i className="fa fa-envelope"> </i>
                    &nbsp;Messages
                  </Dropdown.Header>
                  <Dropdown.Divider />
                  <Dropdown.Item href="#/toremove">
                    <div className="message-content">
                      <div className="pic">
                        <img src={userImage} alt="" />
                      </div>
                      <div>
                        <div className="message-title">
                          <strong> Jhon doe</strong>
                        </div>
                        <div className="message-detail">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. In totam explicabo
                        </div>
                      </div>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item href="#/toremove">
                    <div className="message-content">
                      <div className="pic">
                        <img src={userImage} alt="" />
                      </div>
                      <div>
                        <div className="message-title">
                          <strong> Jhon doe</strong>
                        </div>
                        <div className="message-detail">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. In totam explicabo
                        </div>
                      </div>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item href="#/toremove">
                    <div className="message-content">
                      <div className="pic">
                        <img src={userImage} alt="" />
                      </div>
                      <div>
                        <div className="message-title">
                          <strong> Jhon doe</strong>
                        </div>
                        <div className="message-detail">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. In totam explicabo
                        </div>
                      </div>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item className="text-center" href="#/toremove">
                    View all messages
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown>
                <Dropdown.Toggle as={CustomDropDownToggle} id="dropdown-basic">
                  <i className="fa fa-cog"></i>
                  <span className="badge-sonar"></span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="/viewProfile">
                    <Link className="nav-link" to={"/viewProfile"}>
                      My profile
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item href="#/toremove">Help</Dropdown.Item>
                  <Dropdown.Item href="#/toremove">Setting</Dropdown.Item>
                  {/* <Toggle theme={theme} toggleTheme={themeToggler} /> */}
                  <Dropdown.Item>Version 1.0.1</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              
              <div>
                <Button onClick={logout}>
                  <a>
                    <i className="fa fa-power-off"></i>
                  </a>
                </Button>
              </div>
              <div className="pinned-footer">
                <a href="#toremove">
                  <i className="fas fa-ellipsis-h"></i>
                </a>
              </div>
            </div>
          </nav>
        </Menu>
        {/* <SidebarFooter style={{ textAlign: "center" }}></SidebarFooter> */}
      </Sidebar>
    </div>
  );
};

class SideBarMainMenu extends Component {
  constructor(props) {
    super(props);
    this.props.CallUserPage(localStorage.getItem("roleid"));
  }

  render() {
    return (
      <>
        {/* {alert(JSON.stringify(this.props.allpages))} */}
        {this.props.allpages.length > 0 ? (
          <SideBarMenu
            propsData={this.props}
            pages={this.props.allpages}
          ></SideBarMenu>
        ) : (
          ""
        )}
      </>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SideBarMainMenu);
