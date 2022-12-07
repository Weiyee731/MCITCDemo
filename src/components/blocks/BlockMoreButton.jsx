// react
import React, { Component } from "react";

class BlockMoreButton extends Component {

  render() {
    return (
      <div className="form-group mb-0 text-center">
        <button className="btn btn-primary btn-lg" style={{borderRadius:"5px"}} onClick={() => this.props.viewMore()} >
          View More
        </button>
      </div>
    );
  }
}

export default BlockMoreButton;