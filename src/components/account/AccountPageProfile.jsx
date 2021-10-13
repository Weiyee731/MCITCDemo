// react
import React, { Component } from "react";

// third-party
import { Modal, ModalBody } from "reactstrap";

// data stubs
import Dropzone from "react-dropzone";
import { connect } from "react-redux";
import { GitAction } from "../../store/action/gitAction";
import { Link } from 'react-router-dom';

import "./AccountPageProfile.component.css";
import {
  Card,
  Divider,
} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import "./AccountPageProfile.css";
import moment from 'moment';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import PageChangeContact from "./AccountPageChangeContact.jsx";
import LoginComponent from "../../pages/login/login.component";

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

      editContact: false,
      editEmail: false,
      validfirstName: false,
      validlastName: false,
      validDOB: false,
      validGender: false,
      validContact: false,
      validEmail: false,

      TYPE: "UserProfile",
      TYPEVALUE: window.localStorage.getItem("id"),
      USERROLEID: "0",
      LISTPERPAGE: "999",
      PAGE: "1"
    };
  }
  /////////////////////UPLOAD PROFILE PHOTO/////////////////////////////////////////////////


  componentDidMount() {
    if (this.state.USERID && this.state.USERID.length > 0 && this.state.USERID !== undefined) {
      this.props.CallUserProfile(this.state);
      this.props.CallCountry();
      console.log()
      if (this.props.userprofiledata !== null) {
        let userDetails = this.props.userprofiledata[0];
        console.log(userDetails)
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

          validfirstName: userDetails.FirstName !== null ? true : false,
          validlastName: userDetails.LastName !== null ? true : false,
          validDOB: userDetails.UserDOB !== null ? true : false,
          validGender: userDetails.UserGender !== null ? true : false,
          validContact: userDetails.UserContactNo !== null ? true : false,
          validEmail: userDetails.UserEmailAddress !== null ? true : false,
        })
      }
    } else { }
    // { <LoginComponent/>}
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
      this.setState({
        validfirstName: false,
      });
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
      this.setState({
        validlastName: false,
      });
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
      this.setState({
        validGender: false,
      });
    }
  };

  // handleChangeforDOB = (e) => {
  //   const { value } = e.target;
  //   console.log("moment(date).format('YYYYMMDD')", moment(value).format("YYYYMMDD"))

  //   if (value !== null) {
  //     this.setState({
  //       USERDATEBIRTH: value,
  //       validDOB: true,
  //     });
  //   } else {
  //     console.log(" dob null");
  //   }
  // };

  handleChangeforContact = (e) => {
    const { value } = e.target;

    if (value !== null && !isNaN(value) && value.length > 0) {
      this.setState({
        USERCONTACTNO: value,
        validContact: true,
      });
    } else {
      this.setState({
        validContact: false,
      });
    }
  };

  handleChangeforEmail = (e) => {
    const { value } = e.target;

    if (value !== null && value.includes('@') && value.length > 0) {
      this.setState({
        USEREMAIL: value,
        validEmail: true,
      });
    } else {
      console.log(" email null");
      this.setState({
        validEmail: false,
      });
    }
  };

  handleChangeforDOB = (e) => {
    const { value } = e.target;

    if (value !== null) {
      this.setState({
        USERDATEBIRTH: moment(value).format("YYYYMMDD"),
        validDOB: true,
      });

    } else {
      console.log("dob null");
      this.setState({
        validDOB: false,
      });
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
            <div className="col-6">
              <h5
                style={{
                  textAlign: "left"
                }}
              >
                My Profile
              </h5>

              <div className="font font-subtitle">
                Manage your personal information
              </div>
            </div>
            <div className="col-6" style={{ textAlign: "right" }}>
              <button
                variant="contained"
                className="btn btn-primary"
                onClick={() => this.addProfile()}
              >
                <DoneIcon className="saveicon" />
                Save
              </button>
            </div>
          </div>
          <Divider variant="fullWidth" className="dividerbottom" />

          {/* profile image */}
          <div className="row">
            <div className="container col-8">
              {this.props.userprofiledata && this.props.userprofiledata.length > 0 && this.props.userprofiledata !== null &&
                this.props.userprofiledata.map((row) => (
                  <div className="container">
                    <div className="row" >
                      <div className="col-3 rowStyle vertical-align">First Name</div>
                      <div className="col-8 ">
                        <TextField
                          className="font"
                          variant="outlined"
                          size="small"
                          id="userfirstname"
                          defaultValue={row.FirstName}
                          onChange={this.handleChangeforFirstName.bind(this)}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-3 rowStyle vertical-align">Last Name</div>
                      <div className="col-8">
                        <TextField
                          className="font"
                          variant="outlined"
                          size="small"
                          id="userlastname"
                          defaultValue={row.LastName}
                          onChange={this.handleChangeforLastName.bind(this)}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className=" col-3 rowStyle vertical-align">Date of Birth</div>
                      <div className="col-8">
                        <TextField
                          className="font"
                          variant="outlined"
                          size="small"
                          id="userdob"
                          type="date"
                          value={moment(this.state.USERDATEBIRTH).format('YYYY-MM-DD')}
                          onChange={this.handleChangeforDOB.bind(this)}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-3 rowStyle">Gender</div>
                      <div className="col-8">
                        <FormControl component="fieldset">
                          <RadioGroup
                            aria-label="USERGENDER"
                            name="USERGENDER"
                            defaultValue={row.UserGender}
                            value={this.state.USERGENDER}
                            onChange={this.handleChangeforGender}
                          >
                            <FormControlLabel
                              className=" MuiTypography-body1 "
                              value="Male"
                              control={<Radio />}
                              label="Male"
                            />
                            <FormControlLabel
                              className=" MuiTypography-body1"
                              value="Female"
                              control={<Radio />}
                              label="Female"
                            />
                            <FormControlLabel
                              className=" MuiTypography-body1"
                              value="RatherNotToSay"
                              control={<Radio />}
                              label="Rather Not To Say"
                            />
                          </RadioGroup>
                        </FormControl>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-3 rowStyle">Contact Number</div>
                      <div className="col-8 font">
                        {/* {
                        this.state.editContact === false ? */}
                        <>
                          {row.UserContactNo !== null ? censorContact(row.UserContactNo) : "-"}
                          <Link to={{ pathname: "/account/changeContact" }}>
                            {/* <Link to="/account/changeContact" > */}
                            <div className="change-contact-mail" >Change Contact</div>
                          </Link>
                        </>
                        {/* :
                          <input
                            variant="outlined"
                            size="small"
                            id="usercontact"
                            type="text"
                            pattern="[\d| ]{16,22}"
                            defaultValue={row.UserContactNo}
                            onChange={this.handleChangeforContact.bind(this)}
                          />
                      } */}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-3 rowStyle">Email Address</div>
                      <div className="col-8 font">
                        {/* {
                        this.state.editEmail === false ? */}
                        <>
                          {row.UserEmailAddress !== null ? censorEmail(row.UserEmailAddress) : "-"}
                          <Link to="/account/changeContact">
                            <div className="change-contact-mail" onClick={() => this.setState({ editContact: true })}>Change Email</div>
                          </Link>
                        </>
                        {/* :
                          <PageChangeEmail />
                        // <input
                        //   variant="outlined"
                        //   size="small"
                        //   id="useremail"
                        //   type="text"
                        //   defaultValue={row.UserEmailAddress}
                        //   onChange={this.handleChangeforEmail.bind(this)}
                        // />
                      } */}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className="col-4 border-line">

              <div onClick={() => this.modalOpen()} className=" imagecontainer">
                <img
                  className="profilePic"
                  src={JSON.stringify(
                    this.props.userprofiledata.map((i) => i.UserProfileImage)
                  )}
                  alt="Profile"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://img-cdn.tid.al/o/4858a4b2723b7d0c7d05584ff57701f7b0c54ce3.jpg";
                  }}
                />
                <div className="overlay">Edit</div>
              </div>
              <div className="description"><br /> Click on the image above to edit profile picture</div>
            </div>
          </div>
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
              <CloseIcon
                className="closeIcon"
                onClick={() => this.modalClose()}
                data-dismiss="modal" />
              <div
                align="center"
                className="form-content p-2"
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
                            {this.state.fileAdded ? (
                              <div className="droppedFileName">{this.state.imageName}</div>
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
                  <div >
                    <button
                      size="sm"
                      theme="light"
                      className="mb-2 mr-1 btn btn-primary"
                      onClick={() => {
                        this.removeFile();
                      }}
                    >
                      <CloseIcon />
                      Remove file
                    </button>
                  </div>
                )}
                {this.state.fileAdded ? (
                  // <button style={{ float: "left" }}
                  //   className="btn btn-primary"
                  //   onClick={this.onFileUpload}
                  // >
                  //   Upload Profile Photo
                  // </button>
                  <div>Click on the box to change the photo</div>
                ) : (
                  <div>Please drop the photo into the box</div>
                )}
                {/* <button
                  type="button"
                  className="btn btn-primary mr-1"
                  onClick={() => this.modalClose()}
                  data-dismiss="modal"
                >
                  Close
                </button> */}
              </div>
            </ModalBody>
          </Modal>
        </div>
      </Card>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountPageProfile);
