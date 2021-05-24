import React, { Component, useState, useEffect } from "react";
import validator from "validator";
import PhoneInput, {
  formatPhoneNumber,
  formatPhoneNumberIntl,
  isValidPhoneNumber,
  isPossiblePhoneNumber,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";

import Dropzone from "react-dropzone";

const CompanyDetailForm = (props) => {
  const [value, setValue] = useState(props.inputDataCompany.supplierContact);
  const [errorsFound, setErrors] = useState({
    wrongZipCode: false,
    wrongWebsiteFormat: false,
    form2NotComplete: true,
  });

  const handleChange = (data, e) => {
    if (data == "contactNum") {
      props.setInputDataCompany({
        ...props.inputDataCompany,
        supplierContact: value,
      });

      if (!isValidPhoneNumber(e.target.value)) {
        props.setInputDataCompany({
          ...props.inputDataCompany,
          repPhoneNumberNotValid: true,
        });
      } else {
        props.setInputDataCompany({
          ...props.inputDataCompany,
          repPhoneNumberNotValid: false,
        });
      }

      setTimeout(
        function () {
          isValidPhoneNumber();
        }.bind(this),
        200
      );
    }
  };

  const addContactNum = () => {
    props.setInputDataCompany({
      ...props.inputDataCompany,
      supplierContact: value,
    });
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => addContactNum(), 1000);
    return () => clearTimeout(timeOutId);
  }, [value]);

  return (
    <div style={{ width: "100%" }}>
      <div style={{ width: "100%", display: "flex" }}>
        <label style={props.labelStyle}>Contact</label>

        <PhoneInput
          placeholder="Enter phone number"
          value={value}
          name="supplierContact"
          onChange={setValue}
          style={{ width: "100%" }}
        />
      </div>
      <input
        hidden
        name="supplierContact"
        ref={props.register({ required: true })}
        value={value}
        style={{
          width: "100%",
          borderColor:
            props.inputDataCompany.companyContactNumEmpty &&
            props.inputDataCompany.supplierContact
              ? "#a31702"
              : null,
        }}
        onChange={handleChange.bind(this, "contactNum")}
      />
      {value && !isValidPhoneNumber(value) ? (
        <p
          style={{
            color: "#a31702",
            margin: "0px 0px 0px 10px",
          }}
        >
          Wrong Phone Number
        </p>
      ) : null}
      {props.errors.supplierContact && (
        <p
          style={{
            color: "#a31702",
            margin: "0px 0px 0px 10px",
          }}
        >
          This is required
        </p>
      )}
    </div>
  );
};

export default CompanyDetailForm;
