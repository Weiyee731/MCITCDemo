// react
import React, { Component } from "react";

// third-party
import { Modal, ModalBody } from "reactstrap";

// data stubs
import Dropzone from "react-dropzone";
import { connect } from "react-redux";
import { GitAction } from "../../store/action/gitAction";

import "./AccountPageProfile.component.css";
import {
  Card,
  CardMedia,
  TableHead,
  Typography,
  Divider,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import MuiTableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { toast } from "react-toastify";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import "./AccountPageProfile.css";
import moment from 'moment';

const TableCell = withStyles({
  root: {
    borderBottom: "none",
  },
})(MuiTableCell);

function mapStateToProps(state) {
  return {
    userprofiledata: state.counterReducer["currentUser"],
    countrylist: state.counterReducer["countries"],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CallUserProfile: (propsData) =>
      dispatch(GitAction.CallUserProfile(propsData)),

    CallUpdateUserProfile: (propsData) =>
      dispatch(GitAction.CallUpdateUserProfile(propsData)),

    CallCountry: () => dispatch(GitAction.CallCountry()),

    CallUpdateProfileImage: (propsData) =>
      dispatch(GitAction.CallUpdateProfileImage(propsData)),
  };
}

class AccountPageProfile extends Component {
  constructor(props) {
    super(props);
    this.props.CallUserProfile(window.localStorage.getItem("id"));
    this.props.CallCountry();

    this.state = {
      USERID: window.localStorage.getItem("id"),
      USERFIRSTNAME: "",
      USERLASTNAME: "",
      USERCONTACTNO: "",
      USERDATEBIRTH: "",
      USEREMAIL: "",
      USERGENDER: "",
      USERADDRESSLINE1: "",
      USERADDRESSLINE2: "",
      USERPOSCODE: "",
      USERCITY: "",
      USERSTATE: "",
      USERCOUNTRYID: "",
      USERNOTIFICATIONIND: "",
      USERLANGCODE: "",
      USERAPPDARKMODE: "",
      CountryName: "-",
      open: false,
      open1: false,
      showBoxForImage: false,
      fileAdded: false,
      file: "",
      fileInfo: "",
      url: "",
      imageFile: null,
      imageName: null,
      validfirstName: null,
      validlastName: null,
      validDOB: null,
      validGender: null,
    };
  }
  /////////////////////UPLOAD PROFILE PHOTO/////////////////////////////////////////////////


  componentDidMount() {
    console.log()
    if (this.props.userprofiledata !== null) {
      let userDetails = this.props.userprofiledata[0];
      this.setState({
        USERFIRSTNAME: userDetails.FirstName !== null ? userDetails.FirstName : "-",
        USERLASTNAME: userDetails.LastName !== null ? userDetails.LastName : "-",
        USERCONTACTNO: userDetails.UserContactNo !== null ? userDetails.UserContactNo : "-",
        USERDATEBIRTH: userDetails.UserDOB !== null ? userDetails.UserDOB : moment(new Date).format("YYYYMMDD"),
        USEREMAIL: userDetails.UserEmailAddress !== null ? userDetails.UserEmailAddress : "-",
        USERGENDER: userDetails.UserGender !== null ? userDetails.UserGender : "-",
        USERADDRESSLINE1: userDetails.UserAddressLine1 !== null ? userDetails.UserAddressLine1 : "-",
        USERADDRESSLINE2: userDetails.UserAddressLine2 !== null ? userDetails.UserAddressLine2 : "-",
        USERPOSCODE: userDetails.UserPoscode !== null ? userDetails.UserPoscode : "-",
        USERCITY: userDetails.UserCity !== null ? userDetails.UserCity : "-",
        USERSTATE: userDetails.UserState !== null ? userDetails.UserState : "-",
        USERCOUNTRYID: userDetails.CountryID !== null ? userDetails.CountryID : "148",
        USERNOTIFICATIONIND: userDetails.UserNotificationInd !== null ? userDetails.UserNotificationInd : "1",
        USERLANGCODE: userDetails.UserLanguageCode !== null ? userDetails.UserLanguageCode : "en",
        USERAPPDARKMODE: userDetails.AppDarkMode !== null ? userDetails.AppDarkMode : "1",
        CountryName: "-",
      })
    }
  }
  onFileUpload = () => {
    const formData = new FormData();

    let imageName = new Date().valueOf();

    let fileExt = this.state.imageFile.map((imagedetails) =>
      imagedetails.type.substring("image/".length)
    );
    let FullImageName = JSON.stringify(imageName) + "." + fileExt;

    formData.append("imageFile", this.state.imageFile[0]);
    formData.append("imageName", FullImageName);

    console.log(JSON.stringify(FullImageName));
    let file = {
      USERID: window.localStorage.getItem("id"),
      USERPROFILEIMAGE: FullImageName,
    };
    axios
      .post(
        "http://tourism.denoo.my/emporiaimage/uploaduserprofilepicture.php",
        formData,
        {}
      )
      .then((res) => {
        console.log(res);
        this.props.CallUpdateProfileImage(file);
      });
  };
  ///////////////////////////DELETE PHOTO SELECTED////////////////////////////////
  removeFile() {
    this.setState({
      fileAdded: false,
    });
    const index = this.state.imageFile.indexOf(0);
    const files = this.state.imageFile.slice(0);
    files.splice(index, 1);
  }
  /////////////////////HANDLE OPEN OR CLOSE TABLE//////////////////////////////////////////
  setOpenTable(status) {
    if (status == false) {
      this.setState({ open: false });
    } else {
      this.setState({ open: true });
    }
  }

  ////////////////////////HANDLE OPEN OR CLOSE DROPZONE////////////////////////////////////////////
  modalOpen() {
    this.setState({ showBoxForImage: true });
  }
  modalClose() {
    this.setState({ showBoxForImage: false });
  }

  //////////////////////GET INPUT FROM USER///////////////////////////////////////////////////////////

  handleChangeforFirstName = (e) => {
    const { value } = e.target;
    if (value !== null) {
      this.setState({
        USERFIRSTNAME: value,
        validfirstName: true,
      });
    } else {
      console.log(" first name null");
    }
  };

  handleChangeforLastName = (e) => {
    const { value } = e.target;

    if (value !== null) {
      this.setState({
        USERLASTNAME: value,
        validlastName: true,
      });
    } else {
      console.log(" last name null");
    }
  };

  handleChangeforGender = (e) => {
    const { value } = e.target;

    if (value !== null) {
      this.setState({
        USERGENDER: value,
        validGender: true,
      });
    } else {
      console.log(" gender null");
    }
  };

  handleChangeforDOB = (e) => {
    const { value } = e.target;
    console.log("moment(date).format('YYYYMMDD')", moment(value).format("YYYYMMDD"))

    if (value !== null) {
      this.setState({
        USERDATEBIRTH: value,
        validDOB: true,
      });
    } else {
      console.log(" dob null");
    }
  };

  // handleChangeforEmail =(e) => {
  //   const { value } = e.target;

  //   this.setState({
  //     USEREMAIL: value,
  //   });
  // };

  // handleChangeforContact =(e) => {
  //   const { value } = e.target;

  //   this.setState({
  //     USERCONTACTNO: value,
  //   });
  // };

  // handleChangeforUserNotification =(e) => {
  //   const { value } = e.target;

  //   this.setState({
  //     USERNOTIFICATIONIND: value,
  //   });
  // };

  // handleChangeforLanguage =(e) => {
  //   const { value } = e.target;

  //   this.setState({
  //     USERLANGCODE: value,
  //   });
  // };

  // handleChangeforDarkMode =(e) => {
  //   const { value } = e.target;

  //   this.setState({
  //     USERAPPDARKMODE: value,
  //   });
  // };

  /////////////////CALL API TO UPDATE PROFILE INFO///////////////////////////////////////////
  addProfile() {
    this.props.CallUpdateUserProfile(this.state);
  }


  render() {
    const rowStyle = { width: "16vw", textAlign: "left", paddingLeft: "3rem" };

    console.log("this.state in user profile", this.state)

    const getUploadParams = () => {
      return { url: "http://pmappapi.com/Memo/uploads/uploads/" };
    };

    const handleChangeStatus = ({ meta }, status) => {
      console.log(status, meta);
    };

    const handleSubmit = (files, allFiles) => {
      console.log(files.map((f) => f.meta));
      allFiles.forEach((f) => f.remove());
    };

    const censorContact = (str) => {
      return str[0] + str[1] + "*".repeat(str.length - 2) + str.slice(-4);
    };
    const censorWord = (str) => {
      return str[0] + "*".repeat(str.length - 2) + str.slice(-1);
    };
    //    const censorMail =  (str)=> {
    //     return str[0] + "*".repeat(str.length - 2) + str.slice(-4);
    //  }

    const censorEmail = (email) => {
      if (email !== null && email.length > 5) {
        var arr = email.split("@");
        return censorWord(arr[0]) + "@" + arr[1];
      } else return "No email was found";
    };

    return (
      <Card>
        <CardContent>
          <div className="row" style={{ margin: "10px" }}>
            <div className="col-9 col-lg-9 col-xl-9">
              <h5
                style={{
                  textAlign: "left",
                  fontWeight: "bold",
                }}
              >
                My Profile
              </h5>

              <Typography
                style={{
                  fontSize: "15px",
                  fontFamily: "Calibri Light,sans-serif",
                }}
              >
                Manage your personal information
              </Typography>
            </div>
            <div
              style={{
                textAlign: "right",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={() => this.addProfile()}
              >
                Save
              </Button>
            </div>
          </div>
          <Divider variant="fullWidth" className="dividerbottom" />
          {/* profile image */}
          <div onClick={() => this.modalOpen()} className="imagecontainer">
            <CardMedia
              component="img"
              alt="Profile Picture"
              height="180"
              image={JSON.stringify(
                this.props.userprofiledata.map((i) => i.UserProfileImage)
              )}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://img-cdn.tid.al/o/4858a4b2723b7d0c7d05584ff57701f7b0c54ce3.jpg";
              }}
              style={{
                display: "inline",
                margin: "0 auto",
                marginLeft: "-25%", //centers the image
                height: "100%",
                width: "auto",
                cursor: "pointer",
              }}
            />
            <div className="overlay">Edit</div>
          </div>

          <TableContainer
            component={Paper}
            style={{
              float: "left",
              borderCollapse: "collapse",
              border: "none",
              boxShadow: "none",
              marginBottom: "4%",
            }}
          >
            {this.props.userprofiledata.map((row) => (
              <Table>
                <TableBody>
                  <TableRow style={{ width: "100%  " }}>
                    <TableCell className="rowStyle">First Name</TableCell>
                    <TableCell>
                      <TextField
                        variant="outlined"
                        size="small"
                        id="userfirstname"
                        defaultValue={row.FirstName}
                        onChange={this.handleChangeforFirstName.bind(this)}
                        style={{ marginRight: "5px", width: "100%" }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="rowStyle">Last Name</TableCell>
                    <TableCell>
                      <TextField
                        variant="outlined"
                        size="small"
                        id="userlastname"
                        defaultValue={row.LastName}
                        onChange={this.handleChangeforLastName.bind(this)}
                        style={{ marginRight: "5px", width: "100%" }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="rowStyle">Date of Birth</TableCell>
                    <TableCell>
                      <TextField
                        variant="outlined"
                        size="small"
                        id="userdob"
                        type="date"
                        defaultValue={row.UserDOB}
                        onChange={this.handleChangeforDOB.bind(this)}
                        style={{ marginRight: "5px", width: "100%" }}
                      />
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell className="rowStyle">Gender</TableCell>
                    <TableCell>
                      <FormControl component="fieldset">
                        <RadioGroup
                          aria-label="USERGENDER"
                          name="USERGENDER"
                          defaultValue={row.UserGender}
                          value={this.state.USERGENDER}
                          onChange={this.handleChangeforGender}
                        >
                          <FormControlLabel
                            value="Male"
                            fontSize="14px"
                            fontWeight="400"
                            control={<Radio />}
                            label="Male"
                          />
                          <FormControlLabel
                            value="Female"
                            fontSize="14px"
                            fontWeight="400"
                            control={<Radio />}
                            label="Female"
                          />
                          <FormControlLabel
                            value="RatherNotToSay"
                            fontSize="14px"
                            fontWeight="400"
                            control={<Radio />}
                            label="Rather Not To Say"
                          />
                        </RadioGroup>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="rowStyle">Contact Number</TableCell>
                    <TableCell>
                      {/* {row.UserContactNo !== null ? censorContact(row.UserContactNo) : "-"} */}
                      {row.UserContactNo !== null ? row.UserContactNo : "-"}
                      <Button style={{ float: "right" }}>Change Contact</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="rowStyle">Email Address</TableCell>
                    <TableCell>
                      {row.UserEmailAddress !== null ? censorEmail(row.UserEmailAddress) : "-"}
                      <Button style={{ float: "right" }}>Change Email</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            ))}
          </TableContainer>

        </CardContent>

        <div
          style={{
            textAlign: "center",
            padding: "inherit",
          }}
        >
          <Modal
            className="modal-dialog-centered"
            isOpen={this.state.showBoxForImage}
            toggle={() => this.modalClose()}
          >
            <ModalBody>
              <div
                align="center"
                className="form-content p-2"
              // style={{ width: "100vw", height: "60vh"}}
              >
                <div>
                  <Dropzone
                    style={{ width: "100vw", height: "60vh" }}
                    onDrop={(acceptedFiles) => {
                      if (acceptedFiles.length > 0) {
                        this.setState({
                          imageName: acceptedFiles[0].name,
                          fileAdded: true,
                          imageFile: acceptedFiles,
                        });
                        return;
                      } else {
                        this.setState({
                          imageName: "",
                          fileAdded: false,
                          fileUpload: [],
                        });
                      }
                    }}
                    accept="image/*"
                    maxFiles={1}
                    multiple={false}
                    getUploadParams={getUploadParams}
                    onChangeStatus={handleChangeStatus}
                    onSubmit={handleSubmit}
                  >
                    {({
                      getRootProps,
                      getInputProps,
                      isDragActive,
                      isDragAccept,
                      isDragReject,
                    }) => (
                      <section>
                        <div
                          {...getRootProps({
                            className: "dropzone",
                          })}
                          style={{
                            background: "#f0f0f0",
                            padding: "20px",
                            margin: "5px ",
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
                            width: "100px",
                            height: "100px",
                            color: isDragActive
                              ? isDragReject
                                ? "#a31702"
                                : "#507500"
                              : "#828282",
                            fontWeight: "bold",
                          }}
                        >
                          <input {...getInputProps()} />
                          <div>
                            <br />
                            {this.state.fileAdded ? (
                              <div>{this.state.imageName}</div>
                            ) : (
                              <div>
                                {!isDragActive && "Drop a file"}
                                {isDragActive &&
                                  !isDragReject &&
                                  "Drop the file here ..."}
                              </div>
                            )}
                          </div>
                        </div>
                      </section>
                    )}
                  </Dropzone>
                </div>
                {this.state.fileAdded && (
                  <div style={{ float: "right" }}>
                    <Button
                      size="sm"
                      theme="light"
                      className="mb-2 mr-1"
                      onClick={() => {
                        this.removeFile();
                      }}
                    >
                      <span className="text-danger">
                        <i className="material-icons">clear</i>
                      </span>{" "}
                      Remove file
                    </Button>
                  </div>
                )}
                {this.state.fileAdded ? (
                  <Button
                    type="button"
                    theme="success"
                    onClick={this.onFileUpload}
                  >
                    Upload Profile Photo
                  </Button>
                ) : (
                  <div>Please drop the photo into the box</div>
                )}
                <button
                  type="button"
                  className="btn btn-primary mr-1"
                  onClick={() => this.modalClose()}
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </ModalBody>
          </Modal>
        </div>
      </Card>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountPageProfile);
