import React, { useState, useEffect } from "react";
import PhoneInput, {
  formatPhoneNumber,
  formatPhoneNumberIntl,
  isValidPhoneNumber,
  isPossiblePhoneNumber,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";

const CompanyRepresentativeForm = (props) => {
  const [value, setValue] = useState(props.inputDataCompany.repContact);

  const handleChange = (data, e) => {
    if (data === "contactNum") {
      props.setInputDataCompany({
        ...props.inputDataCompany,
        repContact: e.target.value,
      });
      setTimeout(
        function () {
          isValidPhoneNumber();
        }.bind(this),
        200
      );

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
    }
  };

  const addContactNum = () => {
    props.setInputDataCompany({
      ...props.inputDataCompany,
      repContact: value,
    });
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => addContactNum(), 1000);
    return () => clearTimeout(timeOutId);
  }, [value]);

  return (
    <div style={{ width: "100%" }}>
      <div style={{ width: "100%", display: "flex" }}>
        <label style={{ width: "100%" }}>Contact Number</label>

        <PhoneInput
          placeholder="Enter phone number"
          value={value}
          name="repContact"
          onChange={setValue}
          style={{
            width: "100%",
            borderColor:
              props.inputDataCompany.repContactNumEmpty &&
              props.inputDataCompany.repContact
                ? "#a31702"
                : null,
          }}
        />
      </div>
      <input
        hidden
        name="repContact"
        onChange={handleChange.bind(this, "contactNum")}
        ref={props.register({ required: true })}
        value={value}
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
      {props.errors.repContact && (
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

export default CompanyRepresentativeForm;
