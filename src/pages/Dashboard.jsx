import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../Components/Dashboard/Card.jsx";
import DashboardComp from "../Components/Dashboard/DashboardComp.jsx";
import { get } from "../axios";
import { toast } from "react-toastify";

const Dashboard = () => {
  const initialOffset = 0;
  const limit = 6;
  const [allCardData, setAllCardData] = useState([]);
  const [offset, setOffset] = useState(initialOffset);
  const [btnLoading, setBtnLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadMore = () => {
    setBtnLoading(true);
    setOffset((prevOffset) => prevOffset + limit);
  };

  const getCardData = async (ofSet) => {
    setBtnLoading(true);
    try {
      const response = await get(
        `pass/readByUser?offset=${ofSet}&limit=${limit}`
      );
      const passData = response?.data?.passData;
      if (passData) {
        setAllCardData((prevState) => [...prevState, ...passData]);
      }
    } catch (error) {
      console.error("Error fetching card data:", error);
    } finally {
      setBtnLoading(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCardData(offset);
  }, [offset]);


  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {allCardData.length > 0 ? <Card /> : <DashboardComp />}

          {btnLoading ? "Loading..." : ""}
        </>
      )}
    </>
  );
};

export default Dashboard;
