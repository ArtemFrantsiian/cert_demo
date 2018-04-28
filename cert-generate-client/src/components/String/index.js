import React from "react";
import { Input } from "antd";
import PropTypes from "prop-types";

const String = ({ type = "text", disabled = false } = { type: "text", disabled: false }) => (
  <Input
    type={type}
    disabled={disabled}
  />
);

String.propTypes = {
  type: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
};

String.defaultProps = {
  type: 'text',
  disabled: false,
};

export default String
