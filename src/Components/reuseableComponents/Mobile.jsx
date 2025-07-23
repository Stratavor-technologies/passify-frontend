import React from "react";

const Mobile = ({ currentDevice="apple", isChangeAble=false,  children, bg = 'gray-100' }) => {

  if(isChangeAble === true){
    var width = "59%";
  }else{
    var width = "";
  }
  
  return (
    <>
    {currentDevice === "apple" && ( <>
      <div className="relative border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl scale-[0.9]">

        <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
        <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
        <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
        <div className="h-[64px] w-[3px] bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
        <div className={`rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-${bg}`}>
          {children}
        </div>
      </div>
      </>)}

  {currentDevice === "android" && (
      <div className="relative border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl scale-[0.9]">
        <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute device_top_notch"></div>
        <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
        <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
        <div className="h-[64px] w-[3px] bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
        <div className={`rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-${bg}`}>
          {children}
        </div>
      </div>
    )}
    </>
  );
};

export default Mobile;
