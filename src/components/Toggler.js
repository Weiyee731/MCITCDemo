import React from "react";
import { func, string } from "prop-types";
import styled from "styled-components";
// import Dropdown from "react-bootstrap/Dropdown";

const Button = styled.button`
  background: #1d1d1d;
  padding: 10px 90.5px;
  color: pink;
  font-size: 14px;
  font-weight: 700;
  color: #9e9e9e ;
  border: 0px;
  appearance: none;
  cursor: pointer;
  }
`;
const Toggle = ({ theme, toggleTheme }) => {
  return <Button onClick={toggleTheme}>Switch Theme</Button>;
  // return <Dropdown.Item onClick={toggleTheme}>Switch to {!theme} theme</Dropdown.Item>
};
Toggle.propTypes = {
  theme: string.isRequired,
  toggleTheme: func.isRequired,
};
export default Toggle;
