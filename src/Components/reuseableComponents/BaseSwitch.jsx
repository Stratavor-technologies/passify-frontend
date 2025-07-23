import React from 'react';
import { Switch } from 'antd';
const BaseSwitch = ({ onChange, checked }) =>
    <Switch checked={checked} onChange={onChange} />;
export default BaseSwitch;