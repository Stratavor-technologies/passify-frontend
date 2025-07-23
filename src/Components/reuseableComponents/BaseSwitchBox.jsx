import React from "react";
import { Switch } from "antd";

const BaseSwitchBox = ({ defaultChecked, handleChange, disabled }) => {
  return <Switch defaultChecked={defaultChecked} onChange={(e) => handleChange(e)} disabled={disabled} />;
};

export default BaseSwitchBox;
