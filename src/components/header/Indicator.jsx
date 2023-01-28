// react
import React, { Component } from "react";

// third-party
import classNames from "classnames";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import LoginComponent from "../../pages/login/login.component";

class Indicator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleOutsideClick);
  }

  componentDidUpdate(prevProps, prevState) {
    const { open, openPopOutLogin } = this.state;
    const { onOpen, onClose, onOpenPopOut, onClosePopOut } = this.props;

    if (open !== prevState.open) {
      if (open && onOpen) {
        onOpen();
      }
      if (!open && onClose) {
        onClose();
      }
    }
    // popOut for login
    // if (openPopOutLogin !== prevState.open) {
    //   if (openPopOutLogin && onOpenPopOut) {
    //     onOpenPopOut();
    //   }
    //   if (!openPopOutLogin && onClosePopOut) {
    //     onClosePopOut();
    //   }
    // }
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleOutsideClick);
  }

  setWrapperRef = (node) => {
    this.wrapperRef = node;
  };

  handleOutsideClick = (event) => {
    const { open } = this.state;

    if (this.wrapperRef && !this.wrapperRef.contains(event.target) && open) {
      this.close();
    }
  };

  handleButtonClick = (event) => {
    const { onClick, dropdown } = this.props;

    if (dropdown) {
      event.preventDefault();
    }

    // if (popOut){
    //   console.log("popOut")
    // }

    this.toggle();

    if (onClick) {
      onClick(event);
    }
  };

 toggle() {
    this.setState((state) => ({
      open: !state.open,
    }));
  }

  open() {
    this.setState(() => ({
      open: true,
    }));
  }

  close() {
    this.setState(() => ({
      open: false,
    }));
  }

  getpopOutState = (loginPopOut) => {
    this.props.getIndPopOutState(loginPopOut)
    // this.setState({loginPopOut: loginPopOut})
  }

  render() {
    const { open } = this.state;
    const { url, className, icon, loginPopOut } = this.props;
    let { value, dropdown } = this.props;
    let button;

    if (value !== undefined) {
      value = <span className="indicator__value">{value}</span>;
    }

    const title = (
      <span className="indicator__area">
        {icon}
        {value}
      </span>
    );

    if (loginPopOut) {
      <button
        type="button"
        className="indicator__button"
        onClick={this.handleButtonClick}
      >
        {title}
      </button>
    }

    if (url) {
      button = (
        <Link
          to={url}
          className="indicator__button"
          onClick={this.handleButtonClick}
        >
          {title}
        </Link>
      );
    } else {
      button = (
        <button
          type="button"
          className="indicator__button"
          onClick={this.handleButtonClick}
        >
          {title}
        </button>
      );
    }

    if (dropdown) {
      dropdown = <div className="indicator__dropdown">{dropdown}</div>;
    }
    const classes = classNames(
      `indicator indicator--trigger--click ${className}`,
      {
        "indicator--opened": open,
      }
    );

    return (
      <div className={classes} ref={this.setWrapperRef}>
        {button}
        {dropdown}
        {loginPopOut !== undefined && loginPopOut !== false &&
          <LoginComponent loginPopOut={loginPopOut} getpopOutState={this.getpopOutState} />
        }
      </div>
    );
  }
}




Indicator.propTypes = {
  /** indicator value */
  valuename: PropTypes.string,
  value: PropTypes.number,
  /** the component that will be shown in the dropdown */
  dropdown: PropTypes.node,
  /** indicator icon */
  icon: PropTypes.node,
  /** indicator url */
  url: PropTypes.string,
  /** callback function that is called when the dropdown is opened */
  onOpen: PropTypes.func,
  /** callback function that is called when the dropdown is closed */
  onClose: PropTypes.func,
  /** callback function that is called when the dropdown is opened */
  onOpenPopOut: PropTypes.func,
  /** callback function that is called when the dropdown is closed */
  onClosePopOut: PropTypes.func,
};

export default Indicator;
