// react
import React, { Component, useState, useEffect } from "react";

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
} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import axios from "axios";
import "./AccountPageProfile.css";
import moment from 'moment';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import PageChangeContact from "./AccountPageChangeContact.jsx";
import LoginComponent from "../../pages/login/login.component";


import { isContactValid, isEmailValid, isStringNullOrEmpty } from "../../Utilities/UtilRepo"

function mapStateToProps(state) {
  return {
    currentUser: state.counterReducer["currentUser"],
    countrylist: state.counterReducer["countries"],
    updatedCurrentUser: state.counterReducer["updatedCurrentUser"],
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
      USERID: localStorage.getItem("isLogin") === false ? 0 : localStorage.getItem("id"),
      USERFIRSTNAME: "",
      USERLASTNAME: "",
      USERCONTACTNO: "",
      USERDATEBIRTH: "",
      USEREMAIL: "",
      USERGENDER: "",
      open: false,
      open1: false,
      showBoxForImage: false,
      fileAdded: false,
      file: "",
      fileInfo: "",
      url: "",
      imageFile: null,
      imageName: null,
      preview: null,

      editContact: false,
      editEmail: false,
      validfirstName: false,
      validlastName: false,
      validDOB: false,
      validGender: false,
      validContact: false,
      validEmail: false,
      TYPE: "UserProfile",
      TYPEVALUE: localStorage.getItem("isLogin") === false ? 0 : localStorage.getItem("id"),
      USERROLEID: "0",
      LISTPERPAGE: "999",
      PAGE: "1",
      width: window.innerWidth
    };
  }
  /////////////////////UPLOAD PROFILE PHOTO/////////////////////////////////////////////////


  componentDidMount() {

    window.addEventListener("resize", this.updateDimensions);

    if (this.state.USERID !== undefined && this.state.USERID !== null && this.state.TYPEVALUE !== undefined) {
      this.props.CallUserProfile(this.state);
      this.props.CallCountry();
      if (this.props.currentUser !== {} && this.props.currentUser !== null) {
        let userDetails = this.props.currentUser[0];
        if (userDetails !== undefined) {
          this.setState({
            USERFIRSTNAME: userDetails.FirstName !== undefined && userDetails.FirstName !== null ? userDetails.FirstName : "-",
            USERLASTNAME: userDetails.LastName !== undefined && userDetails.LastName !== null ? userDetails.LastName : "-",
            USERCONTACTNO: userDetails.UserContactNo !== undefined && userDetails.UserContactNo !== null ? userDetails.UserContactNo : "-",
            USERDATEBIRTH: userDetails.UserDOB !== undefined && userDetails.UserDOB !== null ? userDetails.UserDOB : moment(new Date).format("YYYYMMDD"),
            USEREMAIL: userDetails.UserEmailAddress !== undefined && userDetails.UserEmailAddress !== null ? userDetails.UserEmailAddress : "-",
            USERGENDER: userDetails.UserGender !== undefined && userDetails.UserGender !== null ? userDetails.UserGender : "-",
            validfirstName: userDetails.FirstName !== undefined && userDetails.FirstName !== null ? true : false,
            validlastName: userDetails.LastName !== undefined && userDetails.LastName !== null ? true : false,
            validDOB: userDetails.UserDOB !== undefined && userDetails.UserDOB !== null ? true : false,
            validGender: userDetails.UserGender !== undefined && userDetails.UserGender !== null ? true : false,
            validContact: userDetails.UserContactNo !== undefined && userDetails.UserContactNo !== null ? true : false,
            validEmail: userDetails.UserEmailAddress !== undefined && userDetails.UserEmailAddress !== null ? true : false,
          })
        }
      }
    } else {
      this.props.history.push("/login")
      // this.props.history.push("/login");
      // window.location.reload(false);
    }

  }

  getDate = (d) => {

      const dob_Date = d && Number(d.replace(/\D/g, ""))
      
      const convertDate = new Date(dob_Date)

      return moment(convertDate).format('YYYY-MM-DD')
  }

  setCurrentUser_Details = (userDetails) => {
    this.setState({
      USERFIRSTNAME: userDetails.FirstName !== undefined && userDetails.FirstName !== null ? userDetails.FirstName : "-",
      USERLASTNAME: userDetails.LastName !== undefined && userDetails.LastName !== null ? userDetails.LastName : "-",
      USERCONTACTNO: userDetails.UserContactNo !== undefined && userDetails.UserContactNo !== null ? userDetails.UserContactNo : "-",
      USERDATEBIRTH: userDetails.UserDOB !== undefined && userDetails.UserDOB !== null ? this.getDate(userDetails.UserDOB) : moment(new Date).format("YYYYMMDD"),
      USEREMAIL: userDetails.UserEmailAddress !== undefined && userDetails.UserEmailAddress !== null ? userDetails.UserEmailAddress : "-",
      USERGENDER: userDetails.UserGender !== undefined && userDetails.UserGender !== null ? userDetails.UserGender : "-",
      validfirstName: userDetails.FirstName !== undefined && userDetails.FirstName !== null ? true : false,
      validlastName: userDetails.LastName !== undefined && userDetails.LastName !== null ? true : false,
      validDOB: userDetails.UserDOB !== undefined && userDetails.UserDOB !== null ? true : false,
      validGender: userDetails.UserGender !== undefined && userDetails.UserGender !== null ? true : false,
      validContact: userDetails.UserContactNo !== undefined && userDetails.UserContactNo !== null ? true : false,
      validEmail: userDetails.UserEmailAddress !== undefined && userDetails.UserEmailAddress !== null ? true : false,
      preview: userDetails.UserProfileImage !== undefined && userDetails.UserProfileImage !== null ? userDetails.UserProfileImage : "-"
    })
  }

  componentDidUpdate(prevProps, prevState) {

    if (prevProps.currentUser !== this.props.currentUser) {
        this.setCurrentUser_Details(this.props.currentUser[0])
      if (this.props.currentUser.length > 0 && this.props.currentUser[0].ReturnMsg === "Image had uploaded" && this.state.showBoxForImage === true)
        this.modalClose()
    }

    //solve data missing on refresh
    if (this.state.USERID !== undefined && this.state.USERID !== null && this.state.TYPEVALUE !== undefined && this.state.USERGENDER === "") {
      if (this.props.currentUser !== {} && this.props.currentUser !== null) {
        let userDetails = this.props.currentUser[0];
        if (userDetails !== undefined) {
          this.setCurrentUser_Details(this.props.currentUser[0])
        }
      }
    }

  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions = () => {
    this.setState({ width: window.innerWidth })
  }

  onFileUpload = () => {
    const formData = new FormData();

    let fileExt = this.state.imageFile.length > 0 ? this.state.imageFile.map((imagedetails) =>
        imagedetails.name.split('.').pop()): null;
    let imageName = new Date().valueOf() ;
    let targetFolder = "userProfile" ;
    let upload = this.state.imageFile[0]

    formData.append("ID", this.state.USERID);
    formData.append("targetFolder", targetFolder);
    formData.append("projectDomain", localStorage.getItem("projectDomain"));
    formData.append("upload[]", upload );
    formData.append("imageName[]", imageName);

    let uploadImageURL = 'https://CMS.myemporia.my/eCommerceCMSImage/uploadImages.php'

    const fileData = {
      USERID: this.state.USERID,
      TYPE:'PROFILEIMAGE',
      USERPROFILEIMAGE: imageName+ "." + fileExt
    }

    axios
      .post(
        uploadImageURL,
        formData,
        {}
      )
      .then((res) => {
        if (res.status === 200) {
          this.props.CallUpdateProfileImage(fileData);
        }
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
      this.setState({
        validGender: false,
      });
    }
  };

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
      this.setState({
        validEmail: false,
      });
    }
  };

  handleChangeforDOB = (e) => {
    const { value } = e.target;

    if (value !== null) {
      this.setState({
        USERDATEBIRTH: value, 
        validDOB: true,
      });

    } else {
      this.setState({
        validDOB: false,
      });
    }
  };

  /////////////////CALL API TO UPDATE PROFILE INFO///////////////////////////////////////////
  updateProfile() {

    const updatedData = {
      USERID: this.state.USERID,
      USERFIRSTNAME: this.state.USERFIRSTNAME === "" ? "-" : this.state.USERFIRSTNAME,
      USERLASTNAME: this.state.USERLASTNAME === "" ? "-" : this.state.USERLASTNAME,
      USERCONTACTNO: this.state.USERCONTACTNO === "" ? "-" : this.state.USERCONTACTNO,
      USERDATEBIRTH: this.state.USERDATEBIRTH === "" ? "-" : moment(this.state.USERDATEBIRTH).format('YYYYMMDD'),
      USEREMAIL: this.state.USEREMAIL === "" ? "-" : this.state.USEREMAIL,
      USERGENDER: this.state.USERGENDER === "" ? "-" : this.state.USERGENDER,
      TYPE: "UserProfile",
      TYPEVALUE: localStorage.getItem("isLogin") === false ? 0 : localStorage.getItem("id"),
      USERROLEID: "0",
      LISTPERPAGE: "999",
      PAGE: "1"
    }

    this.props.CallUpdateUserProfile(updatedData);

    // this.props.CallUserProfile(this.state);
    // if (this.props.currentUser !== {} && this.props.currentUser !== null) {
    //   let userDetails = this.props.currentUser[0];
    //   if (userDetails !== undefined) {
    //     this.setState({
    //       USERFIRSTNAME: userDetails.FirstName !== undefined && userDetails.FirstName !== null ? userDetails.FirstName : "-",
    //       USERLASTNAME: userDetails.LastName !== undefined && userDetails.LastName !== null ? userDetails.LastName : "-",
    //       USERCONTACTNO: userDetails.UserContactNo !== undefined && userDetails.UserContactNo !== null ? userDetails.UserContactNo : "-",
    //       USERDATEBIRTH: userDetails.UserDOB !== undefined && userDetails.UserDOB !== null ? userDetails.UserDOB : moment(new Date).format("YYYYMMDD"),
    //       USEREMAIL: userDetails.UserEmailAddress !== undefined && userDetails.UserEmailAddress !== null ? userDetails.UserEmailAddress : "-",
    //       USERGENDER: userDetails.UserGender !== undefined && userDetails.UserGender !== null ? userDetails.UserGender : "-",
    //       validfirstName: userDetails.FirstName !== undefined && userDetails.FirstName !== null ? true : false,
    //       validlastName: userDetails.LastName !== undefined && userDetails.LastName !== null ? true : false,
    //       validDOB: userDetails.UserDOB !== undefined && userDetails.UserDOB !== null ? true : false,
    //       validGender: userDetails.UserGender !== undefined && userDetails.UserGender !== null ? true : false,
    //       validContact: userDetails.UserContactNo !== undefined && userDetails.UserContactNo !== null ? true : false,
    //       validEmail: userDetails.UserEmailAddress !== undefined && userDetails.UserEmailAddress !== null ? true : false,
    //     })
    //   }
    // }

  }


  render() {

    const getUploadParams = () => {
      return { url: "http://pmappapi.com/Memo/uploads/uploads/" };
    };

    const handleChangeStatus = ({ meta }, status) => {
      console.log(status, meta);
    };

    const handleSubmit = (files, allFiles) => {
      allFiles.forEach((f) => f.remove());
    };

    const censorContact = (str) => {
      return str[0] + str[1] + "*".repeat(str.length - 2) + str.slice(-2);
    };
    const censorWord = (str) => {
      return str[0] + "*".repeat(str.length - 2) + str.slice(-1);
    };

    const censorEmail = (email) => {
      if (email !== null && email.length > 5) {
        var arr = email.split("@");
        return censorWord(arr[0]) + "@" + arr[1];
      } else return "No email was found";
    };

   

    return (

      <Card>
        {
          this.state.width >= 768 ?
            <>
              <CardContent>
                <div className="row">
                  <div className="col-6">
                    <div
                      style={{
                        textAlign: "left",
                        fontWeight: 800
                      }}
                    >
                      My Profile
                    </div>

                    <div className="font font-subtitle">
                      Manage your personal information
                    </div>
                  </div>
                  <div className="col-6" style={{ textAlign: "right" }}>
                    <button
                      variant="contained"
                      className="btn btn-primary"
                      onClick={() => this.updateProfile()}
                    >
                      <DoneIcon className="saveicon" />
                      Save
                    </button>
                  </div>
                </div>
                <Divider variant="fullWidth" className="dividerbottom" />

                <div className="row">
                  <div className="container col-8">
                    {this.props.currentUser && this.props.currentUser.length > 0 && this.props.currentUser !== null &&
                      this.props.currentUser.map((row) => (
                        <div className="container">
                          <div className="row" >
                            <div className="col-3 rowStyle vertical-align">First Name</div>
                            <div className="col-8 ">
                              <TextField
                                className="font"
                                variant="outlined"
                                size="small"
                                id="userfirstname"
                                value={this.state.USERFIRSTNAME}
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
                                // value={moment(row.UserDOB).format('YYYY-MM-DD')}
                                value={this.state.USERDATEBIRTH}
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
                              <>
               
                                {row.UserContactNo !== null && row.UserContactNo !== undefined && row.UserContactNo !== "-" ? censorContact(row.UserContactNo) : "-"}
                                <Link to={{ pathname: "/account/changeContact" }}>
                                  <div className="change-contact-mail" >Change Contact</div>
                                </Link>
                              </>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-3 rowStyle">Email Address</div>
                            <div className="col-8 font">
                              <>
                                {row.UserEmailAddress !== null && row.UserEmailAddress !== undefined ? censorEmail(row.UserEmailAddress) : "-"}
                                <Link to="/account/changeEmail">
                                  <div className="change-contact-mail" onClick={() => this.setState({ editEmail: true })}>Change Email</div>
                                </Link>
                              </>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="col-4 border-line-left">
                    <div onClick={() => this.modalOpen()} className="imagecontainer">
                      <img
                        className="profilePic"
                        src={this.state.preview !== null && this.state.preview !== undefined ? this.state.preview: 'https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg'}
                        alt="Profile"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg";
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
                                preview: acceptedFiles.map(file => URL.createObjectURL(file)),
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
                                className="preview-container"
                                style={{
                                  borderColor: isDragActive
                                    ? isDragReject
                                      ? "#fc5447"
                                      : "#a0d100"
                                    : "#b8b8b8",
                                  color: isDragActive
                                    ? isDragReject
                                      ? "#a31702"
                                      : "#507500"
                                    : "#828282",
                                }}
                              >
                                <input {...getInputProps()} />
                                {this.state.fileAdded ? (
                                  <div className="droppedFileImage">
                                    <img className="profilePic" src={this.state.preview} alt={this.state.imageName} />
                                  </div>
                                ) : (
                                  <div className="preview-word">
                                    {!isDragActive && "Drop a file"}
                                    {isDragActive &&
                                      !isDragReject &&
                                      "Drop the file here ..."}
                                  </div>
                                )}
                              </div>
                            </section>
                          )}
                        </Dropzone>
                      </div>
                      <div className="row justify-content-center">
                        <div className="col-6">
                          {this.state.fileAdded && (
                            <div >
                              <button
                                className="button-font mb-2 mr-1 btn btn-primary"
                                size="sm"
                                theme="light"
                                onClick={() => {
                                  this.removeFile();
                                }}
                              >
                                <CloseIcon />
                                Remove file
                              </button>
                            </div>
                          )}
                        </div>

                        {this.state.fileAdded ? (
                          <div className="col-6">
                            <button style={{ float: "left" }}
                              className="btn btn-primary button-font"
                              onClick={()=> this.onFileUpload()}
                            >
                              Upload Image
                            </button>
                          </div>
                        ) : (
                          <div className="justify-content-center contactrowStyle"><div>Click on the box to add or edit the photo</div></div>
                        )}

                      </div>
                    </div>
                  </ModalBody>
                </Modal>
              </div>
            </>
            :
            // Mobile View
            <>
              <CardContent>
                <div className="row">
                  <div className="col-6">
                    <div
                      style={{
                        textAlign: "left",
                        fontWeight: 800
                      }}
                    >
                      My Profile
                    </div>

                    <div className="font font-subtitle">
                      Manage your personal information
                    </div>
                  </div>
                  <div className="col-6" style={{ textAlign: "right" }}>
                    <button
                      variant="contained"
                      className="btn btn-primary"
                      onClick={() => this.updateProfile()}
                    >
                      <DoneIcon className="saveicon" />
                      Save
                    </button>
                  </div>
                </div>
                <div className="row">
                <div className="col-12 border-line-left">
                    <div onClick={() => this.modalOpen()} className="imagecontainer">
                      <img
                        className="profilePic"
                        src={this.state.preview !== null && this.state.preview !== undefined ? this.state.preview: 'https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg'}
                        alt="Profile"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg";
                        }}
                      />
                      <div className="overlay">Edit</div>
                    </div>
                    <div className="description"><br /> Click on the image above to edit profile picture</div>
                  </div>
                  <div className="container col-12">
                    {this.props.currentUser && this.props.currentUser.length > 0 && this.props.currentUser !== null &&
                      this.props.currentUser.map((row) => (
                        <div className="container">
                          <div className="row" >
                            <div className="mobileRowStyle vertical-align">First Name</div>
                              <TextField
                                className="font"
                                variant="outlined"
                                size="small"
                                id="userfirstname"
                                defaultValue={row.FirstName}
                                onChange={this.handleChangeforFirstName.bind(this)}
                              />
                          </div>
                          <div className="row">
                            <div className="mobileRowStyle vertical-align">Last Name</div>
                              <TextField
                                className="font"
                                variant="outlined"
                                size="small"
                                id="userlastname"
                                defaultValue={row.LastName}
                                onChange={this.handleChangeforLastName.bind(this)}
                              />
                          </div>

                          <div className="row">
                            <div className="mobileRowStyle vertical-align">Date of Birth</div>
                              <TextField
                                className="font"
                                variant="outlined"
                                size="small"
                                id="userdob"
                                type="date"
                                value={moment(row.USERDATEBIRTH).format('YYYY-MM-DD')}
                                onChange={this.handleChangeforDOB.bind(this)}
                              />
                          </div>

                          <div className="mt-3 mb-3">
                            <div className="mobileRowStyle">Gender</div>
                              <FormControl component="fieldset">
                                <RadioGroup
                                  aria-label="USERGENDER"
                                  name="USERGENDER"
                                  defaultValue={row.UserGender}
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
                          <div className="row">
                            <div className="mobileRowStyle">Contact Number</div>
                            <div className="font">
                              <>
                                {row.UserContactNo !== null && row.UserContactNo !== undefined && row.UserContactNo !== "-" ? censorContact(row.UserContactNo) : "-"}
                                <Link to={{ pathname: "/account/changeContact" }}>
                                  <div className="change-contact-mail" >Change Contact</div>
                                </Link>
                              </>
                              </div>
                          </div>
                          <div className="row">
                            <div className="mobileRowStyle">Email Address</div>
                            <div className="font">
                              <>
                                {row.UserEmailAddress !== null && row.UserEmailAddress !== undefined ? censorEmail(row.UserEmailAddress) : "-"}
                                <Link to="/account/changeEmail">
                                  <div className="change-contact-mail" onClick={() => this.setState({ editEmail: true })}>Change Email</div>
                                </Link>
                              </>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </CardContent>

            </>
        }

      </Card>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountPageProfile);
