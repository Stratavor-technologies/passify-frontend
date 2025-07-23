import React, { useState } from "react";
import { sidebarData } from "../../utils/sidebarMockData";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../Hooks/AuthHook";
import { toast } from "react-toastify";

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { setUserData } = useAuth();
  const location = useLocation();

  const handleItemClick = (index) => {
    setActiveIndex(index);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logout Successful");
    setUserData(null);
  };

  return (
    <div className="relative flex items-center">
      <div className="hidden md:flex flex-col gap-2 absolute bg-white shadow-md rounded-e-[1rem] py-[1rem] ">
        {sidebarData.map((data, index) => (
          <React.Fragment key={index}>
            {data.border && (
              <hr className="w-[4.5rem] h-[.125rem] bg-[#CED4DA]" />
            )}
            <Link to={data.path}>
              <div
                className={
                  "flex items-center justify-center w-[4.5rem]  whitespace-nowrap cursor-pointer my-4"
                }
                onClick={() => {
                  handleItemClick(index);
                  if (sidebarData.length - 1 === index) {
                    handleLogout();
                  }
                }}
              >
                <data.icon
                  fill={
                    location.pathname === data.path ? "#7249CB" : data.color
                  }
                />
              </div>
            </Link>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
