import React, { useState, Component } from "react";
import { render } from "react-dom";
import { Link, useHistory } from "react-router-dom";
import Dropzone from "react-dropzone";
import axios from "axios";
import { connect } from "react-redux";
import { GitAction } from "../../store/action/gitAction";
// import { handleSlideChange } from "../../pages/addProduct/addProduct.component"

function mapStateToProps(state) {
  return {
    addproduct: state.counterReducer["product"],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    callAddProduct: (prodData) => dispatch(GitAction.CallAddProduct(prodData)),
  };
}

class UploadImages extends Component {
  //  [fileNames, setFileNames] = useState([]);
  constructor() {
    super();
    this.state = {
      file: [],
      fileInfo: [],
      url: [],
      counter: 0,
      counter2: 0,
      file2: [],
      fileInfo2: [],
      url2: [],
      index: 0,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    let files = event.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);

    reader.onload = (e) => {
      this.setState({
        selectedFile: e.target.result,
      });
    };
  }

  handleDrop = (data, acceptedFiles) => {
    // setFileNames(acceptedFiles.map((file) => file.name));
    // setFileNames(acceptedFiles.map((file) => fileNames.concat(file.name)));
    // setFileNames(fileNames.concat(acceptedFiles.map((file) => file.name)));
    // this.state.file.push(acceptedFiles.map((file) => file));
    if (data == "512x512") {
      this.setState((state) => {
        const file = state.file.concat(acceptedFiles.map((file) => file));
        const fileInfo = state.fileInfo.concat(
          acceptedFiles.map((file) => file.name)
        );
        const url = state.url.concat(
          acceptedFiles.map((file) => URL.createObjectURL(file))
        );
        return {
          file,
          fileInfo,
          url,
        };
      });
    } else if (data == "1600x900") {
      this.setState((state) => {
        const file2 = state.file2.concat(acceptedFiles.map((file) => file));
        const fileInfo2 = state.fileInfo2.concat(
          acceptedFiles.map((file) => file.name)
        );
        const url2 = state.url2.concat(
          acceptedFiles.map((file) => URL.createObjectURL(file))
        );
        return {
          file2,
          fileInfo2,
          url2,
        };
      });
    }

    // this.setState({
    //   file: acceptedFiles,
    // });

    acceptedFiles.map((file) => {
      var reader = new FileReader();
      reader.readAsDataURL(file);
    });
  };

  onLoad = (data, e) => {
    if (data == "512x512") {
      var heigth = e.target.height;
      var width = e.target.width;
      if (heigth != 512 || width != 512) {
        this.removeFile(
          "512x512",
          e.target.attributes.getNamedItem("data-key").value
        );
        alert("Images have to be 500 x 500");
      } else {
        // this.removeFile(e.target.attributes.getNamedItem("data-key").value);
      }
    } else if (data == "1600x900") {
      var heigth = e.target.height;
      var width = e.target.width;
      if (heigth != 900 || width != 1600) {
        this.removeFile(
          "1600x900",
          e.target.attributes.getNamedItem("data-key").value
        );
        alert("Images have to be 1600 x 900");
      } else {
        // this.removeFile(e.target.attributes.getNamedItem("data-key").value);
      }
    }
  };

  onDelete = (index, data) => {
    if (data == "512x512") {
      var newList2 = this.state.file;
      this.state.file.map((file, i) => {
        var valueToBeUsed2 = parseInt(index);
        if (i == valueToBeUsed2) {
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
      });
    } else if (data == "1600x900") {
      var newList3 = this.state.file2;
      this.state.file2.map((file, i) => {
        var valueToBeUsed2 = parseInt(index);
        if (i == valueToBeUsed2) {
          newList3 = newList3.filter((file2) => file !== file2);
          this.setState({
            counter2: this.state.counter2 + 1,
          });
        }
      });
      this.setState({
        file2: newList3.map((file3) => file3),
        fileInfo2: newList3.map((file3) => file3.name),
        url2: newList3.map((file3) => URL.createObjectURL(file3)),
      });
    }
  };

  removeFile = function (data, index) {
    if (data == "512x512") {
      var newList = this.state.file;
      this.state.file.map((file, i) => {
        var valueToBeUsed = parseInt(index);
        if (i == valueToBeUsed) {
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
    } else if (data == "1600x900") {
      var newList4 = this.state.file2;
      this.state.file2.map((file, i) => {
        var valueToBeUsed = parseInt(index);
        if (i == valueToBeUsed) {
          newList4 = newList4.filter((file2) => file !== file2);
          this.setState({
            counter: this.state.counter + 1,
          });
        }
      });
      this.setState({
        file2: newList4.map((file3) => file3),
        fileInfo2: newList4.map((file3) => file3.name),
        url2: newList4.map((file3) => URL.createObjectURL(file3)),
      });
    }
  };

  changeBackground2 = (e) => {
    e.target.style.background = "#fff";
    e.target.style.color = "#a31702";
  };

  changeBackground = (e) => {
    e.target.style.background = "#a31702";
    e.target.style.color = "#fff";
  };

  uploadFile = async () => {
    if (this.state.file.length < 1 || this.state.file2.length < 1) {
      alert("There has to be at least 1 images for each size");
    } else {
      this.setState({
        index: 1,
      });

      for (var i = 0; i < this.state.file.length; i++) {
        const formData1 = new FormData();
        formData1.append(i + "image500x500", this.state.file[i]);
        formData1.append(
          "imageName",
          this.props.data.name + "_image500x500_" + (i + 1)
        );
        let url = "http://tourism.denoo.my/emporiaimage/upload.php";
        axios
          .post(url, formData1, {
            // receive two parameter endpoint url ,form data
          })
          .then((res) => {
            console.warn(res);
          });
      }
      for (var i = 0; i < this.state.file2.length; i++) {
        const formData2 = new FormData();
        formData2.append(i + "image1600x900", this.state.file2[i]);
        formData2.append(
          "imageName",
          this.props.data.name + "_image1600x900_" + (i + 1)
        );
        let url = "http://tourism.denoo.my/emporiaimage/upload.php";
        axios.post(url, formData2, {}).then((res) => {
          console.warn(res);
        });
      }
      // this.props.callAddProduct(this.props.data);
    }
  };

  render() {
    const previewStyle = {
      display: "inline",
      width: 60,
      height: 60,
      padding: 5,
    };

    return (
      <div className="App">
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
              <input
                {...getInputProps()}
                onChange={this.handleInputChange}
                multiple
              />
              <p>
                {isDragActive
                  ? isDragReject
                    ? "The file needs to be an image"
                    : "Release to drop file"
                  : "Drag and drop images, or click to select files. \n Images have to be 512 x 512"}
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
          <strong>Images:</strong>
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
                  <img src={this.state.url[i]} style={previewStyle} />
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
              onLoad={this.onLoad.bind(this, "512x512")}
              style={{ display: "none" }}
            />
          ))}
        </div>

        <Dropzone
          onDrop={this.handleDrop.bind(this, "1600x900")}
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
              <input
                {...getInputProps()}
                onChange={this.handleInputChange}
                multiple
              />
              <p>
                {isDragActive
                  ? isDragReject
                    ? "The file needs to be an image"
                    : "Release to drop file"
                  : "Drag and drop images, or click to select files. \n Images have to be 1600 x 900"}
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
          <strong>Images:</strong>
          <ul>
            {this.state.fileInfo2.map((fileName, i) => (
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
                  <img src={this.state.url2[i]} style={previewStyle} />
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
                    onClick={() => this.onDelete(i, "1600x900")}
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
          {this.state.url2.map((imageName, i) => (
            <img
              src={imageName}
              data-key={i}
              onLoad={this.onLoad.bind(this, "1600x900")}
              style={{ display: "none" }}
            />
          ))}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <button
            onClick={this.uploadFile}
            style={{
              background: "#000",
              borderRadius: "5px",
              padding: "10px",
              width: "80px",
              height: "auto",
              color: "white",
              borderColor: "#000",
              borderWidth: "2px",
              fontWeight: "bold",
            }}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UploadImages);
