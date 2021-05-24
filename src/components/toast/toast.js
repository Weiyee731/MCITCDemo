import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export class Show360 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const notify = () => toast("Wow so easy !");
    return (
      <div>
        <button onClick={notify}>Notify !</button>
        <ToastContainer />
      </div>
    );
  }
}
