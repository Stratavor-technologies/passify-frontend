import React, { useEffect, useState } from "react";
import BaseMobileCard from "../Cards/BaseMobileCard";
import cardImage from "../../assets/images/cardImg.png";
import { getLabelsBySelectedLang } from "../../utils/LabelsTranslation";
import { Spin } from "antd";
import { get } from "../../axios";
import { useNavigate } from "react-router";
import { cardData } from "../../utils/dashboardCardData";
import { useDispatch } from "react-redux";
import { resetForm } from "../../store/reducers/designSlice";
import LineChart1 from "../Chart/LineChart1";
import BarChart1 from "../Chart/BarChart1";
import PrograssBarChart1 from "../Chart/PrograssBarChart1";
import PieChart1 from "../Chart/PieChart1";
import WaveChart1 from "../Chart/WaveChart1";
import { toast } from "react-toastify";

import smileImg from "../../assets/images/icons/smile.png";
import whalletImg from "../../assets/images/icons/whallet.png";
import deleteImg from "../../assets/images/icons/delete.png";
import cupImg from "../../assets/images/icons/cup.png";

const Cards = () => {
  const initialOffset = 0;
  const [allCardData, setAllCardData] = useState([]);
  const [offset, setOffset] = useState(initialOffset);
  const [limit, setLimit] = useState(6);
  const [btnLoading, setBtnLoading] = useState(false);
  const dispatch = useDispatch();
  const [homeData, setHomeData] = useState(null);
  const [weekGraph, setWeekGraph ] = useState()


  useEffect(() => {
    getHomeData();
  }, []);

  useEffect(() => {
    getCardData(offset);
  }, [offset]);

  const loadMore = () => {
    setBtnLoading(true);
    setOffset((prevOffset) => prevOffset + limit);
  };

  const getHomeData = async () => {
    setBtnLoading(true);
    try {
      const response = await get(
        `dashboard/home`
      );
      setHomeData(response.data);
      setWeekGraph(response.data.weekGraphData)
    } catch (error) {
      console.error("Error fetching card data:", error);
    } finally {
      setBtnLoading(false);
    }
  }
  const getCardData = async (ofSet) => {
    setBtnLoading(true);
    try {
      const response = await get(
        `pass/readByUser?offset=${ofSet}&limit=${limit}`
      );
      const passData = response?.data?.passData;
      if (passData) {
        // setAllCardData((prevState) => [...prevState, ...passData]);
        setAllCardData(passData);
      }
    } catch (error) {
      console.error("Error fetching card data:", error);
    } finally {
      setBtnLoading(false);
    }
  };


  const navigate = useNavigate();
  const navigateToDesign = () => {
    dispatch(resetForm());
    localStorage.removeItem("userId");
    navigate("/design");
  };

  const handalDeleted = (id, index) => {
    console.log(id);
    getCardData();
  };
  return (
    <div className="dashboard_screen w-[100%] px-5 md:px-[6.125rem] overflow-auto scroll-hidden">
      <div className="flex gap-[5rem] w-full mt-8">
        <div className="bg-[#ffffff] w-[25%] rounded-[1rem] flex flex-wrap p-8 justify-center items-center">
          <div className="bg-[#F3EEFF] w-[3.3rem] h-[3.3rem]  rounded-full flex justify-center items-center">
            <img src={smileImg} alt="" />
          </div>
          <h2 className="w-full flex justify-center text-[3rem] font-[500] text-[#364349] my-2">{homeData?.total_customer}</h2>
          <p>{getLabelsBySelectedLang("Customers Signed Up")}</p>
        </div>
        <div className="bg-[#ffffff] w-[25%] rounded-[1rem] flex flex-wrap p-8 justify-center items-center">
          <div className="bg-[#F3EEFF] w-[3.3rem] h-[3.3rem]  rounded-full flex justify-center items-center">
            <img src={whalletImg} alt="" />
          </div>
          <h2 className="w-full flex justify-center text-[2rem] font-[500] text-[#364349] my-2">{homeData?.installs_to_wallet}</h2>
          <p>{getLabelsBySelectedLang("Installs to Wallet")}</p>
        </div>

        <div className="bg-[#ffffff] w-[25%] rounded-[1rem] flex flex-wrap p-8 justify-center items-center">
          <div className="bg-[#F3EEFF] w-[3.3rem] h-[3.3rem]  rounded-full flex justify-center items-center">
            <img src={deleteImg} alt="" />
          </div>
          <h2 className="w-full flex justify-center text-[2rem] font-[500] text-[#364349] my-2">{homeData?.uninstalled_from_wallet}</h2>
          <p>{getLabelsBySelectedLang("Uninstalled from Wallet")}</p>
        </div>

        <div className="bg-[#ffffff] w-[25%] rounded-[1rem] flex flex-wrap p-8 justify-center items-center">
          <div className="bg-[#F3EEFF] w-[3.3rem] h-[3.3rem]  rounded-full flex justify-center items-center">
            <img src={cupImg} alt="" />
          </div>
          <h2 className="w-full flex justify-center text-[2rem] font-[500] text-[#364349] my-2">{homeData?.rewards_redeemed}</h2>
          <p>{getLabelsBySelectedLang("Rewards Redeemed")}</p>
        </div>
      </div>

      <div className="bg-[#ffffff] rounded-[1rem] mt-8 p-8">
        <div className="flex gap-[2rem] w-full">
          {/* <div className="bg-[#ffffff] w-[50%] rounded-[1rem] p-4 justify-center items-center border border-[#CED4DA]">
            <div className="flex gap-[5rem] w-full mt-8">
              <h2 className="w-full text-[1.6rem] font-[500] text-[#364349] mb-6">Wave Graph</h2>
            </div>
            <LineChart1></LineChart1>
          </div> */}
          <div className="bg-[#ffffff] w-[40%] rounded-[1rem] p-4 justify-center items-center border border-[#CED4DA]">
            <h2 className="w-full text-[1.6rem] font-[500] text-[#364349] mb-6">{getLabelsBySelectedLang("Pass Installs/Uninstalls")}</h2>
            <PrograssBarChart1 installs={homeData?.installs_to_wallet} uninstalls={homeData?.uninstalled_from_wallet}></PrograssBarChart1>
            <div className="flex justify-center items-center">
              <span className="mr-4">
                <span>{homeData?.installs_to_wallet} </span>
                <span>Installs</span>
              </span>
              <span>
                <span>{homeData?.uninstalled_from_wallet} </span>
                <span>Uninstalls</span>
              </span>
            </div>
          </div>
          <div className="bg-[#ffffff] w-[50%] rounded-[1rem] p-4 justify-center items-center border border-[#CED4DA]">
            <h2 className="w-full text-[1.6rem] font-[500] text-[#364349] mb-6">{getLabelsBySelectedLang("Weekly Installs/Uninstalls")}</h2>
            <BarChart1 
              weekGraph = {weekGraph}
            ></BarChart1>
          </div>
        </div>
        <div className="flex gap-[2rem] w-full mt-8">
          {/* <div className="bg-[#ffffff] w-[40%] rounded-[1rem] p-4 justify-center items-center border border-[#CED4DA]">
            <h2 className="w-full text-[1.6rem] font-[500] text-[#364349] mb-6">Prograss Bar</h2>
            <PrograssBarChart1></PrograssBarChart1>
            <div className="flex justify-center items-center">
              <span className="mr-4">
                <span>-- </span>
                <span>Legend</span>
              </span>
              <span>
                <span>-- </span>
                <span>Legend</span>
              </span>
            </div>
          </div> */}
          {/* <div className="bg-[#ffffff] w-[20%] rounded-[1rem] p-4 justify-center items-center border border-[#CED4DA]">
            <h2 className="w-full text-[1.6rem] font-[500] text-[#364349] mb-6">Pie Chart</h2>
            <PieChart1></PieChart1>
          </div>
          <div className="bg-[#ffffff] w-[40%] rounded-[1rem] p-4 justify-center items-center border border-[#CED4DA]">
            <h2 className="w-full text-[1.6rem] font-[500] text-[#364349] mb-6">Wave Chart</h2>
            <WaveChart1></WaveChart1>
          </div> */}
        </div>
      </div>

      <div className="bg-[#ffffff] rounded-[1rem] mt-8">
        <div className="flex justify-between mx-[1.5625rem] py-[2rem]">
          <h1 className="text-[1.875rem] font-[500] text-[#364349]">
            {getLabelsBySelectedLang("My Cards")}
          </h1>
          <button
            className="bg-[#7249CB] py-[.5rem] px-[1.5rem] rounded-[.1875rem] text-white font-[600] text-[.9375rem] leading-[1.375rem] "
            onClick={() => navigateToDesign()}
          >
            + {getLabelsBySelectedLang("Create Card")}
          </button>
        </div>
        <hr className="flex justify-between h-[.125rem] mx-[1.5625rem] bg-[#CED4DA]"></hr>
        {allCardData.length > 0 && (
          <div className="flex gap-[0rem] justify-left flex-wrap ">
            {allCardData.map((data, index) => (
              <BaseMobileCard
                key={data.id}
                index={index}
                cardImage={cardImage}
                eyeIcon={true}
                id={data.id}
                cardData={data}
                handalDeleted={handalDeleted}
              />
            ))}
          </div>
        )}
      </div>


      <div className="flex justify-center mt-4">
        {allCardData.length === 0 && !btnLoading && (
          <p>no cards available!</p>
        )}
      </div>
    </div>
  );
};

export default Cards;
