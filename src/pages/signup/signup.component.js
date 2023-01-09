// import { Button, Card } from "@mui/material";
// import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { GitAction } from "../../store/action/gitAction";
// import { browserHistory } from "react-router";


import React, { useState, useEffect, Component } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from "@mui/material/IconButton";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Row, Col } from "react-bootstrap"
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { toast } from "react-toastify";
import { Link, withRouter } from "react-router-dom";
import { Modal, ModalBody } from "reactstrap";
import CloseIcon from '@mui/icons-material/Close';

// Application
import Logo from "../../assets/Emporia.png";

function mapStateToProps(state) {
    return {
        currentUser: state.counterReducer["currentUser"],
        exist: state.counterReducer["exists"],
        loading: state.counterReducer["loading"],
        emailVerification: state.counterReducer["emailVerification"]
    };
}

function mapDispatchToProps(dispatch) {
    return {
        CallSignup: (credentials) => dispatch(GitAction.CallSignup(credentials)),
        CallCheckUserExists: (credentials) => dispatch(GitAction.CallCheckUserExists(credentials)),
    };
}

const SignUp = (props) => {
    const [signupPopOut, setsignupPopOut] = useState(props.signupPopOut)
    console.log(signupPopOut)
    const [currentForm, setCurrentForm] = useState(1);
    const [userDetail, setUserDetail] = useState({
        FirstName: "",
        LastName: "",
        Username: "",
        Email: "",
        Password: "",
        ConfirmPassword: "",
        isFirstNameFill: false,
        isLastNameFill: false,
        isUsernameFill: false,
        isEmailFill: false,
        isConfirmPasswordFill: false,

    });

    const [passwordHidden, setPasswordHidden] = useState(true);
    const [confirmPasswordHidden, setConfirmPasswordHidden] = useState(true);
    const [verifyEmail, setEmailVefication] = useState(false);
    const [EmailEmpty, setEmailEmpty] = useState(false);
    // const [EmailDuplicate, setEmailDuplicate] = useState(false);
    const [PasswordEmpty, setPasswordEmpty] = useState(false);
    const [ConfirmPasswordEmpty, setConfirmPasswordEmpty] = useState(false);
    const [submitRegisterForm, setSubmitRegisterForm] = useState(false);

    const [passErrorMatch, setPassErrorMatch] = useState(false);
    const [passErrorWrongFormat, setPassWrongFormat] = useState(false);
    const [emailErrorWrongFormat, setEmailWrongFormat] = useState(false);

    const [pass, setPass] = useState();
    const [confirmPass, setConfirmPass] = useState();

    // const breadcrumb = [
    //     { title: "Home", url: "" },
    //     { title: "Login", url: "/login" },
    //     { title: "SignUp", url: "" },
    // ];

    const checkFormIsFilled = () => {
        verifyPassFormat();
        verifyPass();
        // verifyEmail();
        // checkReturn();
        if (
            EmailEmpty ||
            PasswordEmpty ||
            ConfirmPasswordEmpty ||
            passErrorWrongFormat ||
            emailErrorWrongFormat ||
            passErrorMatch
        ) {
            toast.error("Please complete the form with correct information.");
        } else {

            props.CallCheckUserExists({ Email: userDetail.Email, Value: "signup" })
            setEmailVefication(true)

        }
    };

    const toggleShow = (value) => {

        if (value === "password")
            setPasswordHidden(!passwordHidden)
        else
            setConfirmPasswordHidden(!confirmPasswordHidden)
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

    const submitForm = () => {
        props.CallSignup(userDetail);
        setSubmitRegisterForm(true);
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
        console.log("11")
        const timeOutId = setTimeout(() => checkEmail(), 1000);
        return () => clearTimeout(timeOutId);
    }, [userDetail.Email]);

    const checkEmail = () => {
        if (userDetail.Email === "") {
            setEmailEmpty(true);
        } else {
            setEmailEmpty(false);
        }
        if ((userDetail.Email).includes("@")) {
            setEmailWrongFormat(false);
        } else {
            setEmailWrongFormat(true);
        }
    };

    useEffect(() => {
        console.log("22")
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
        console.log("33")
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
        console.log("44")
        const timeOutId = setTimeout(() => verifyPass(), 1000);
        return () => clearTimeout(timeOutId);
    }, [userDetail.Password, userDetail.ConfirmPassword]);

    useEffect(() => {
        console.log("55")
        const timeOutId = setTimeout(() => verifyPassFormat(), 1000);
        return () => clearTimeout(timeOutId);
    }, [userDetail.Password]);

    const handleChangeData = (data, e) => {
        if (data === "email") {
            setUserDetail({
                ...userDetail,
                Email: e.target.value,
                isEmailFill: true
            });
        } else if (data === "password") {
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


    function onSubmit(data) { }
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


    useEffect(() => {
        console.log("66")
        if (props.currentUser.length > 0 && submitRegisterForm === true && props.currentUser[0].ReturnVal !== "0") {
            console.log("77")
            localStorage.setItem("isLogin", true);
            localStorage.setItem("role", props.currentUser[0].UserType);
            localStorage.setItem("roleid", props.currentUser[0].UserTypeID);
            localStorage.setItem("userName", props.currentUser[0].Username);
            localStorage.setItem(
                "productEndorsementBadge",
                props.currentUser[0].productEndorsementBadge
            );
            localStorage.setItem(
                "productBadge",
                props.currentUser[0].productBadge
            );
            localStorage.setItem("id", props.currentUser[0].UserID);

            this.props.history.push("/");
            window.location.reload(false);
        }
    }, [props.currentUser], setSubmitRegisterForm);

    useEffect(() => {
        if (props.emailVerification.length > 0 && verifyEmail === true && props.emailVerification[0].ReturnVal === "0") {
            // if (props.emailVerification.length > 0 && verifyEmail === true) {
            submitForm();
        }
    }, [props.emailVerification], setEmailVefication);
    return (
                <div className="block block--margin-top" style={{ width: "100%" }}>
                    <div className="text-center">
                        {console.log("AHDJJDHJAHDJAHD")}
                        <img
                            src={Logo}
                            alt="MyEmporia"
                            height="250px"
                            width="auto"
                            className="mx-auto"
                        ></img>
                        {console.log("HERE IS SIGNUP EMPOIA")}
                    </div>
                    <div className="container" style={{ width: "100%" }}>
                        <div className="text-center">
                            <h4>Create a new MyEmporia's account</h4>
                        </div>
                        <div className="justify-content-center">
                            <Col lg="12" md="12">
                                <div className="mt-3" >
                                    <TextField id="Email" label="Email" variant="outlined" className="w-100" type="email" value={userDetail.Email} onChange={handleChangeData.bind(this, "email")} />
                                    {checkDuplicate && userDetail.Email}
                                    {EmailEmpty && userDetail.isEmailFill === true && (
                                        <p style={{ color: "#a31702", margin: "0px 0px 0px 10px", textAlign: "right", fontSize: "12px", }}  >
                                            This is required
                                        </p>
                                    )}
                                    {emailErrorWrongFormat && !EmailEmpty && (
                                        <p style={{ color: "#a31702", margin: "0px 0px 0px 10px", fontSize: "12px", }}  >
                                            Please key in a valid email
                                        </p>
                                    )}
                                </div>
                                <div className=" mt-3" >
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                        <OutlinedInput
                                            id="Password"
                                            label="Password"
                                            value={userDetail.Password}
                                            type={passwordHidden ? 'password' : 'text'}
                                            onChange={handleChangeData.bind(this, "password")}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={() => toggleShow("password")}
                                                        edge="end"
                                                    >
                                                        {passwordHidden ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>
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
                                <div className=" mt-3" >
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                                        <OutlinedInput
                                            id="ConfirmPassword"
                                            label="Confirm Password"
                                            value={userDetail.ConfirmPassword}
                                            type={confirmPasswordHidden ? 'password' : 'text'}
                                            onChange={handleChangeData.bind(this, "confirmPassword")}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={() => toggleShow("confirmpassword")}
                                                        edge="end"
                                                    >
                                                        {confirmPasswordHidden ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>

                                    {ConfirmPasswordEmpty && userDetail.isConfirmPasswordFill === true && (
                                        <p style={{ color: "#a31702", margin: "0px 0px 0px 10px", textAlign: "right", fontSize: "12px", }} >
                                            This is required
                                        </p>
                                    )}
                                </div>

                                <div className="SignUpForm-Submit mt-4" style={{ textAlign: "center" }}>
                                    <button
                                        type="submit"
                                        style={{ borderRadius: "5px" }}
                                        variant="contained"
                                        className="btn btn-primary w-100"
                                        onClick={checkFormIsFilled}
                                        disabled={userDetail.Email !== '' && userDetail.Password !== '' && userDetail.ConfirmPassword !== '' ? false : true}
                                    >
                                        Sign Up
                                    </button>

                                    <div className="SignUpForm-Submit mt-3">
                                        Already have an account? 
                                        <Link onClick={() => props.getSignUp(true,false)}>
                                            Login
                                        </Link>
                                    </div>

                                </div>
                            </Col>
                        </div>
                    </div>
                </div>

    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(SignUp));
