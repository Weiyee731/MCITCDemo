import React, { Component } from "react";
import { Pannellum } from "pannellum-react";
import "./styles.css";
import { toast } from "react-toastify";
export class Show360 extends Component {
  // constructor(props) {
  //   super(props);

  // }

  render() {
    return (
      <div className="panel">
        <Pannellum
          width="100%"
          height="500px"
          image={this.props.imageSrc}
          pitch={10}
          yaw={180}
          hfov={110}
          autoLoad
          showZoomCtrl={false}
          onLoad={() => {
            toast.success(`panorama loaded`);
          }}
        >
          <Pannellum.Hotspot
            type="custom"
            pitch={31}
            yaw={150}
            handleClick={(evt, name) => 
              toast.success({name})}
            name="hs1"
          />
        </Pannellum>
      </div>
    );
  }
}

export default Show360;
