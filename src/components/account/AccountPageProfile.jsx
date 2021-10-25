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
import { browserHistory } from "react-router";

function mapStateToProps(state) {
  return {
    currentUser: state.counterReducer["currentUser"],
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
      PAGE: "1"
    };
  }
  /////////////////////UPLOAD PROFILE PHOTO/////////////////////////////////////////////////


  componentDidMount() {

    if (this.state.USERID !== undefined && this.state.USERID !== null && this.state.TYPEVALUE !== undefined) {
      this.props.CallUserProfile(this.state);
      this.props.CallCountry();
      if (this.props.currentUser !== null) {
        let userDetails = this.props.currentUser[0];
        if (userDetails !== undefined) {
          this.setState({
            USERFIRSTNAME: userDetails.FirstName !== undefined ? userDetails.FirstName : "-",
            USERLASTNAME: userDetails.LastName !== undefined ? userDetails.LastName : "-",
            USERCONTACTNO: userDetails.UserContactNo !== undefined ? userDetails.UserContactNo : "-",
            USERDATEBIRTH: userDetails.UserDOB !== undefined ? userDetails.UserDOB : moment(new Date).format("YYYYMMDD"),
            USEREMAIL: userDetails.UserEmailAddress !== undefined ? userDetails.UserEmailAddress : "-",
            USERGENDER: userDetails.UserGender !== undefined ? userDetails.UserGender : "-",
            validfirstName: userDetails.FirstName !== undefined ? true : false,
            validlastName: userDetails.LastName !== undefined ? true : false,
            validDOB: userDetails.UserDOB !== undefined ? true : false,
            validGender: userDetails.UserGender !== undefined ? true : false,
            validContact: userDetails.UserContactNo !== undefined ? true : false,
            validEmail: userDetails.UserEmailAddress !== undefined ? true : false,
          })
        }
      }
    } else {
      browserHistory.push("Emporia/login");
      window.location.reload(false);
    }

  }
  onFileUpload = () => {
    const formData = new FormData();

    let imageName = new Date().valueOf();
    let fileExt = this.state.imageFile.map((imagedetails) =>
      imagedetails.name.split('.').pop());

    let FullImageName = JSON.stringify(imageName) + "." + fileExt;
    formData.append("imageFile", this.state.imageFile[0]);
    formData.append("imageName", imageName);

    let file = {
      USERID: window.localStorage.getItem("id"),
      USERPROFILEIMAGE: FullImageName,
      TYPE: "PROFILEIMAGE",
    };
    axios
      .post(
        "http://tourism.denoo.my/emporiaimage/uploaduserprofilepicture.php",
        formData,
        {}
      )
      .then((res) => {
        if (res.status === 200) {
          this.props.CallUpdateProfileImage(file);
          this.props.CallUserProfile(this.state);
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
        USERDATEBIRTH: moment(value).format("YYYYMMDD"),
        validDOB: true,
      });

    } else {
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
    const imgurl = "http://tourism.denoo.my/emporiaimage/userprofile/"

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
      return str[0] + str[1] + "*".repeat(str.length - 2) + str.slice(-2);
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
                onClick={() => this.addProfile()}
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
                          {row.UserContactNo !== null && row.UserContactNo !== undefined ? censorContact(row.UserContactNo) : "-"}
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
                          {row.UserEmailAddress !== null && row.UserEmailAddress !== undefined ? censorEmail(row.UserEmailAddress) : "-"}
                          <Link to="/account/changeEmail">
                            <div className="change-contact-mail" onClick={() => this.setState({ editEmail: true })}>Change Email</div>
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
              <div onClick={() => this.modalOpen()} className="imagecontainer">
                <img
                  className="profilePic"
                  src={this.props.currentUser !== undefined &&
                    this.props.currentUser.length > 0 &&
                    this.props.currentUser[0].UserProfileImage !== null &&
                    this.props.currentUser[0].UserProfileImage !== undefined
                    ? imgurl + this.props.currentUser[0].UserProfileImage : "https://img-cdn.tid.al/o/4858a4b2723b7d0c7d05584ff57701f7b0c54ce3.jpg"}

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
                        onClick={this.onFileUpload}
                      >
                        Upload Image
                      </button>
                    </div>
                  ) : (
                    <div className="justify-content-center contactrowStyle"><div>Click on the box to add or edit the photo</div></div>
                  )}

                </div>
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
