// react
import React, { Component } from "react";

class BlockMoreButton extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    /**
     * Styles
     */
    const categoryStyle = {
      backgroundColor: "#fff",
      // display: "flex"
    }

    const categoryGrid = {
      // padding: "16px"
      textAlign: "center",
      cursor: "pointer"
    }

    return (
      <div className="form-group mb-0 text-center">
        <button className="btn btn-primary btn-lg" onClick={() => this.props.viewMore(10)} >
          View More
        </button>
      </div>
    );
  }
}

export default BlockMoreButton;