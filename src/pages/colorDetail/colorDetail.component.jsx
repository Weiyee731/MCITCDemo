import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, CardContent } from "@material-ui/core";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { GitAction } from "../../store/action/gitAction";
import "../../app/App.scss";
import { PhotoshopPicker } from "react-color";
import reactCSS from "reactcss";
import { toast } from "react-toastify";

function mapStateToProps(state) {
  return {
    colors: state.counterReducer["colors"],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CallUpdateColor: (prodData) => dispatch(GitAction.CallUpdateColor(prodData)),
  };
}

class ColorStorageDetailComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Color: "",
      displayColorPicker: false,
      // COLORID: props.Data.ColorID,
      color: {
        r: "241",
        g: "112",
        b: "19",
        a: "1",
        ColorHex: "",
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.addColorForm = this.addColorForm.bind(this);
    // this.props.Data;
    
  }

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChange = (color) => {
    this.setState({ color: color.rgb });
    this.setState({ ColorHex: color.hex.substr(1,20) });
  

  };

  handleChangeName(data, e) {
    if (data === "Color") {
      this.setState({
        Color: e.target.value,
      });
    }
  }
  addColorForm() {
   
    this.props.CallUpdateColor(this.state);
  }

  render() {

    const edit = (e) => {
      this.setState((prevState, props) => {
        return { toBeEdited: !prevState.toBeEdited };
      });
    };
    const styles = reactCSS({
      default: {
        color: {
          // width: "36px",
          width: "100%",
          height: "20px",
          borderRadius: "2px",
          background: `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`,
        },
        swatch: {
          padding: "5px",
          background: "#fff",
          borderRadius: "1px",
          boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
          display: "inline-block",
          cursor: "pointer",
          // height: "200px"
          width: "30%",
        },
        popover: {
          position: "absolute",
          zIndex: "2",
        },
        cover: {
          position: "fixed",
          top: "0px",
          right: "0px",
          bottom: "0px",
          left: "0px",
        },
      },
    });
    
    const back = () => {
      window.location.reload(false);
    };
    const cardStyle = { width: "80%", margin: "1% auto" };

    return (
      <div className="App" style={{ width: "100%", alignContent: "center" }}>
        <div className="App-header">
          <h1 style={{ margin: "10px" }}>Color Detail</h1>
        </div>
        <Button onClick={back}>
          <Link className="nav-link" to={"/viewColor"}>
            Back
          </Link>
        </Button>
        {this.state.toBeEdited ? (
          <div>
            <Card style={cardStyle}>
              <CardContent>
                <Button
                  variant="outlined"
                  onClick={edit}
                  style={{
                    float: "right",
                  }}
                >
                  {this.state.toBeEdited ? "Cancel" : "Edit"}
                </Button>
{/* Here colorp */}
                <div>
                <h1 style={{ margin: "10px" }}>Choose your desired color</h1>
                <br />
                <div style={styles.swatch} onClick={this.handleClick}>
                  <div style={styles.color} />
                </div>
                {this.state.displayColorPicker ? (
                  <div style={styles.popover}>
                    <div style={styles.cover} onClick={this.handleClose} />
                    <PhotoshopPicker
                      color={this.state.color}
                      onChange={this.handleChange}
                    />
                  </div>
                ) : null}
              </div>

              <TextField
                disabled="true"
                id="text-field-controlled"
                helperText="Color Code"
                value={this.state.ColorHex && this.state.ColorHex.substr(1,20)}
                // value={this.state.ColorHex}
                onChange={this.handleChange.bind(this, "ColorID")}
                type="text"
                style={{ marginRight: "5px", width: "30%" }}
              />
                <br />
                <br />
                <TextField
                  id="text-field-controlled"
                  helperText="Color Name"
                  value={this.state.Color}
                  onChange={this.handleChangeName.bind(this, "Color")}
                  type="text"
                  style={{ marginRight: "5px", width: "30%" }}
                />
                <br />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.addColorForm}
                >
                  Submit
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div>
            <Card style={cardStyle}>
              <CardContent>
                <Button
                  variant="outlined"
                  onClick={edit}
                  style={{
                    float: "right",
                  }}
                >
                  {this.state.toBeEdited ? "Cancel" : "Edit"}
                </Button>
                <TextField
                  id="text-field-controlled"
                  helperText="Color Number"
                  value={this.props.data.ColorHexCode && this.props.data.ColorHexCode.substr(1,20)}
                  type="text"
                  style={{ marginRight: "5px", width: "30%" }}
                />
                <br />
                <br />
                <TextField
                  id="text-field-controlled"
                  helperText="Color Name"
                  value={this.props.data.Color}
                  onChange={this.handleChangeName.bind(this, "Color")}
                  type="text"
                  style={{ marginRight: "5px", width: "30%" }}
                />
                <br />
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                    // alignContent: "stretch",
                  }}
                >
                </div>
                <br />
              
              
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ColorStorageDetailComponent);
