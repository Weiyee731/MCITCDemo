import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, CardContent, CardActions } from "@material-ui/core";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";
import { GitAction } from "../../store/action/gitAction";
import GoogleMaps from "../../components/googleMaps/googleMapsForPolygonCreation";
import "../../app/App.scss";
import placeHolder from "../../assets/logo_white_word.png";
import { Show360 } from "../../components/360/360";
import Dropzone from "react-dropzone";
import axios from "axios";
import Logo from "../../assets/Emporia.png"
import { toast } from "react-toastify";

function mapStateToProps(state) {
  return {
    result: state.counterReducer["shoplots"],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CallAddShoplots: (prodData) =>
      dispatch(GitAction.CallAddShoplots(prodData)),
  };
}

class AddShopLotComponent extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    ShoplotID: "",
    ShoplotName: "",
    ContactNumber: "",
    Location: "",
    imageSrc: placeHolder,
    file: [],
    fileInfo: [],
    url: [],
    counter: 0,
    shoplotAdded: false,
    ShoplotID: null,
  };

  handleChange(data, e) {
    if (data === "ShoplotID") {
      this.setState({
        ShoplotID: e.target.value,
      });
    } else if (data === "ShoplotName") {
      this.setState({
        ShoplotName: e.target.value,
      });
    } else if (data === "ContactNumber") {
      this.setState({
        ContactNumber: e.target.value,
      });
    } else if (data === "Location") {
      this.setState({
        Location: e.target.value,
      });
    }
  }

  handleDrop = (data, acceptedFiles) => {
    if (acceptedFiles.length > 1) {
      toast.error( "Only one image can be uploaded!");
    } else {
      this.setState((state) => {
        const file = acceptedFiles.map((file) => file);
        const fileInfo = acceptedFiles.map((file) => file.name);
        const url = acceptedFiles.map((file) => URL.createObjectURL(file));
        return {
          file,
          fileInfo,
          url,
        };
      });
      acceptedFiles.map((file) => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
      });
      this.setState({
        imageSrc: this.state.url[0],
      });
    }
  };
  onDelete = (index, data) => {
    toast.success( "i: " + index + "data: " + data);
    var newList2 = this.state.file;
    this.state.file.map((file, i) => {
      var valueToBeUsed2 = parseInt(index);
      toast.success( "index: " + parseInt(i) + " i: " + parseInt(valueToBeUsed2));
      if (i === valueToBeUsed2) {
        newList2 = newList2.filter((file2) => file !== file2);
        this.setState({
          counter2: this.state.counter2 + 1,
        });
      }
    });
    this.setState({
      file: newList2.map((file3) => file3),
      fileInfo: newList2.map((file3) => file3.name),
      url: newList2.map((file3) => URL.createObjectURL(file3)),
      imageSrc: placeHolder,
    });

    toast.success( "newfile2: " +
    newList2.map((file) => file.name) +
    "orignalList2: " +
    this.state.file.map((files) => files.name) +
    "counter2: " +
    this.state.counter2);
  };

  removeFile = function (data, index) {
    var newList = this.state.file;
    this.state.file.map((file, i) => {
      var valueToBeUsed = parseInt(index);
      toast.success( "index: " + parseInt(i) + " i: " + parseInt(valueToBeUsed));
      if (i === valueToBeUsed) {
        newList = newList.filter((file2) => file !== file2);
        this.setState({
          counter: this.state.counter + 1,
        });
      }
    });
    this.setState({
      file: newList.map((file3) => file3),
      fileInfo: newList.map((file3) => file3.name),
      url: newList.map((file3) => URL.createObjectURL(file3)),
    });
    toast.success( "newfile: " +
    newList.map((file) => file.name) +
    "orignalList: " +
    this.state.file.map((files) => files.name) +
    "counter: " +
    this.state.counter);

  };

  addShoplotForm = () => {
    this.props.CallAddShoplots(this.state);
  };

  setTheState = (value) => {
    this.setState({
      Location: value,
    });
  };

  render() {
    var counter = 0;
    let resultData = this.props.result
      ? Object.keys(this.props.result).map((key) => {
          toast.success( key + " + key ");
          return this.props.result[key];
        })
      : {};
    if (resultData.length > 0) {
      resultData.map((d, i) => {

        toast.success( d.ReturnVal + " + d ");
        if (d.ReturnVal === 0) {
          while (counter === 0) {
            for (var i = 0; i < this.state.file.length; i++) {
              const formData1 = new FormData();
              formData1.append("ShoplotID", this.state.ShoplotID);
              formData1.append(i + "image", this.state.file[i]);
              formData1.append("imageName", d.ShoplotID + "_image_" + (i + 1));
              let url = "http://tourism.denoo.my/emporiaimage/uploadshoplot.php";
              axios.post(url, formData1, {}).then((res) => {
                toast.warning( "Warning: " + res);
              });
            }
            counter++;
          }
          toast.success( d.ReturnVal + "  +   " + d.ShoplotID);
        }
      });
    }

    const polypath = [
      {
        block: "A",
        Color: "#008000",
        ShoplotCoordinate: [
          { lat: 1.5921641925052, lng: 110.431633074988 },
          { lat: 1.59115338985581, lng: 110.429951329936 },
          { lat: 1.59001492677904, lng: 110.430582476623 },
          { lat: 1.59102304881136, lng: 110.432309819229 },
          { lat: 1.5921641925052, lng: 110.431633074988 },
        ],
      },
      {
        block: "B",
        Color: "#FFFF00",
        ShoplotCoordinate: [
          { lat: 1.59219311478493, lng: 110.431658803505 },
          { lat: 1.59105065831252, lng: 110.432325065247 },
          { lat: 1.59264758826223, lng: 110.434993215471 },
          { lat: 1.59378358792204, lng: 110.43431969478 },
          { lat: 1.59219311478493, lng: 110.431658803505 },
        ],
      },
      {
        block: "C",
        Color: "#FF0000",
        ShoplotCoordinate: [
          { lat: 1.5939685198604472, lng: 110.43665361977425 },
          { lat: 1.5936590240065396, lng: 110.43611937906833 },
          { lat: 1.5945346343454787, lng: 110.43560473453614 },
          { lat: 1.5937790950076558, lng: 110.43433013423987 },
          { lat: 1.592637929429218, lng: 110.43500991320931 },
          { lat: 1.593685862577975, lng: 110.43677943664157 },
          { lat: 1.5939685198604472, lng: 110.43665361977425 },
        ],
      },
    ];
    const previewStyle = {
      display: "inline",
      width: 60,
      height: 60,
      padding: 5,
    };
    const cardStyle = { width: "80%", margin: "1% auto" };
    return (
      <div className="App" style={{ width: "100%", alignContent: "center" }}>
        <div className="App-header">
          <h1 style={{ margin: "10px" }}>Shoplot</h1>
        </div>
        <Button>
          <Link className="nav-link" to={"/viewShoplots"}>
            Back
          </Link>
        </Button>
        <Card style={cardStyle}>
          <CardContent>
            <Show360 imageSrc={this.state.imageSrc} />
            <br />
            <Dropzone
              onDrop={this.handleDrop.bind(this, "512x512")}
              accept="image/*"
            >
              {({
                getRootProps,
                getInputProps,
                isDragActive,
                isDragAccept,
                isDragReject,
              }) => (
                <div
                  {...getRootProps({
                    className: "dropzone",
                  })}
                  style={{
                    background: "#f0f0f0",
                    padding: "20px",
                    margin: "0px auto",
                    marginTop: "5px",
                    borderStyle: "dashed",
                    borderColor: isDragActive
                      ? isDragReject
                        ? "#fc5447"
                        : "#a0d100"
                      : "#b8b8b8",
                    borderWidth: "2px",
                    borderRadius: "10px",
                    textAlign: "center",
                    selfAlign: "center",
                    width: "90%",
                    height: "auto",
                    color: isDragActive
                      ? isDragReject
                        ? "#a31702"
                        : "#507500"
                      : "#828282",
                    fontWeight: "bold",
                  }}
                >
                  <input {...getInputProps()} />
                  <p>
                    {isDragActive
                      ? isDragReject
                        ? "The file needs to be an image"
                        : "Release to drop file"
                      : "Drag and drop the image, or click to select file."}
                  </p>
                </div>
              )}
            </Dropzone>

            <div
              style={{
                textAlign: "left",
                marginLeft: "5%",
                marginTop: "5px",
              }}
            >
              <strong>Image:</strong>
              <ul>
                {this.state.fileInfo.map((fileName, i) => (
                  <li
                    style={{
                      listStyle: "none",
                    }}
                    key={fileName}
                  >
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        alignContent: "space-between",
                      }}
                    >
                      <img src={this.state.url[i]} onError={(e)=>{e.target.onerror = null; e.target.src=Logo}} style={previewStyle} />
                      <p style={{ margin: "5px", width: "100%" }}>{fileName}</p>
                      <button
                        style={{
                          borderColor: "#a31702",
                          background: "#fff",
                          borderWidth: "2px",
                          borderRadius: "5px",
                          marginRight: "10px",
                          color: "#a31702",
                          fontWeight: "bold",
                        }}
                        onMouseOver={this.changeBackground}
                        onMouseLeave={this.changeBackground2}
                        key={fileName}
                        onClick={() => this.onDelete(i, "512x512")}
                      >
                        {" "}
                        Remove{" "}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              {this.state.url.map((imageName, i) => (
                <img src={imageName}  onError={(e)=>{e.target.onerror = null; e.target.src=Logo}} data-key={i} style={{ display: "none" }} />
              ))}
            </div>
            <TextField
              id="text-field-controlled"
              helperText="Shoplot Name"
              value={this.state.ShoplotName}
              onChange={this.handleChange.bind(this, "ShoplotName")}
              type="text"
              style={{ width: "100%" }}
            />
            <br />
            <TextField
              id="text-field-controlled"
              helperText="Contact Number"
              value={this.state.ContactNumber}
              onChange={this.handleChange.bind(this, "ContactNumber")}
              type="number"
              style={{ width: "100%" }}
            />
            <br />
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
            ></div>
            <br />
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
              }}
            ></div>
            <br />
            <div style={{ width: "768px", height: "525px" }}>
              <GoogleMaps
                zoom={18}
                data={this.state}
                setValue={this.setTheState}
              />
            </div>
            <div style={{ width: "100%", textAlign: "center" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={this.addShoplotForm.bind(this)}
                style={{ margin: "0 auto" }}
              >
                Submit
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddShopLotComponent);
