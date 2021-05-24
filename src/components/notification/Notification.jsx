import React, { Component } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { GitAction } from "../../store/action/gitAction";
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
      notification: state.counterReducer["notification"],
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      CallNotification: prodData => dispatch(GitAction.CallNotification(prodData))
    };
  }


  class Notification extends Component {
    constructor(props) {
        super(props);
        this.props.CallNotification(localStorage.getItem("id"));
      }


      
      render(){

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
        return(<Dropdown>
            <Dropdown.Toggle as={CustomDropDownToggle} id="dropdown-basic">
              <i className="fa fa-bell"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu className="notifications">
              <Dropdown.Header className="notifications-header">
                <i className="fa fa-bell"></i>
                &nbsp;Notifications
              </Dropdown.Header>
              <Dropdown.Divider />
              {this.props.notification.map((notification)=>{
                  return(<Dropdown.Item href="#/toremove">
                  <div className="notification-content">
                    <div className="icon">
                      <i className="fas fa-check text-success border border-success"></i>
                    </div>
                    <div>
                      <div className="notification-detail">
                        {notification.NotificationMsg}
                      </div>
                      <div className="notification-time">6 minutes ago</div>
                    </div>
                  </div>
                </Dropdown.Item>)
              })}
              <Dropdown.Divider />
              <Dropdown.Item className="text-center" href="#/toremove">
                View all notifications
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>)
      }
    }
    export default connect(
        mapStateToProps,
        mapDispatchToProps
      )(Notification);