// import React, { Component } from "react";
// import "./userProfile.component.css";
// import { Card, CardMedia, Typography } from "@mui/material";
// import Button from "@mui/material/Button";
// import CardContent from "@mui/material/CardContent";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// // import classes from '*.module.css';

// function createData(Column1, Column2) {
//   return { Column1, Column2 };
// }

// const rows = [
//   createData("Username", "UserName"),
//   createData("Name", "FullName"),
//   createData("Email", "someone@gmail.com"),
//   createData("Phone Number", "0123456789"),
//   createData("Gender", "Male"),
//   createData("Date of Birth", "06/07/1997"),
// ];

// class userProfile extends Component {
//   render() {
//     return (
//       <Card
//         style={{
//           margin: "2%",
//           display: "flex",
//           width: "100%",
//         }}
//       >
//         <CardContent
//           style={{
//             flex: "1 0 auto",
//           }}
//         >
//           <div>
//             <tr>
//               <td>
//                 <Typography
//                   style={{
//                     fontSize: "18px",
//                     fontFamily: "Calibri Light,sans-serif",
//                   }}
//                 >
//                   My profile
//                 </Typography>

//                 <Typography
//                   style={{
//                     fontSize: "14px",
//                     fontFamily: "Calibri Light,sans-serif",
//                     marginBottom: 12,
//                   }}
//                 >
//                   Manage your personal information
//                 </Typography>
//               </td>
//             </tr>
//             <TableContainer
//               component={Paper}
//               style={{
//                 float: "left",
//                 borderCollapse: "collapse",
//                 border: "none",
//                 marginLeft: "6.75pt",
//                 marginRight: "6.75pt",
//                 marginBottom: "4%",
//               }}
//             >
//               <Table
//                 style={{
//                   minWidth: "650",
//                 }}
//               >
//                 <TableBody>
//                   {rows.map((row) => (
//                     <TableRow key={row.Column1}>
//                       <TableCell component="th" scope="row" className="input-row">
//                         {row.Column1}
//                       </TableCell>
//                       <TableCell>{row.Column2}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </div>
//           <div
//             style={{
//               textAlign: "center",
//             }}
//           >
//             <Button variant="contained" color="primary">
//               Save
//             </Button>
//           </div>
//         </CardContent>
//         <CardContent
//           style={{
//             flex: "1 0 auto",
//             marginTop: "10%",
//           }}
//         >
//           <div
//             style={{
//               width: "150px",
//               height: "150px",
//               position: "relative",
//               overflow: "hidden",
//               borderRadius: "50%",
//               margin: "auto",
//             }}
//           >
//             <CardMedia
//               component="img"
//               alt="Profile Picture"
//               height="180"
//               image="https://img-cdn.tid.al/o/4858a4b2723b7d0c7d05584ff57701f7b0c54ce3.jpg"
//               style={{
//                 display: "inline",
//                 margin: "0 auto",
//                 marginLeft: "-25%", //centers the image
//                 height: "100%",
//                 width: "auto",
//               }}
//             />
//           </div>
//           <div
//             style={{
//               textAlign: "center",
//               padding: "inherit",
//             }}
//           >
//             <Button variant="contained" color="primary">
//               Select Image
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     );
//   }
// }

// export default userProfile;
