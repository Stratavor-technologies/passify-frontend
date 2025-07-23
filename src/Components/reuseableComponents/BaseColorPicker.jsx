import React from "react";
import { ColorPicker } from "antd";
import "../../assets/scss/colorPicker.scss";
import { rgbaToHex } from "../../utils/rgbaToHex.js";
import { rgbStringToHex } from "../../utils/rgbaToHex.js";
import { convertRGBString } from "../../utils/RGBConverter.js";
import { getLabelsBySelectedLang } from "../../utils/LabelsTranslation.js";

const BaseColorPicker = (props) => {
  const hexColor = rgbStringToHex(props.value);

  return (
    <>
      <span className="mb-[1rem] flex">{getLabelsBySelectedLang(props.title)}</span>
      <div className="flex gap-[.75rem] items-center h-[2rem]">
        <ColorPicker
          defaultValue={props.colorPicker || rgbaToHex(props.defaultValue)}
          onChangeComplete={(color) =>
            props.handleChange(color.toRgbString(), props.inputKey, props.name)
          }
          value={props.value}
        />

        {
          <span className="text-[#677781] uppercase">
            {props.value && hexColor}
          </span>
        }
        <div className="border broder-s-[.0625rem] h-[32px]" />
        {props.value && (
          <span className="text-[#677781]">
            {convertRGBString(props.value)}
          </span>
        )}
      </div>
    </>
  );
};

export default BaseColorPicker;
