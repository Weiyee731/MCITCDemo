import React, { useState } from 'react';

import { GoogleLogin, useGoogleLogin, CredentialResponse, googleLogout, useGoogleAuth } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import GoogleIcon from '@mui/icons-material/Google';
import axios from 'axios';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

export const CustomGoogleLogin = (props) => {

    const [islogin, setisLogin] = useState(false);

    const login = useGoogleLogin({
        onSuccess: async codeResponse => {
            handleSuccess(await codeResponse);
        },
        // flow: 'auth-code',
    });

    const handleSuccess = (codeResponse) => {
        setisLogin(true);

        axios
            .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`, {
                headers: {
                    Authorization: `Bearer ${codeResponse.access_token}`,
                    Accept: 'application/json'
                }
            })
            .then((res) => {
                setisLogin(false);
                props.clickLogin(res.data, "Google");
            })
            .catch((err) => console.log(err));
    }

    const logOut = () => {
        googleLogout();
        props.setProfile(null);
        setisLogin(false)
    }

    return (
        <>
            {
                islogin ? (
                    <LoadingButton
                        loading
                        loadingPosition="start"
                        startIcon={<SaveIcon />}
                        style={{
                            fontSize: '16px',
                            border: 'none',
                            borderRadius: '4px',
                            width: '100%'
                        }}
                    >
                        Loading
                    </LoadingButton>
                ) : (
                    <div onClick={() => login()}
                        className="btn"
                        style={{
                            backgroundColor: '#1a73e8',
                            color: '#fff',
                            fontSize: '16px',
                            border: 'none',
                            borderRadius: '4px',
                            width: '100%'
                        }}>
                        <GoogleIcon />  Sign in with Google</div>
                )
            }
        </>
    )
}







