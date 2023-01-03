import React from 'react';

import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import GoogleIcon from '@mui/icons-material/Google';


// export const CustomGoogleLogin = () => (
// <GoogleLogin
//     onSuccess={credentialResponse => {
//         console.log(jwt_decode(credentialResponse.credential));
//     }}
//     onError={() => {
//         console.log('Login Failed');
//     }}
//     size="large"
//     theme="outline"
//     className="btn"
//     style={{
//         backgroundColor: '#4267b2',
//         color: '#fff',
//         fontSize: '16px',
//         // padding: '12px 24px',
//         border: 'none',
//         borderRadius: '4px',
//         width: '100%'
//     }}
// />

// )



export const CustomGoogleLogin = () => {
    const login = useGoogleLogin({
        onSuccess: codeResponse => console.log(codeResponse),
        flow: 'auth-code',
    });

    return (
        <div onClick={() => login()}
            className="btn"
            style={{
                backgroundColor: '#1a73e8',
                color: '#fff',
                fontSize: '16px',
                // padding: '12px 24px',
                border: 'none',
                borderRadius: '4px',
                width: '100%'
            }}>
            <GoogleIcon/>  Sign in with Google
        </div>
    )

}







