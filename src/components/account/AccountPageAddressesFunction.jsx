// // react
// import React, { Component } from "react";

// // third-party
// import { Helmet } from "react-helmet-async";
// import { Link } from "react-router-dom";
// import PropTypes from "prop-types";

// // data stubs
// import dataAddresses from "../../data/accountAddresses";
// import theme from "../../data/theme";
// import Table from "@mui/material/Table";
// import {
//   Button,
//   TableCell,
//   TableRow,
//   TableHead,
//   Typography,
//   TableBody,
// } from "@mui/material";
// import { DataGrid } from '@mui/x-data-grid';

// // function AccountPageAddress(props) {
// //   const columns = [
// //     { field: "id", headerName: "ID", width: 70 },
// //     { field: "userAddressName", headerName: "Address name", width: 130 },
// //     { field: "address", headerName: "Address", width: 130 },
// //     {
// //       field: "phoneNumber",
// //       headerName: "Phone Number",
// //       type: "number",
// //       width: 90,
// //     },
// //     {
// //       field: "userEmail",
// //       headerName: "User Email",
// //       width: 160,
// //     },
// //   ];

// //   const rows = props.addresses.map((address,index) => [
// //     {
// //       id: address.UserAddressBookID,
// //       userAddressName: address.UserAddressName,
// //       address:
// //         address.UserAddressLine1 +
// //         address.UserAddressLine2 +
// //         address.UserPoscode +
// //         address.UserCity +
// //         address.CountryID,
// //       phoneNumber: address.UserContactNo,
// //       userEmail: address.UserEmail,
// //     },
// //   ]);
// //   // const addresses = props.addresses.map((address) => (
// //   //   <React.Fragment key={address.UserAddressBookID}>
// //   //     <div className="addresses-list__item card address-card">
// //   //       {address.UserAddressBookID == 1 && (
// //   //         <div className="address-card__badge">Default</div>
// //   //       )}

// //   //       <div className="address-card__body">
// //   //         <div className="address-card__name">{`${address.UserAddressName}`}</div>
// //   //         <div className="address-card__row">
// //   //           {address.CountryID}
// //   //           <br />
// //   //           {address.UserPoscode},{address.UserCity}
// //   //           <br />
// //   //           {address.UserAddressLine1} {address.UserAddressLine2}
// //   //         </div>
// //   //         <div className="address-card__row">
// //   //           <div className="address-card__row-title">Phone Number</div>
// //   //           <div className="address-card__row-content">
// //   //             {address.UserContactNo}
// //   //           </div>
// //   //         </div>
// //   //         <div className="address-card__row">
// //   //           <div className="address-card__row-title">Email Address</div>
// //   //           <div className="address-card__row-content">{address.UserEmail}</div>
// //   //         </div>
// //   //         <div className="address-card__footer">
// //   //           <Link
// //   //             to="/account/addresses/5"
// //   //             AddressBookNo={address.UserAddressBookID}
// //   //           >
// //   //             Edit
// //   //           </Link>
// //   //           &nbsp;&nbsp;
// //   //           <Link to="/">Remove</Link>
// //   //         </div>
// //   //       </div>
// //   //     </div>
// //   //     <div className="addresses-list__divider" />
// //   //   </React.Fragment>
// //   // ));

// //   return (
// //     <div className="addresses-list">
// //       <Helmet>
// //         <title>{`Address List — ${theme.name}`}</title>
// //       </Helmet>
// //       <Table>
// //         <TableHead>
// //           <TableCell>
// //             <Typography variant="h6" id="tableTitle" component="div">
// //               My Addresses
// //             </Typography>
// //           </TableCell>
// //         </TableHead>
// //         <TableBody>

// //           <div style={{ height: 400, width: "100%" }}>
// //             <DataGrid
// //               rows={rows}
// //               columns={columns}
// //               id={rows.id}
// //               pageSize={5}
// //               checkboxSelection
// //             />
// //           </div>
// //           {/* <Link
// //             to="address/{UserAddressBookID}"
// //             className="addresses-list__item addresses-list__item--new"
// //           >
// //             <div className="addresses-list__plus" />
// //             <div className="btn btn-secondary btn-sm">Add New</div>
// //           </Link> */}
// //         </TableBody>
// //         {/* <div className="addresses-list__divider" /> */}
// //       </Table>
// //     </div>
// //   );
// // }
// // class AccountPageAddressesFunction extends Component {
// //   constructor(props) {
// //     super(props);
// //     this.state = {
// //       addressSelected: this.props.addresses[0],
// //     };
// //   }

// //   handleChange = (e) => {
// //     const { value } = e.target;

// //     this.setState({
// //       cardtype: value,
// //     });
// //   };

// //   render() {
// //     // console.log(this.state);
// //     return <AccountPageAddress addresses={this.props.addresses} />;
// //   }
// // }

// // export default AccountPageAddressesFunction;
