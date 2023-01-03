import React from 'react';

import FacebookLogin from '@greatsumini/react-facebook-login';
import FacebookIcon from '@mui/icons-material/Facebook';

const appId = '838969410740752';

// export const Default = () => <FacebookLogin appId={appId} />;

// export const FBLogin = () => (
//   <FacebookLogin
//     appId={appId}
//     initParams={{
//       version: 'v10.0',
//     }}
//     onSuccess={(response) => {
//       console.log('Login Success!', response);
//     }}
//     onFail={(error) => {
//       console.log('Login Failed!', error);
//     }}
//     onProfileSuccess={(response) => {
//       console.log('Get Profile Success!', response);
//       // {
//       //     "name": "CT Tay",
//       //     "email": "cttay0611@gmail.com",
//       //     "picture": {
//       //         "data": {
//       //             "height": 50,
//       //             "is_silhouette": false,
//       //             "url": "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=4971523912949927&height=50&width=50&ext=1675320578&hash=AeTc3abeReQ0BqhS0Ow",
//       //             "width": 50
//       //         }
//       //     },
//       //     "id": "4971523912949927"
//       // }
//     }}
//     className="btn"
//     style={{
//       backgroundColor: '#4267b2',
//       color: '#fff',
//       fontSize: '16px',
//       // padding: '12px 24px',
//       border: 'none',
//       borderRadius: '4px',
//       width: '100%'
//     }}
//   />
// );

export const FBLogin = () => (
  <FacebookLogin appId={appId}
    initParams={{
      version: 'v10.0',
    }}
    onSuccess={(response) => {
      console.log('Login Success!', response);
    }}
    onFail={(error) => {
      console.log('Login Failed!', error);
    }}
    onProfileSuccess={(response) => {
      console.log('Get Profile Success!', response);
      // {
      //     "name": "CT Tay",
      //     "email": "cttay0611@gmail.com",
      //     "picture": {
      //         "data": {
      //             "height": 50,
      //             "is_silhouette": false,
      //             "url": "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=4971523912949927&height=50&width=50&ext=1675320578&hash=AeTc3abeReQ0BqhS0Ow",
      //             "width": 50
      //         }
      //     },
      //     "id": "4971523912949927"
      // }
    }}

    className="btn"
    style={{
      backgroundColor: '#4267b2',
      color: '#fff',
      fontSize: '16px',
      border: 'none',
      borderRadius: '4px',
      width: '100%'
    }} children={<div><FacebookIcon/>  Sign in with Facebook</div>} />
);

// export const FBLoginWithRender = () => (
//   <FacebookLogin
//     appId={appId}
//     render={({ onClick }) => <a onClick={onClick}>Custom Component</a>}
//   />
// );