import React, { Component } from "react";
import { connect } from "react-redux";
// import { Card, CardContent } from "@material-ui/core";
// import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";
import { GitAction } from "../../store/action/gitAction";
import "../../app/App.scss";
// import GoogleMaps from "../../components/googleMaps/googleMaps";
import { Show360 } from "../../components/360/360";
import CloseIcon from "@material-ui/icons/Close";
// import image from "../../assets/Emporia.png";
import Dropzone from "react-dropzone";
import axios from "axios";
import Logo from "../../assets/Emporia.png"
import { toast } from "react-toastify";
function mapStateToProps(state) {
  return {
    allgridstorages: state.counterReducer["gridstorage"],
    shoplots: state.counterReducer["shoplots"],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CallUpdateShoplots: (prodData) =>
      dispatch(GitAction.CallUpdateShoplots(prodData)),
  };
}
class ShoplotDetailComponent extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.data;
  }

  // state = {
  //   name: this.props.data.name,
  //   productShoplot: this.props.data.productShoplot,
  //   latitude: this.props.data.latitude,
  //   longitude: this.props.data.longitude,
  //   contact: this.props.data.contact,
  //   toBeEdited: this.props.data.toBeEdited,
  // };

  handleChange(data, e) {
    if (data === "productShoplot") {
      this.setState({
        ShoplotName: e.target.value,
      });
    } else if (data === "ShoplotName") {
      this.setState({
        name: e.target.value,
      });
    } else if (data === "ContactNumber") {
      this.setState({
        contact: e.target.value,
      });
    } else if (data === "Longitude") {
      this.setState({
        longitude: e.target.value,
      });
    } else if (data === "Latitude") {
      this.setState({
        latitude: e.target.value,
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
   
    var newList2 = this.state.file;
    this.state.file.map((file, i) => {
      var valueToBeUsed2 = parseInt(index);
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
      imageSrc: this.props.data.imageSrc,
    });

  };

  removeFile = function (data, index) {
    var newList = this.state.file;
    this.state.file.map((file, i) => {
      var valueToBeUsed = parseInt(index);
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
  };

  updateShoplotForm() {
    this.props.CallUpdateShoplots(this.state);

    for (var i = 0; i < this.state.file.length; i++) {
      const formData1 = new FormData();
      formData1.append("ShoplotID", this.state.ShoplotID);
      formData1.append(i + "image", this.state.file[i]);
      formData1.append("imageName", this.props.data.name + "_image_" + (i + 1));
      let url = "https://tourism.denoo.my/emporiaimage/uploadshoplot.php";
      axios.post(url, formData1, {}).then((res) => {
        toast.warning( "Warning: " + res);
      });
    }
  }

  // changeSrc = () => {
  //   this.setState({
  //     imageSrc: image,
  //   });
  // };

  render() {
    const edit = (e) => {
      this.setState((prevState, props) => {
        return { toBeEdited: !prevState.toBeEdited };
      });
      this.setState({
        name: this.props.data.name,
        productShoplot: this.props.data.productShoplot,
        latitude: this.props.data.latitude,
        longitude: this.props.data.longitude,
        contact: this.props.data.contact,
        imageSrc: this.props.data.imageSrc,
      });
     
    };

    const previewStyle = {
      display: "inline",
      width: 60,
      height: 60,
      padding: 5,
    };

    let allshoplotsData = this.props.shoplots
      ? Object.keys(this.props.shoplots).map((key) => {
          return this.props.shoplots[key];
        })
      : {};

    if (allshoplotsData.length > 0) {
      var NotEmpty = true;
      var createMenusForDropDownShoplots = allshoplotsData.map((d, i) => {
        return <option value={d.ShoplotID}>{d.ShoplotName}</option>;
      });
    } else {
      var NotEmpty = false;
    }

    const Shoplots = () => (
      <Select
        value={this.state.productShoplot}
        onChange={this.handleChange.bind(this, "Shoplot")}
        inputProps={{
          name: "Product Shoplot",
          id: "productShoplot",
        }}
        style={{ width: "100%" }}
      >
        <option aria-label="None" value="" />
        {createMenusForDropDownShoplots}
      </Select>
    );
    const back = () => {
      window.location.reload(false);
    };
    const cardStyle = { width: "80%", margin: "1% auto" };
    return (
      <div className="App" style={{ width: "100%", alignContent: "center" }}>
        <div className="App-header">
          <h1>Shoplot Detail</h1>
        </div>
        <Button onClick={back}>
          {/* <Link className="nav-link" to={"/view"}> */}
          Back
          {/* </Link> */}
        </Button>
        <Button
          variant="outlined"
          onClick={edit}
          style={{
            float: "right",
            marginBottom: "10px",
          }}
        >
          {this.state.toBeEdited ? "Cancel" : "Edit"}
        </Button>
        <br />
        <br />
        {this.state.toBeEdited ? (
          <div>
            {/* <Card>
              <CardContent> */}
            <CloseIcon style={{ float: "right" }} />
            <Show360 imageSrc={this.state.imageSrc} />
            {/* </CardContent>
            </Card> */}
            {/* <Card style={cardStyle}>
              <CardContent> */}
            {/* <Button
              variant="outlined"
              onClick={edit}
              style={{
                float: "right",
              }}
            >
              {this.state.toBeEdited ? "Cancel" : "Edit"}
            </Button> */}
            <br />
            {/* <button onClick={this.changeSrc.bind(this)}>upload</button> */}

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
                <img
                  src={imageName}
                  data-key={i}
                  onError={(e)=>{e.target.onerror = null; e.target.src=Logo}}
                  // onLoad={this.onLoad.bind(this, "512x512")}
                  style={{ display: "none" }}
                />
              ))}
            </div>
            {/* {this.state.notEnoughFiles512x512 && (
              <p
                style={{
                  color: "#e31e10",
                  margin: "0px 0px 0px 10px",
                }}
              >
                There has to be at least 3 images of the size 512x512 added.
              </p>
            )} */}

            <TextField
              id="text-field-controlled"
              helperText="Shoplot Name"
              value={this.state.name}
              onChange={this.handleChange.bind(this, "ShoplotName")}
              type="text"
              style={{ width: "100%" }}
            />
            <br />
            <TextField
              id="text-field-controlled"
              helperText="Contact Number"
              value={this.state.contact}
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
            >
              <FormHelperText>Location: </FormHelperText>
              <br />
              <TextField
                id="text-field-controlled"
                helperText="Longitude"
                value={this.state.longitude}
                onChange={this.handleChange.bind(this, "Longitude")}
                type="text"
                style={{ marginRight: "5px", width: "100%" }}
              />
              <TextField
                id="text-field-controlled"
                helperText="Latitude"
                value={this.state.latitude}
                onChange={this.handleChange.bind(this, "Latitude")}
                type="text"
                style={{ marginRight: "5px", width: "100%" }}
              />
              <br />
            </div>
            <br />
            <div style={{ width: "75%", height: "25%" }}>
              {/* <GoogleMaps /> */}
            </div>
            <div style={{ width: "100%", textAlign: "center" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={this.updateShoplotForm.bind(this)}
                style={{ margin: "0 auto" }}
              >
                Submit
              </Button>
            </div>
            {/* </CardContent>
            </Card> */}
          </div>
        ) : (
          <div>
            {/* <Card>
              <CardContent> */}
            <Show360 imageSrc={this.state.imageSrc} />
            <br />
            {/* </CardContent>
            </Card> */}
            {/* <Card style={cardStyle}>
              <CardContent> */}

            <TextField
              id="text-field-controlled"
              helperText="Shoplot Name"
              value={this.state.name}
              // onChange={this.handleChange.bind(this, "Shoplot Name")}
              disabled={true}
              type="text"
              style={{ width: "100%" }}
            />
            <br />
            <TextField
              id="text-field-controlled"
              helperText="Contact Number"
              value={this.state.contact}
              disabled={true}
              // onChange={this.handleChange.bind(this, "ContactNumber")}
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
            >
              <FormHelperText>Location: </FormHelperText>
              <br />
              <TextField
                id="text-field-controlled"
                helperText="Longitude"
                value={this.state.longitude}
                // onChange={this.handleChange.bind(this, "Longitude")}
                disabled={true}
                type="text"
                style={{ marginRight: "5px", width: "100%" }}
              />
              <TextField
                id="text-field-controlled"
                helperText="Latitude"
                value={this.state.latitude}
                // onChange={this.handleChange.bind(this, "Latitude")}
                disabled={true}
                type="text"
                style={{ marginRight: "5px", width: "100%" }}
              />
              <br />
            </div>
            <br />
            <div style={{ width: "75%", height: "25%" }}>
              {/* <GoogleMaps /> */}
            </div>
            {/* </CardContent>
            </Card> */}
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoplotDetailComponent);
