// import { Button, Card } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { GitAction } from "../../store/action/gitAction";

import { browserHistory } from "react-router";
import React, { useState, useEffect, Component } from "react";
import PageHeader from "../../components/shared/PageHeader";
import TextField from "@material-ui/core/TextField";

import { toast } from "react-toastify";

// Application
import Logo from "../../assets/Emporia.png";

function mapStateToProps(state) {
  return {
    currentUser: state.counterReducer["currentUser"],
    exist: state.counterReducer["exists"],
    loading: state.counterReducer["loading"],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CallSignup: (credentials) => dispatch(GitAction.CallSignup(credentials)),
    checkUser: (credentials) => dispatch(GitAction.CallCheckUserExists(credentials)),
  };
}

const ResetPasswordComponent = (props) => {
  const [currentForm, setCurrentForm] = useState(1);
  const [userDetail, setUserDetail] = useState({

    Password: "",
    ConfirmPassword: "",
    isPasswordFill: false,
    isConfirmPasswordFill: false,

  });

  const [PasswordEmpty, setPasswordEmpty] = useState(false);
  const [ConfirmPasswordEmpty, setConfirmPasswordEmpty] = useState(false);
  const [submitResetPasswordForm, setsubmitResetPasswordForm] = useState(false);

  const [passErrorMatch, setPassErrorMatch] = useState(false);
  const [passErrorWrongFormat, setPassWrongFormat] = useState(false);

  const [pass, setPass] = useState();
  const [confirmPass, setConfirmPass] = useState();


  const checkFormIsFilled = () => {
    verifyPassFormat();
    verifyPass();
    if (
      PasswordEmpty ||
      ConfirmPasswordEmpty ||
      passErrorWrongFormat ||
      passErrorMatch
    ) {
      toast.error("Please complete the details with correct information.");
    } else {
      toast.success("Form Submitted!");
      submitForm();
    }
  };



  const { register } = useForm();

  const submitForm = () => {
    props.CallSignup(userDetail);
    setsubmitResetPasswordForm(true);
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
    const timeOutId = setTimeout(() => checkPassword(), 1000);
    return () => clearTimeout(timeOutId);
  }, [userDetail.Password]);

  const checkPassword = () => {
    if (pass === "" || pass === null) {
      setPasswordEmpty(true);
    } else {
      setPasswordEmpty(false);
    }
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => checkConfirmPassword(), 1000);
    return () => clearTimeout(timeOutId);
  }, [userDetail.ConfirmPassword]);

  const checkConfirmPassword = () => {
    if (
      userDetail.ConfirmPassword === "" ||
      userDetail.ConfirmPassword === null
    ) {
      setConfirmPasswordEmpty(true);
    } else {
      setConfirmPasswordEmpty(false);
    }
  };


  useEffect(() => {
    const timeOutId = setTimeout(() => verifyPass(), 1000);
    return () => clearTimeout(timeOutId);
  }, [userDetail.Password, userDetail.ConfirmPassword]);

  useEffect(() => {
    const timeOutId = setTimeout(() => verifyPassFormat(), 1000);
    return () => clearTimeout(timeOutId);
  }, [userDetail.Password]);

  const handleChangeData = (data, e) => {
    if (data === "password") {
      setUserDetail({
        ...userDetail,
        Password: e.target.value,
      });
      setPass(e.target.value);
    } else if (data === "confirmPassword") {
      setUserDetail({
        ...userDetail,
        ConfirmPassword: e.target.value,
        isConfirmPasswordFill: true
      });
      setConfirmPass(e.target.value);
    }
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

  useEffect(() => {
    if (props.currentUser.length > 0 && submitResetPasswordForm === true) {
      browserHistory.push("/login");
      window.location.reload(false);
    }
  }, [props.currentUser], setsubmitResetPasswordForm);

  return (
    <div className="block block--margin-top" style={{ width: "100%" }}>
      <div className="text-center">
        <img
          src={Logo}
          alt="Emporia"
          height="250px"
          width="auto"
          className="mx-auto"
        ></img>
      </div>
      <div className="container" style={{ width: "100%" }}>
        <div className="text-center">
          <h4>Reset your password</h4>
        </div>
        <div className="container mt-3" style={{ width: "50%" }}>
          <div className="row" >
            <TextField id="Password" label="Password" variant="outlined" className="w-100 my-2" value={userDetail.Password} type="password" ref={register({ required: true })} onChange={handleChangeData.bind(this, "password")} />
            {passErrorMatch && confirmPass && !PasswordEmpty && (
              <p style={{ color: "#a31702", margin: "0px 0px 0px 10px", fontSize: "12px", }} >
                Passwords do not match.
              </p>
            )}
            {passErrorWrongFormat && pass && !PasswordEmpty && (
              <p style={{ color: "#a31702", margin: "0px 0px 0px 10px", fontSize: "12px", }}  >
                Password needs to contain at least 1 capital letter, 1 non-capital letter, 1 number and
                be at least 8 characters long.
              </p>
            )}
            {PasswordEmpty && (
              <p style={{ color: "#a31702", margin: "0px 0px 0px 10px", textAlign: "right", fontSize: "12px", }}  >
                This is required
              </p>
            )}
          </div>
          <div className="row">
            <TextField id="ConfirmPassword" label="Confirm Password" variant="outlined" className="w-100 my-2" value={userDetail.ConfirmPassword} type="password" ref={register({ required: true })} onChange={handleChangeData.bind(this, "confirmPassword")} />
            {ConfirmPasswordEmpty && userDetail.isConfirmPasswordFill === true && (
              <p style={{ color: "#a31702", margin: "0px 0px 0px 10px", textAlign: "right", fontSize: "12px", }} >
                This is required
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="SignUpForm-Submit mt-4" style={{ textAlign: "center" }}>
        <div className="SignUpForm-Submit mb-2">
          Remember your password? <a href="/login"><b>Login</b></a>
        </div>
        <button
          type="submit"
          style={{ borderRadius: "5px" }}
          variant="contained"
          className="btn btn-primary"
          onClick={checkFormIsFilled}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPasswordComponent);
