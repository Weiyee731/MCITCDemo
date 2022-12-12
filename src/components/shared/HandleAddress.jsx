import React from 'react'
import { Modal, ModalBody, ModalHeader } from "reactstrap"
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import { isContactValid, isEmailValid, isStringNullOrEmpty } from "../../Utilities/UtilRepo"
import CloseButton from 'react-bootstrap/CloseButton'
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import { Row, Col } from "reactstrap";

const HandleAddress = (props) => {
    const {
        isOpen,
        // handleOpen,
        // handleAddCreditCard,
        handleChange,
        handleCountryChange,
        handleSaveAddress,
        // handleInputFocus,
        handleClose,
        address,
        countryList,
        addressState,
        // handleChangeCardType
    } = props

    return (
        <Modal
            className="modal-dialog-centered"
            isOpen={isOpen}
            onClosed={handleClose}
        >
            <ModalHeader>
                {addressState.AddressBookNo === "" ? "Add New Address" : "Edit Address Details"}
            </ModalHeader>

            <ModalBody>
                <div className="card-body">
                    <div className="row no-gutters">
                        <div className="col-12 col-lg-12 col-xl-12">
                            <div className="form-group">
                                <TextField
                                    label="Recipient Name"
                                    id="outlined-size-Name"
                                    variant="outlined"
                                    defaultValue={address.length > 0 ? address.UserAddressName : addressState.Name}
                                    style={{ width: "100%" }}
                                    size="small"
                                    name="Name"
                                    onChange={(e) => handleChange(e)}
                                />
                                {isStringNullOrEmpty(addressState.Name) && addressState.Name !== "" && (
                                    <FormHelperText style={{ color: "red" }}>   Invalid Recipient Name </FormHelperText>
                                )}
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <TextField
                                        label="Email address"
                                        id="outlined-size-Email"
                                        variant="outlined"
                                        defaultValue={address.length > 0 ? address.UserEmail : addressState.email}
                                        // defaultValue={address.UserEmail}
                                        style={{ width: "100%" }}
                                        size="small"
                                        name="email"
                                        onChange={(e) => handleChange(e)}
                                    />
                                    {!isEmailValid(addressState.email) && addressState.email !== "" && (
                                        <FormHelperText style={{ color: "red" }}>   Invalid Email </FormHelperText>
                                    )}
                                </div>

                                <div className="form-group col-md-6">
                                    <TextField
                                        label="Contact Number"
                                        id="outlined-size-Contact"
                                        variant="outlined"
                                        defaultValue={address.length > 0 ? address.UserContactNo : addressState.ContactNo}
                                        // defaultValue={address.UserContactNo}
                                        style={{ width: "100%" }}
                                        size="small"
                                        name="ContactNo"
                                        onChange={(e) => handleChange(e)}
                                    />
                                    {!isContactValid(addressState.ContactNo) && addressState.ContactNo !== "" && (
                                        <FormHelperText style={{ color: "red" }}>   Invalid Contact Number </FormHelperText>
                                    )}
                                </div>
                            </div>

                            <div className="form-group">
                                <TextField
                                    label="Address Line 1"
                                    id="outlined-size-Address1"
                                    variant="outlined"
                                    // defaultValue={address.UserAddressLine1}
                                    defaultValue={address.length > 0 ? address.UserAddressLine1 : addressState.USERADDRESSLINE1}
                                    style={{ width: "100%" }}
                                    size="small"
                                    name="USERADDRESSLINE1"
                                    onChange={(e) => handleChange(e)}
                                />
                                {isStringNullOrEmpty(addressState.USERADDRESSLINE1) && addressState.USERADDRESSLINE1 !== "" && (
                                    <FormHelperText style={{ color: "red" }}>   Invalid Address </FormHelperText>
                                )}
                            </div>
                            <div className="form-group">
                                <TextField
                                    label="Address Line 2"
                                    id="outlined-size-Address2"
                                    variant="outlined"
                                    // defaultValue={address.UserAddressLine2}
                                    defaultValue={address.length > 0 ? address.UserAddressLine2 : addressState.USERADDRESSLINE2}
                                    style={{ width: "100%" }}
                                    size="small"
                                    name="USERADDRESSLINE2"
                                    onChange={(e) => handleChange(e)}
                                />
                                {isStringNullOrEmpty(addressState.USERADDRESSLINE2) && addressState.USERADDRESSLINE2 !== "" && (
                                    <FormHelperText style={{ color: "red" }}>   Invalid Address </FormHelperText>
                                )}
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <TextField
                                        label="Postcode / ZIP"
                                        id="outlined-size-Postcode"
                                        variant="outlined"
                                        // defaultValue={address.UserPoscode}
                                        defaultValue={address.length > 0 ? address.UserPoscode : addressState.USERPOSCODE}
                                        style={{ width: "100%" }}
                                        size="small"
                                        name="USERPOSCODE"
                                        onChange={(e) => handleChange(e)}
                                    />
                                    {isNaN(addressState.USERPOSCODE) && addressState.USERPOSCODE !== "" && (
                                        <FormHelperText FormHelperText style={{ color: "red" }}>   Invalid Poscode </FormHelperText>
                                    )}
                                    {isStringNullOrEmpty(addressState.USERPOSCODE) && addressState.USERPOSCODE !== "" && (
                                        <FormHelperText FormHelperText style={{ color: "red" }}>   Invalid Poscode </FormHelperText>
                                    )}
                                </div>

                                <div className="form-group col-md-6">
                                    <TextField
                                        label="Town / City"
                                        id="outlined-size-City"
                                        variant="outlined"
                                        // defaultValue={address.UserCity}
                                        defaultValue={address.length > 0 ? address.UserCity : addressState.USERCITY}
                                        style={{ width: "100%" }}
                                        size="small"
                                        name="USERCITY"
                                        onChange={(e) => handleChange(e)}
                                    />
                                    {isStringNullOrEmpty(addressState.USERCITY) && addressState.USERCITY !== "" && (
                                        <FormHelperText style={{ color: "red" }}>   Invalid City </FormHelperText>
                                    )}
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <TextField
                                        label="State"
                                        id="outlined-size-State"
                                        variant="outlined"
                                        defaultValue={address.length > 0 ? address.UserState : addressState.USERSTATE}
                                        // defaultValue={address.UserState}
                                        style={{ width: "100%" }}
                                        size="small"
                                        name="USERSTATE"
                                        onChange={(e) => handleChange(e)}
                                    />
                                    {isStringNullOrEmpty(addressState.USERSTATE) && addressState.USERSTATE !== "" && (
                                        <FormHelperText style={{ color: "red" }}>   Invalid State </FormHelperText>
                                    )}
                                </div>
                                <div className="form-group col-md-6">
                                    <FormControl
                                        variant="filled"
                                        size="small"
                                        style={{ width: "100%" }}
                                    >
                                        <Select
                                            id="Country"
                                            variant="outlined"
                                            defaultValue={address.length > 0 ? address.CountryID : addressState.COUNTRYID}
                                            // defaultValue={address.CountryID}
                                            // value={.option}
                                            size="small"
                                            onChange={(e) => handleCountryChange(e)}
                                            style={{
                                                textAlign: "left",
                                                width: "100%",
                                            }}
                                        >
                                            {countryList.length > 0 && countryList.map((country) => (
                                                <option
                                                    value={country.CountryId}
                                                    key={country.CountryId}
                                                >
                                                    {country.CountryName}
                                                </option>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className='col'>
                        <button onClick={() => handleClose()}
                            className="btn btn-secodary btn-block mt-3" style={{ backgroundColor: "dimgray", color: "white" }}
                            type="button"> <ClearIcon /> CANCEL</button>
                    </div>
                    <div className='col'>
                        <button onClick={() => handleSaveAddress()}
                            className="btn btn-primary btn-block mt-3"
                            type="button"><CheckIcon /> SUBMIT</button>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    )
}

export default HandleAddress