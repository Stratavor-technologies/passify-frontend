import React from "react";

const IconComponent = ({ iconName, iconSize, iconColor, iconPadding }) => {
  return (
    <div
      className={`bg-[#F3EEFF] w-[3.125rem] h-[3.125rem] rounded-full flex justify-center items-center `}
    >
      <i
        name={iconName}
        className={`bi-${iconName} text-[${iconSize}] text-[${iconColor}] p-[${iconPadding}] w-[3.125rem] h-[3.125rem] flex justify-center items-center`}
      ></i>
    </div>
  );
};

export default IconComponent;
