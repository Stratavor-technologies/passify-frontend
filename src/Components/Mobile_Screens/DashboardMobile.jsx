import React from "react";

const DashboardMobile = () => {
  const color = "white";

  return (
    <>
      <div className="flex flex-col gap-[1.25rem] justify-center items-center h-full cursor-pointer hover:bg-[#e6e6e6]">
        <h3 className="text-[#45505B] text-[15px] font-[600]">
          Design Your Creativity 🤩
        </h3>

        <div className="w-[3.75rem] h-[3.75rem] rounded-[50%] bg-[#c9a04f] flex justify-center items-center">
          <box-icon
            name="plus"
            className="h-[2.5rem] w-[2.5rem]"
            color={color}
          ></box-icon>
        </div>
      </div>
    </>
  );
};

export default DashboardMobile;
