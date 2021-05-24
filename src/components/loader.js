import React from "react";
import Loader from "react-loader-spinner";

export default class LoaderComponent extends React.Component {
  //other logic
  render() {
    return (
      <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={5000} //5 secs
      />
    );
  }
}

// export  {LoaderComponent};
