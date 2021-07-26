// react
import React, { Component } from "react";

class BlockMoreButton extends Component {

  render() {
    console.log("BLOCLMOOREBUTTON", this.props)
    return (
      <div className="form-group mb-0 text-center">
        <button className="btn btn-primary btn-lg" onClick={() => this.props.viewMore()} >
          View More
        </button>
      </div>
    );
  }
}

export default BlockMoreButton;