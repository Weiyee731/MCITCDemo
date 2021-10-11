// react
import React, { Component } from "react";

// third-party
import classNames from "classnames";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { GridColumnsPanel } from "@material-ui/data-grid";

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
    const { open } = this.state;
    const { onOpen, onClose } = this.props;

    if (open !== prevState.open) {
      if (open && onOpen) {
        onOpen();
      }
      if (!open && onClose) {
        onClose();
      }
    }
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

  render() {
    const { open } = this.state;
    const { url, className, icon } = this.props;
    let { value, dropdown } = this.props;
    let button;

    if (value !== undefined) {
      value = <span className="indicator__value">{value}</span>;
    }

    const title = (
      <span className="indicator__area">
        {icon}
        {value}
        {/* {url === "/shop/wishlist" ?
          (value !== undefined ? (value.props.children) : value)
          : value} */}
      </span>
    );

    // if (value !== undefined ) {
    //   console.log("value.props.children", value.props.children)
    // }


    // if (value !== undefined) {
    //   console.log("this.state", value.props.children)
    // }

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
};

export default Indicator;
