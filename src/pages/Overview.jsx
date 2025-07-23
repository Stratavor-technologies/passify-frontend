import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import BaseMobileCard from "../Components/Cards/BaseMobileCard";
import cardImage from "../assets/images/cardImg.png";
import urlArrow from "../assets/images/svg/urlArrow.svg";
import QRCode from "react-qr-code";
import { get } from "../axios";
import { Table } from "antd";
import smileIcon from "../assets/images/svg/smileIcon.svg";
import trophyIcon from "../assets/images/svg/trophyIcon.svg";
import walletIcon from "../assets/images/svg/walletIcon.svg";
import deleteIcon from "../assets/images/svg/deleteIcon.svg";

const Overview = () => {
  const [userCardData, setUserCardData] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getUserDataById = async (id) => {
      try {
        const getUserData = await get(`pass/detailById/${id}`);
        setUserCardData(getUserData?.data.passData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUserDataById(id);
  }, [id]);

  const goBack = () => {
    navigate(-1);
  };

  // date formating
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      sorter: true,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: true,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      sorter: true,
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      sorter: true,
      style: { background: "#364349" },
      render: (created_at) => <span>{formatDate(created_at)}</span>,
    },
  ];

  const OverviewUserData = [
    {
      icon: smileIcon,
      number: userCardData?.passUsers?.length,
      bgColor: "#e6fafb",
      text: "Customers Signed Up",
    },
    {
      icon: walletIcon,
      number: userCardData?.installs_to_wallet,
      bgColor: "#fff7e6",
      text: "Installs to Wallet",
    },
    {
      icon: deleteIcon,
      number: userCardData?.Uninstalled_from_wallet,
      bgColor: "#ffeced",
      text: "Uninstalled from Wallet",
    },
    {
      icon: trophyIcon,
      number: userCardData?.Rewards_redeemed,
      bgColor: "#e6f8e9",
      text: "Rewards Redeemed",
    },
  ];

  return (
    <>
      <div className="dashboard_screen w-[100%] px-5 md:px-[6.125rem] md:pr-[6rem] overflow-auto scroll-hidden">
        <div className="flex items-center gap-3 my-[1.5625rem]">
          <FaArrowLeft className="cursor-pointer" onClick={goBack} />
          <h1 className="text-[1.875rem] font-[500] text-[#364349]">
            Overview
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row lg:gap-5 my-5">
          <div className="w-full lg:w-[30%] flex flex-col items-center gap-4 py-5 rounded-[1rem] shadow-xl">
            <BaseMobileCard
              userCardData={userCardData}
              cardData={userCardData}
              id={id}
            />

            <div className="max-w-[13.75rem] w-full bg-[#f9f8fc] rounded-[.75rem] border border-[#EFEFEF] flex flex-col items-center py-5 ">
              <Link
                to={`https://passify.info/install/coupon/${id}`}
                target="_blank"
                className="font-[500] text-[1rem] leading-[1.5rem] text-[#364349] flex items-center gap-3"
              >
                Card URL
                <img
                  src={urlArrow}
                  alt="urlArrow"
                  className="w-[.875rem] h-[.875rem]"
                />
              </Link>

              <QRCode
                value={`https://passify.info/install/coupon/${id}`}
                className="w-[70%]"
              />
            </div>
          </div>

          {/* right side  */}
          <div className="w-full lg:w-[70%]">
            <div className="rounded-[1rem] shadow-xl flex items-center justify-between p-5">
              {OverviewUserData.map((item, index) => (
                <div
                  key={index}
                  className="max-w-[12.25rem] w-full border border-[#EFEFEF] rounded-[.75rem] p-7 flex flex-col gap-5"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-[2.5rem] h-[2.5rem] rounded-full flex items-center justify-center`}
                      style={{ backgroundColor: item.bgColor }}
                    >
                      <img src={item.icon} alt="icon" />
                    </div>
                    <p className="text-[#677781] text-[1.5625rem] font-[500] leading-[2.1875rem] ">
                      {item.number}
                    </p>
                  </div>

                  <p className="text-[#677781] font-[400] text-[.9375rem] leading-[1.5rem] ">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="w-[100%] overflow-y-auto rounded-[1rem] shadow-xl p-4 mt-8">
              <h1 className="text-[#364349] text-[1.5625rem] leading-[2.1875rem]  font-[500] my-3">
                Latest Transactions
              </h1>
              <Table
                columns={columns}
                dataSource={userCardData?.passUsers}
                className="custom-table"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;
