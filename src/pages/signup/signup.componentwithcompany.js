import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
// import { Button, Card } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { GitAction } from "../../store/action/gitAction";
import CompanyDetailForm from "../signup/companyDetailForm";
import RepresentativeForm from "../signup/companyRepresentativeForm";
import React, { useState, useEffect, Component } from "react";
// import PhoneInput, {
//   formatPhoneNumber,
//   formatPhoneNumberIntl,
//   isValidPhoneNumber,
//   isPossiblePhoneNumber,
// } from "react-phone-number-input";
import { toast } from "react-toastify";
import {
  CountryDropdown,
  // RegionDropdown,
  // CountryRegionData,
} from "react-country-region-selector";
import Dropzone from "react-dropzone";
import { combineAll } from "rxjs/operator/combineAll";

function mapStateToProps(state) {
  return {
    currentUser: state.counterReducer["currentUser"],
    exist: state.counterReducer["exists"],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    registerSuplier: (credentials) =>
      dispatch(GitAction.CallSupplierRegister(credentials)),
    checkUser: (credentials) =>
      dispatch(GitAction.CallCheckUserExists(credentials)),
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2} style={{ minHeight: "500px" }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const SignUp = (props) => {
  const [currentForm, setCurrentForm] = useState(1);
  const [companyDetail, setCompanyDetail] = useState({
    supplierName: "",
    supplierAddress1: "",
    supplierAddress2: "",
    supplierCity: "",
    supplierState: "",
    supplierPostal: "",
    supplierCountry: "",
    supplierCountryCode: "",
    supplierContact: "",
    supplierWebsite: "",
    repFirstName: "",
    repLastName: "",
    repUsername: "",
    repDOB: "",
    repContact: "",
    repEmail: "",
    repPassword: "",
    repConfirmPassword: "",
    repAddress1: "",
    repAddress2: "",
    repCity: "",
    repState: "",
    repPostal: "",
    repCountry: "",
    form1NotComplete: true,
    form2NotComplete: true,
    formsNotComplete: true,
    repPhoneNumberNotValid: false,
    supplierPhoneNumberNotValid: false,
    notEnoughFiles: false,
    submittingCounter: 0,
  });

  const [repFirstNameEmpty, setRepFirstNameEmpty] = useState(false);
  const [repLastNameEmpty, setRepLastNameEmpty] = useState(false);
  const [repUsernameEmpty, setRepUsernameEmpty] = useState(false);
  const [repDOBEmpty, setRepDOBEmpty] = useState(false);
  const [repContactNumEmpty, setRepContactNumEmpty] = useState(false);
  const [repEmailEmpty, setRepEmailEmpty] = useState(false);
  const [repPasswordEmpty, setRepPasswordEmpty] = useState(false);
  const [repConfirmPasswordEmpty, setRepConfirmPasswordEmpty] = useState(false);
  const [companyNameEmpty, setCompanyNameEmpty] = useState(false);
  const [companyAddress1Empty, setCompanyAddress1Empty] = useState(false);
  const [companyAddress2Empty, setCompanyAddress2Empty] = useState(false);
  const [companyCityEmpty, setCompanyCityEmpty] = useState(false);
  const [companyStateEmpty, setCompanyStateEmpty] = useState(false);
  const [companyCountryEmpty, setCompanyCountryEmpty] = useState(false);
  const [companyWebsiteEmpty, setCompanyWebsiteEmpty] = useState(false);
  const [companyPostCodeEmpty, setCompanyPostCodeEmpty] = useState(false);
  const [companyContactNumEmpty, setCompanyContactNumEmpty] = useState(false);

  const [wrongZipCode, setWrongZipCode] = useState(false);
  const [passErrorMatch, setPassErrorMatch] = useState(false);
  const [passErrorWrongFormat, setPassWrongFormat] = useState(false);
  const [pass, setPass] = useState();
  const [confirmPass, setConfirmPass] = useState();
  const [wrongWebsiteFormat, setWrongWebsiteFormat] = useState(false);
  const [website, setWebsite] = useState();
  const [files, setFiles] = useState({
    file: [],
    fileInfo: [],
    url: [],
    counter: 0,
    counter2: 0,
    file2: [],
    fileInfo2: [],
    url2: [],
  });

  const checkFormIsFilled = () => {
    verifyWebsite();
    verifyZipCode();
    verifyPassFormat();
    verifyPass();
    checkFiles();

    // props.checkUser(companyDetail.repEmail);

    if (
      companyDetail.repPhoneNumberNotValid ||
      companyDetail.supplierPhoneNumberNotValid ||
      repFirstNameEmpty ||
      repLastNameEmpty ||
      repUsernameEmpty ||
      repDOBEmpty ||
      repContactNumEmpty ||
      repEmailEmpty ||
      repPasswordEmpty ||
      repConfirmPasswordEmpty ||
      companyNameEmpty ||
      companyAddress1Empty ||
      companyAddress2Empty ||
      companyCityEmpty ||
      companyStateEmpty ||
      companyCountryEmpty ||
      companyWebsiteEmpty ||
      companyPostCodeEmpty ||
      companyContactNumEmpty ||
      wrongZipCode ||
      wrongWebsiteFormat ||
      passErrorWrongFormat ||
      passErrorMatch ||
      companyDetail.notEnoughFiles
    ) {
      toast.error( "Please complete the form.");
    } else {
      toast.success( "Form Submitted!");
      submitForm();
    }
  };

  const [zipCode, setZipCode] = useState();
  useEffect(() => {
    const timeOutId = setTimeout(() => verifyZipCode(), 1000);
    return () => clearTimeout(timeOutId);
  }, [companyDetail.supplierPostal]);

  const verifyZipCode = () => {
    var reg = /(^\d{4,9}$)|(^\d{5}-\d{4}$)/;
    if (reg.test(zipCode)) {
      setWrongZipCode(false);
    } else {
      setWrongZipCode(true);
    }
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => verifyWebsite(), 1000);
    return () => clearTimeout(timeOutId);
  }, [companyDetail.supplierWebsite]);

  const verifyWebsite = () => {
    var reg = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

    if (reg.test(website)) {
      setWrongWebsiteFormat(false);
    } else {
      setWrongWebsiteFormat(true);
    }
  };

  const handleInputChange = (event) => {
    let files = event.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);

    reader.onload = (e) => {
      this.setState({
        selectedFile: e.target.result,
      });
    };
  };

  const { register, handleSubmit, watch, errors } = useForm();

  const labelStyle = {
    width: "100%",
  };

  const inputDataCompanyHandler = (value) => {
    setCompanyDetail(value);
  };

  const errorHandler = (value) => {
    setCompanyDetail(value);
  };

  const inputDataFilesHandler = (value) => {
    setFiles(value);
  };

  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [value1, setValue1] = useState(companyDetail.repContact);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const submitForm = () => {
    props.registerSuplier(companyDetail);
    // checkFormIsFilled();
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => checkFiles(), 1000);
    return () => clearTimeout(timeOutId);
  }, [files.file]);

  const checkFiles = () => {
    if (files.file.length < 1) {
      setCompanyDetail({
        ...companyDetail,
        notEnoughFiles: true,
      });
    } else {
      setCompanyDetail({
        ...companyDetail,
        notEnoughFiles: false,
      });
    }
  };
  const verifyPass = () => {
    if (pass === confirmPass) {
      setPassErrorMatch(false);
    } else {
      setPassErrorMatch(true);
    }
  };

  const verifyPassFormat = () => {
    var reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;
    if (reg.test(pass)) {
      setPassWrongFormat(false);
    } else {
      setPassWrongFormat(true);
    }
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => checkRepFirstName(), 1000);
    return () => clearTimeout(timeOutId);
  }, [companyDetail.repFirstName]);

  const checkRepFirstName = () => {
    if (
      companyDetail.repFirstName === "" ||
      companyDetail.repFirstName === null
    ) {
      setRepFirstNameEmpty(true);
    } else {
      setRepFirstNameEmpty(false);
    }
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => checkRepLastName(), 1000);
    return () => clearTimeout(timeOutId);
  }, [companyDetail.repLastName]);

  const checkRepLastName = () => {
    if (companyDetail.repLastName === "") {
      setRepLastNameEmpty(true);
    } else {
      setRepLastNameEmpty(false);
    }
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => checkRepUsername(), 1000);
    return () => clearTimeout(timeOutId);
  }, [companyDetail.repUsername]);

  const checkRepUsername = () => {
    if (companyDetail.repUsername === "") {
      setRepUsernameEmpty(true);
    } else {
      setRepUsernameEmpty(false);
    }
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => checkcompanyPostal(), 1000);
    return () => clearTimeout(timeOutId);
  }, [companyDetail.supplierPostal]);

  const checkcompanyPostal = () => {
    if (companyDetail.supplierPostal === "") {
      setCompanyPostCodeEmpty(true);
    } else {
      setCompanyPostCodeEmpty(false);
    }
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => checkRepDOB(), 1000);
    return () => clearTimeout(timeOutId);
  }, [companyDetail.repDOB]);

  const checkRepDOB = () => {
    if (companyDetail.repDOB === "") {
      setRepDOBEmpty(true);
    } else {
      setRepDOBEmpty(false);
    }
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => checkRepContactNum(), 1000);
    return () => clearTimeout(timeOutId);
  }, [companyDetail.repContact]);

  const checkRepContactNum = () => {
    if (companyDetail.repContact === "") {
      setRepContactNumEmpty(true);
    } else {
      setRepContactNumEmpty(false);
    }
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => checkCompanyContactNum(), 1000);
    return () => clearTimeout(timeOutId);
  }, [companyDetail.supplierContact]);

  const checkCompanyContactNum = () => {
    if (companyDetail.supplierContact === "") {
      setCompanyContactNumEmpty(true);
    } else {
      setCompanyContactNumEmpty(false);
    }
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => checkRepEmail(), 1000);
    return () => clearTimeout(timeOutId);
  }, [companyDetail.repEmail]);

  const checkRepEmail = () => {
    if (companyDetail.repEmail === "") {
      setRepEmailEmpty(true);
    } else {
      setRepEmailEmpty(false);
    }
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => checkRepPassword(), 1000);
    return () => clearTimeout(timeOutId);
  }, [companyDetail.repPassword]);

  const checkRepPassword = () => {
    if (pass === "" || pass === null) {
      setRepPasswordEmpty(true);
    } else {
      setRepPasswordEmpty(false);
    }
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => checkRepConfirmPassword(), 1000);
    return () => clearTimeout(timeOutId);
  }, [companyDetail.repConfirmPassword]);

  const checkRepConfirmPassword = () => {
    if (
      companyDetail.repConfirmPassword === "" ||
      companyDetail.repConfirmPassword === null
    ) {
      setRepConfirmPasswordEmpty(true);
    } else {
      setRepConfirmPasswordEmpty(false);
    }
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => checkCompanyName(), 1000);
    return () => clearTimeout(timeOutId);
  }, [companyDetail.supplierName]);

  const checkCompanyName = () => {
    if (companyDetail.supplierName === "") {
      setCompanyNameEmpty(true);
    } else {
      setCompanyNameEmpty(false);
    }
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => checkAddress1(), 1000);
    return () => clearTimeout(timeOutId);
  }, [companyDetail.supplierAddress1]);

  const checkAddress1 = () => {
    if (companyDetail.supplierAddress1 === "") {
      setCompanyAddress1Empty(true);
    } else {
      setCompanyAddress1Empty(false);
    }
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => checkAddress2(), 1000);
    return () => clearTimeout(timeOutId);
  }, [companyDetail.supplierAddress2]);

  const checkAddress2 = () => {
    if (companyDetail.supplierAddress2 === "") {
      setCompanyAddress2Empty(true);
    } else {
      setCompanyAddress2Empty(false);
    }
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => checkCompanyCity(), 1000);
    return () => clearTimeout(timeOutId);
  }, [companyDetail.supplierCity]);

  const checkCompanyCity = () => {
    if (companyDetail.supplierCity === "") {
      setCompanyCityEmpty(true);
    } else {
      setCompanyCityEmpty(false);
    }
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => checkCompanyState(), 1000);
    return () => clearTimeout(timeOutId);
  }, [companyDetail.supplierState]);

  const checkCompanyState = () => {
    if (companyDetail.supplierState === "") {
      setCompanyStateEmpty(true);
    } else {
      setCompanyStateEmpty(false);
    }
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => checkCompanyCountry(), 1000);
    return () => clearTimeout(timeOutId);
  }, [companyDetail.supplierCountry]);

  const checkCompanyCountry = () => {
    if (companyDetail.supplierCountry === "") {
      setCompanyCountryEmpty(true);
    } else {
      setCompanyCountryEmpty(false);
    }
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => checkCompanyWebsite(), 1000);
    return () => clearTimeout(timeOutId);
  }, [companyDetail.supplierWebsite]);

  const checkCompanyWebsite = () => {
    if (companyDetail.supplierWebsite === "") {
      setCompanyWebsiteEmpty(true);
    } else {
      setCompanyWebsiteEmpty(false);
    }
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => verifyPass(), 1000);
    return () => clearTimeout(timeOutId);
  }, [companyDetail.repPassword, companyDetail.repConfirmPassword]);

  useEffect(() => {
    const timeOutId = setTimeout(() => verifyPassFormat(), 1000);
    return () => clearTimeout(timeOutId);
  }, [companyDetail.repPassword]);

  const handleChangeData = (data, e) => {
    if (data === "fName") {
      setCompanyDetail({
        ...companyDetail,
        repFirstName: e.target.value,
      });
    } else if (data === "lName") {
      setCompanyDetail({
        ...companyDetail,
        repLastName: e.target.value,
      });
    } else if (data === "userName") {
      setCompanyDetail({
        ...companyDetail,
        repUsername: e.target.value,
      });
    } else if (data === "DOB") {
      setCompanyDetail({
        ...companyDetail,
        repDOB: e.target.value,
      });
    } else if (data === "contactNum") {
      setCompanyDetail({
        ...companyDetail,
        repContact: e.target.value,
      });
    } else if (data === "email") {
      setCompanyDetail({
        ...companyDetail,
        repEmail: e.target.value,
      });
    } else if (data === "password") {
      setCompanyDetail({
        ...companyDetail,
        repPassword: e.target.value,
      });
      setPass(e.target.value);
    } else if (data === "confirmPassword") {
      setCompanyDetail({
        ...companyDetail,
        repConfirmPassword: e.target.value,
      });
      setConfirmPass(e.target.value);
    } else if (data === "supplierName") {
      setCompanyDetail({
        ...companyDetail,
        supplierName: e.target.value,
      });
    } else if (data === "address1") {
      setCompanyDetail({
        ...companyDetail,
        supplierAddress1: e.target.value,
      });
    } else if (data === "address2") {
      setCompanyDetail({
        ...companyDetail,
        supplierAddress2: e.target.value,
      });
    } else if (data === "city") {
      setCompanyDetail({
        ...companyDetail,
        supplierCity: e.target.value,
      });
    } else if (data === "state") {
      setCompanyDetail({
        ...companyDetail,
        supplierState: e.target.value,
      });
    } else if (data === "zipCode") {
      setCompanyDetail({
        ...companyDetail,
        supplierPostal: e.target.value,
      });
      setZipCode(e.target.value);
    } else if (data === "country") {
      setCompanyDetail({
        ...companyDetail,
        supplierCountry: e.target.value,
      });
    } else if (data === "contactNumSupplier") {
      setCompanyDetail({
        ...companyDetail,
        supplierContact: value,
      });
    } else if (data === "website") {
      setCompanyDetail({
        ...companyDetail,
        supplierWebsite: e.target.value,
      });
      setWebsite(e.target.value);
    }
  };

  const handleDrop = (data, acceptedFiles) => {
    setFiles((state) => {
      const file = state.file.concat(acceptedFiles.map((file) => file));
      const fileInfo = state.fileInfo.concat(
        acceptedFiles.map((file) => file.name)
      );
      // const url = state.url.concat(
      //   acceptedFiles.map((file) => URL.createObjectURL(file))
      // );
      return {
        file,
        fileInfo,
        // url,
      };
    });
  };

  const addContactNum = () => {
    setCompanyDetail({
      repContact: value1,
    });
  };

  const onDelete = (index, data) => {
    var newList2 = files.file;
    files.file.map((file, i) => {
      var valueToBeUsed2 = parseInt(index);

      if (i === valueToBeUsed2) {
        newList2 = newList2.filter((file2) => file !== file2);
        setFiles({
          counter2: files.counter2 + 1,
        });
      }
    });
    setFiles({
      file: newList2.map((file3) => file3),
      fileInfo: newList2.map((file3) => file3.name),
      // url: newList2.map((file3) => URL.createObjectURL(file3)),
    });
  };

  function onSubmit(data) {}
  const changeBackground = (e) => {
    e.target.style.background = "#a31702";
    e.target.style.color = "#fff";
  };
  const changeBackground2 = (e) => {
    e.target.style.background = "#fff";
    e.target.style.color = "#a31702";
  };

  let existData = props.exist
    ? Object.keys(props.exist).map((key) => {
        return props.exist[key];
      })
    : {};
  if (existData.length > 0) {
    var checkDuplicate = existData.map((d, i) => {
      if (d.ReturnVal === 1) {
        return (
          <p style={{ color: "#e31e10", margin: "0px 0px 0px 10px" }}>
            Email already exists.
          </p>
        );
      }
    });
  }

  return (
    <div style={{ width: "100%" }}>
      <h1>Sign Up</h1>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Representative's Details" {...a11yProps(0)} />
          <Tab label="Company's Details" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
        <TabPanel value={value} index={0} dir={theme.direction}>
          <h2>Representative's Details</h2>

          <div
            style={{
              width: "100%",
              display: "flex",
              margin: "5px",
            }}
          >
            <label style={{ width: "100%" }}>First Name</label>
            <input
              style={{
                width: "100%",
                // borderColor: repFirstNameEmpty ? "#a31702" : null,
              }}
              name="repFirstName"
              value={companyDetail.repFirstName}
              ref={register({ required: true })}
              onChange={handleChangeData.bind(this, "fName")}
            />
          </div>
          {repFirstNameEmpty && (
            <p
              style={{
                color: "#a31702",
                margin: "0px 0px 0px 10px",
                textAlign: "right",
                fontSize: "12px",
              }}
            >
              This is required
            </p>
          )}
          <div style={{ width: "100%", display: "flex", margin: "5px" }}>
            <label style={{ width: "100%" }}>Last Name</label>
            <input
              style={{
                width: "100%",
                // borderColor: repLastNameEmpty ? "#a31702" : null,
              }}
              name="repLastName"
              value={companyDetail.repLastName}
              ref={register({ required: true })}
              //
              onChange={handleChangeData.bind(this, "lName")}
            />
          </div>
          {repLastNameEmpty && (
            <p
              style={{
                color: "#a31702",
                margin: "0px 0px 0px 10px",
                textAlign: "right",
                fontSize: "12px",
              }}
            >
              This is required
            </p>
          )}
          <div style={{ width: "100%", display: "flex", margin: "5px" }}>
            <label style={labelStyle}>Username</label>
            <input
              style={{
                width: "100%",
                // borderColor: repUsernameEmpty ? "#a31702" : null,
              }}
              name="repUsername"
              ref={register({ required: true })}
              value={companyDetail.repUsername}
              onChange={handleChangeData.bind(this, "userName")}
            />
          </div>

          {repUsernameEmpty && (
            <p
              style={{
                color: "#a31702",
                margin: "0px 0px 0px 10px",
                textAlign: "right",
                fontSize: "12px",
              }}
            >
              This is required
            </p>
          )}
          <div style={{ width: "100%", display: "flex", margin: "5px" }}>
            <label style={labelStyle}>Date of Birth</label>
            <input
              style={{
                width: "100%",
                // borderColor: repDOBEmpty ? "#a31702" : null,
              }}
              name="repDOB"
              value={companyDetail.repDOB}
              ref={register({ required: true })}
              type="date"
              onChange={handleChangeData.bind(this, "DOB")}
            />
          </div>
          {repDOBEmpty && (
            <p
              style={{
                color: "#a31702",
                margin: "0px 0px 0px 10px",
                textAlign: "right",
                fontSize: "12px",
              }}
            >
              This is required
            </p>
          )}

          <div style={{ width: "100%", display: "flex", margin: "5px" }}>
            <RepresentativeForm
              labelStyle={labelStyle}
              errors={errors}
              register={register}
              inputDataCompany={companyDetail}
              inputDataFiles={files}
              setInputDataCompany={inputDataCompanyHandler}
              setInputDataFiles={inputDataFilesHandler}
              errorsFoundMain={companyDetail}
              setErrorsFoundMain={errorHandler}
            />
          </div>
          {repContactNumEmpty && (
            <p
              style={{
                color: "#a31702",
                margin: "0px 0px 0px 10px",
                textAlign: "right",
                fontSize: "12px",
              }}
            >
              This is required
            </p>
          )}
          <div style={{ width: "100%", display: "flex", margin: "5px" }}>
            <label style={labelStyle}>Email</label>
            <input
              style={{
                width: "100%",
                // borderColor: repEmailEmpty ? "#a31702" : null,
              }}
              name="repEmail"
              value={companyDetail.repEmail}
              ref={register({ required: true })}
              type="email"
              onChange={handleChangeData.bind(this, "email")}
            />
          </div>
          {checkDuplicate && companyDetail.repEmail}
          {repEmailEmpty && (
            <p
              style={{
                color: "#a31702",
                margin: "0px 0px 0px 10px",
                textAlign: "right",
                fontSize: "12px",
              }}
            >
              This is required
            </p>
          )}
          <div style={{ width: "100%", display: "flex", margin: "5px" }}>
            <label style={labelStyle}>Password</label>
            <input
              style={{
                width: "100%",
                // borderColor:
                //   (passErrorMatch && confirmPass && pass) ||
                //   (passErrorWrongFormat && pass) ||
                // repPasswordEmpty
                //   ? "#a31702"
                //   : null,
              }}
              name="repPassword"
              ref={register({ required: true })}
              type="password"
              value={companyDetail.repPassword}
              onChange={handleChangeData.bind(this, "password")}
            />
          </div>
          {passErrorMatch && confirmPass && (
            <p
              style={{
                color: "#a31702",
                margin: "0px 0px 0px 10px",
                textAlign: "right",
                fontSize: "12px",
              }}
            >
              Passwords do not match.
            </p>
          )}
          {passErrorWrongFormat && pass && (
            <p
              style={{
                color: "#a31702",
                margin: "0px 0px 0px 10px",
                textAlign: "right",
                fontSize: "12px",
              }}
            >
              Password needs to contain at least 1 capital letter, 1 number and
              be at least 8 characters long.
            </p>
          )}
          {repPasswordEmpty && (
            <p
              style={{
                color: "#a31702",
                margin: "0px 0px 0px 10px",
                textAlign: "right",
                fontSize: "12px",
              }}
            >
              This is required
            </p>
          )}
          <div style={{ width: "100%", display: "flex", margin: "5px" }}>
            <label style={labelStyle}>Confirm Password</label>
            <input
              style={{
                width: "100%",
                // borderColor:
                //   (passErrorMatch && confirmPass && pass) ||
                //   repConfirmPasswordEmpty
                //     ? "#a31702"
                //     : null,
              }}
              name="repConfirmPassword"
              ref={register({ required: true })}
              type="password"
              label="Confirm Password" 
              value={companyDetail.repConfirmPassword}
              onChange={handleChangeData.bind(this, "confirmPassword")}
            />
          </div>
          {repConfirmPasswordEmpty && (
            <p
              style={{
                color: "#a31702",
                margin: "0px 0px 0px 10px",
                textAlign: "right",
                fontSize: "12px",
              }}
            >
              This is required
            </p>
          )}
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <h2>Company's Details</h2>
          <div style={{ width: "100%", display: "flex", margin: "5px" }}>
            <label style={labelStyle}>Company Name</label>
            <input
              style={{
                width: "100%",
                // borderColor: companyNameEmpty ? "#a31702" : null,
              }}
              value={companyDetail.supplierName}
              name="supplierName"
              ref={register({ required: true })}
              onChange={handleChangeData.bind(this, "supplierName")}
            />
          </div>
          {companyNameEmpty && (
            <p
              style={{
                color: "#a31702",
                margin: "0px 0px 0px 10px",
                textAlign: "right",
                fontSize: "12px",
              }}
            >
              This is required
            </p>
          )}
          <div style={{ width: "100%", display: "flex", margin: "5px" }}>
            <label style={labelStyle}>Address Line 1</label>
            <input
              style={{
                width: "100%",
                // borderColor: companyAddress1Empty ? "#a31702" : null,
              }}
              value={companyDetail.supplierAddress1}
              name="supplierAddress1"
              ref={register({ required: true })}
              onChange={handleChangeData.bind(this, "address1")}
            />
          </div>
          {companyAddress1Empty && (
            <p
              style={{
                color: "#a31702",
                margin: "0px 0px 0px 10px",
                textAlign: "right",
                fontSize: "12px",
              }}
            >
              This is required
            </p>
          )}
          <div style={{ width: "100%", display: "flex", margin: "5px" }}>
            <label style={labelStyle}>Address Line 2</label>
            <input
              style={{
                width: "100%",
                // borderColor: companyAddress2Empty ? "#a31702" : null,
              }}
              value={companyDetail.supplierAddress2}
              name="supplierAddress2"
              ref={register({ required: true })}
              onChange={handleChangeData.bind(this, "address2")}
            />
          </div>
          {companyAddress2Empty && (
            <p
              style={{
                color: "#a31702",
                margin: "0px 0px 0px 10px",
                textAlign: "right",
                fontSize: "12px",
              }}
            >
              This is required
            </p>
          )}
          <div
            style={{
              width: "100%",
              display: "flex",
              margin: "5px",
              justifyContent: "space-around",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "100%",
                flexDirection: "column",
              }}
            >
              <div style={{ display: "flex", width: "100%" }}>
                <label style={labelStyle}>City</label>
                <input
                  style={{
                    width: "100%",
                    // borderColor: companyCityEmpty ? "#a31702" : null,
                  }}
                  value={companyDetail.supplierCity}
                  name="supplierCity"
                  placeholder="City"
                  ref={register({ required: true })}
                  onChange={handleChangeData.bind(this, "city")}
                />
              </div>
              {companyCityEmpty && (
                <p
                  style={{
                    color: "#a31702",
                    margin: "0px 0px 0px 10px",
                    textAlign: "right",
                    fontSize: "12px",
                  }}
                >
                  This is required
                </p>
              )}
            </div>
            <br />
            <div
              style={{
                display: "flex",
                marginLeft: "5px",
                width: "100%",
                flexDirection: "column",
              }}
            >
              <div
                style={{ display: "flex", marginLeft: "5px", width: "100%" }}
              >
                <label style={labelStyle}>State</label>
                <input
                  style={{
                    width: "100%",
                    // borderColor: companyStateEmpty ? "#a31702" : null,
                  }}
                  value={companyDetail.supplierState}
                  name="supplierState"
                  placeholder="State"
                  ref={register({ required: true })}
                  onChange={handleChangeData.bind(this, "state")}
                />
              </div>
              {companyStateEmpty && (
                <p
                  style={{
                    color: "#a31702",
                    margin: "0px 0px 0px 10px",
                    textAlign: "right",
                    fontSize: "12px",
                  }}
                >
                  This is required
                </p>
              )}
            </div>
          </div>

          <div style={{ width: "100%", display: "flex", margin: "5px" }}>
            <label style={labelStyle}>Country</label>
            <CountryDropdown
              style={{
                padding: "1px",
                height: "30px",
                width: "100%",
                // borderColor: companyCountryEmpty ? "#a31702" : null,
              }}
              value={companyDetail.supplierCountry}
              onChange={(val) =>
                setCompanyDetail({
                  ...companyDetail,
                  supplierCountry: val,
                })
              }
            />
          </div>
          {companyCountryEmpty && (
            <p
              style={{
                color: "#a31702",
                margin: "0px 0px 0px 10px",
                textAlign: "right",
                fontSize: "12px",
              }}
            >
              This is required
            </p>
          )}
          <div style={{ width: "100%", display: "flex", margin: "5px" }}>
            <label style={labelStyle}>Postal Code</label>
            <input
              style={{
                width: "100%",
                // borderColor: companyPostCodeEmpty ? "#a31702" : null,
              }}
              value={companyDetail.supplierPostal}
              name="supplierPostal"
              placeholder="Postal/Zip code"
              ref={register({ required: true })}
              onChange={handleChangeData.bind(this, "zipCode")}
            />
          </div>
          {companyPostCodeEmpty && (
            <p
              style={{
                color: "#a31702",
                margin: "0px 0px 0px 10px",
                textAlign: "right",
                fontSize: "12px",
              }}
            >
              This is required
            </p>
          )}
          {wrongZipCode && zipCode && (
            <p
              style={{
                color: "#a31702",
                margin: "0px 0px 0px 10px",
                textAlign: "right",
                fontSize: "12px",
              }}
            >
              This zip code is invalid.
            </p>
          )}

          <div style={{ width: "100%", display: "flex", margin: "5px" }}>
            <CompanyDetailForm
              labelStyle={labelStyle}
              errors={errors}
              register={register}
              inputDataCompany={companyDetail}
              inputDataFiles={files}
              setInputDataCompany={inputDataCompanyHandler}
              setInputDataFiles={inputDataFilesHandler}
              errorsFoundMain={companyDetail}
              setErrorsFoundMain={errorHandler}
            />
          </div>
          {companyContactNumEmpty && (
            <p
              style={{
                color: "#a31702",
                margin: "0px 0px 0px 10px",
                textAlign: "right",
                fontSize: "12px",
              }}
            >
              This is required
            </p>
          )}
          <div style={{ width: "100%", display: "flex", margin: "5px" }}>
            <label style={labelStyle}>Website</label>
            <input
              style={{
                width: "100%",
                // borderColor: companyWebsiteEmpty ? "#a31702" : null,
              }}
              value={companyDetail.supplierWebsite}
              name="supplierWebsite"
              placeholder="Website"
              ref={register({ required: true })}
              onChange={handleChangeData.bind(this, "website")}
            />
          </div>

          {website && wrongWebsiteFormat && (
            <p
              style={{
                color: "#a31702",
                margin: "0px 0px 0px 10px",
                textAlign: "right",
                fontSize: "12px",
              }}
            >
              This website is invalid.
            </p>
          )}
          {/* {companyWebsiteEmpty && (
            <p
              style={{
                color: "#a31702",
                margin: "0px 0px 0px 10px",
                textAlign: "right",
                fontSize: "12px",
              }}
            >
              This is required.
            </p>
          )} */}
          <label style={labelStyle}>Company Files</label>
          <Dropzone
            onDrop={handleDrop.bind(this, "")}
            multiple
            accept=".pdf, .doc, .docx"
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
                      ? "The file needs to be a document"
                      : "Release to drop file"
                    : "Drag and drop your company files, or click to select files."}
                </p>
              </div>
            )}
          </Dropzone>
          <div>
            <br />
            <strong>Files:</strong>
            <ul>
              {files.fileInfo.map((fileName, i) => (
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
                      onMouseOver={changeBackground}
                      onMouseLeave={changeBackground2}
                      key={fileName}
                      onClick={() => onDelete(i, "")}
                    >
                      {" "}
                      Remove{" "}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {companyDetail.notEnoughFiles && (
            <p
              style={{
                color: "#a31702",
                margin: "0px 0px 0px 10px",
                fontSize: "14px",
              }}
            >
              There should be at least one file uploaded.
            </p>
          )}

          <p style={{ fontSize: "14px" }}>
            <strong>Disclaimer:</strong>
            All files uploaded will only be used for the purpose of verifying
            your company's status and will not be distributed, reproduced or
            used for any other purpose.
          </p>
        </TabPanel>
      </SwipeableViews>

      <div style={{ width: "%100", textAlign: "center" }}>
        <button
          value="Submit"
          style={{
            width: "60%",
            padding: "8px",
            borderRadius: "5px",
            borderColor: "#828282",
            fontWeight: "bold",
          }}
          onClick={checkFormIsFilled}
        >
          Submit
        </button>
        <br />
      </div>
    </div>
  );
};

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(RegisterSupplierComponent);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
