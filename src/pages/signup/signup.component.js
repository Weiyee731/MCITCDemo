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

const SignUp = (props) => {
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

    const [FirstNameEmpty, setFirstNameEmpty] = useState(false);
    const [LastNameEmpty, setLastNameEmpty] = useState(false);
    const [UsernameEmpty, setUsernameEmpty] = useState(false);
    const [EmailEmpty, setEmailEmpty] = useState(false);
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
        if (
            FirstNameEmpty ||
            LastNameEmpty ||
            UsernameEmpty ||
            EmailEmpty ||
            PasswordEmpty ||
            ConfirmPasswordEmpty ||
            passErrorWrongFormat ||
            emailErrorWrongFormat ||
            passErrorMatch
        ) {
            toast.error("Please complete the form with correct information.");
        } else {
            toast.success("Form Submitted!");
            submitForm();
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

    const { register } = useForm();

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
        const timeOutId = setTimeout(() => checkFirstName(), 1000);
        return () => clearTimeout(timeOutId);
    }, [userDetail.FirstName]);

    const checkFirstName = () => {
        if (
            userDetail.FirstName === "" ||
            userDetail.FirstName === null
        ) {
            setFirstNameEmpty(true);
        } else {
            setFirstNameEmpty(false);
        }
    };

    useEffect(() => {
        const timeOutId = setTimeout(() => checkLastName(), 1000);
        return () => clearTimeout(timeOutId);
    }, [userDetail.LastName]);

    const checkLastName = () => {
        if (userDetail.LastName === "") {
            setLastNameEmpty(true);
        } else {
            setLastNameEmpty(false);
        }
    };

    useEffect(() => {
        const timeOutId = setTimeout(() => checkUsername(), 1000);
        return () => clearTimeout(timeOutId);
    }, [userDetail.Username]);

    const checkUsername = () => {
        if (userDetail.Username === "") {
            setUsernameEmpty(true);
        } else {
            setUsernameEmpty(false);
        }
    };

    useEffect(() => {
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
        if (data === "fName") {
            setUserDetail({
                ...userDetail,
                FirstName: e.target.value,
                isFirstNameFill: true
            });
        } else if (data === "lName") {
            setUserDetail({
                ...userDetail,
                LastName: e.target.value,
                isLastNameFill: true
            });
        } else if (data === "userName") {
            setUserDetail({
                ...userDetail,
                Username: e.target.value,
                isUsernameFill: true
            });
        } else if (data === "email") {
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
        if (props.currentUser.length > 0 && submitRegisterForm === true) {
            browserHistory.push("/login");
            window.location.reload(false);
        }
    }, [props.currentUser], setSubmitRegisterForm);

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
                    <h4>Create a new Emporia's account</h4>
                </div>
                <div className="row">
                    <div className="col-6 mt-3">
                        <TextField id="FirstName" label="First Name" variant="outlined" className="w-100 my-2" value={userDetail.FirstName} ref={register({ required: true })} onChange={handleChangeData.bind(this, "fName")} />

                        {/* <label>First Name</label>
                        <input name="FirstName" value={userDetail.FirstName} ref={register({ required: true })} onChange={handleChangeData.bind(this, "fName")} /> */}
                        {FirstNameEmpty && userDetail.isFirstNameFill === true && (
                            <p style={{ color: "#a31702", margin: "0px 0px 0px 10px", textAlign: "right", fontSize: "12px", }} >
                                This is required
                            </p>
                        )}
                    </div>
                    <div className="col-6 mt-3">
                        <TextField id="LastName" label="Last Name" variant="outlined" className="w-100 my-2" value={userDetail.LastName} ref={register({ required: true })} onChange={handleChangeData.bind(this, "lName")} />

                        {/* <label>Last Name</label>
                        <input name="LastName" value={userDetail.LastName} ref={register({ required: true })} onChange={handleChangeData.bind(this, "lName")} /> */}
                        {LastNameEmpty  && userDetail.isLastNameFill === true && (
                            <p style={{ color: "#a31702", margin: "0px 0px 0px 10px", textAlign: "right", fontSize: "12px", }} >
                                This is required
                            </p>
                        )}
                    </div>
                </div>
                <div className="row">
                    <div className="col-6 mt-3">
                        <TextField id="Username" label="Username" variant="outlined" className="w-100 my-2" value={userDetail.Username} ref={register({ required: true })} onChange={handleChangeData.bind(this, "userName")} />
                        {/* <label>Username</label>
                        <input name="Username" value={userDetail.Username} ref={register({ required: true })} onChange={handleChangeData.bind(this, "userName")} /> */}
                        {UsernameEmpty  && userDetail.isUsernameFill === true && (
                            <p style={{ color: "#a31702", margin: "0px 0px 0px 10px", textAlign: "right", fontSize: "12px", }}   >
                                This is required
                            </p>
                        )}
                    </div>
                    <div className="col-6 mt-3">
                        <TextField id="Email" label="Email" variant="outlined" className="w-100 my-2" type="email" value={userDetail.Email} ref={register({ required: true })} onChange={handleChangeData.bind(this, "email")} />

                        {/* <label>Email</label>
                        <input name="Email" type="email" value={userDetail.Email} ref={register({ required: true })} onChange={handleChangeData.bind(this, "email")} /> */}
                        {checkDuplicate && userDetail.Email}
                        {EmailEmpty  && userDetail.isEmailFill === true && (
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
                </div>
                <div className="row">
                    <div className="col-6 mt-3">
                        <TextField id="Password" label="Password" variant="outlined" className="w-100 my-2" value={userDetail.Password} type="password" ref={register({ required: true })} onChange={handleChangeData.bind(this, "password")} />
                        {/* <label>Password</label>
                        <input name="Password" value={userDetail.Password} type="password" ref={register({ required: true })} onChange={handleChangeData.bind(this, "password")} /> */}
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
                    <div className="col-6 mt-3">
                        <TextField id="ConfirmPassword" label="Confirm Password" variant="outlined" className="w-100 my-2" value={userDetail.ConfirmPassword} type="password" ref={register({ required: true })} onChange={handleChangeData.bind(this, "confirmPassword")} />
                        {/* <label>Confirm Password</label>
                        <input name="ConfirmPassword" value={userDetail.ConfirmPassword} type="password" ref={register({ required: true })} onChange={handleChangeData.bind(this, "confirmPassword")} /> */}
                        {ConfirmPasswordEmpty  && userDetail.isConfirmPasswordFill === true && (
                            <p style={{ color: "#a31702", margin: "0px 0px 0px 10px", textAlign: "right", fontSize: "12px", }} >
                                This is required
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <div className="SignUpForm-Submit mt-4" style={{ textAlign: "center" }}>
                <div className="SignUpForm-Submit mb-2">
                    Already have an account? <a href="/login"><b>Login</b></a>
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
)(SignUp);
