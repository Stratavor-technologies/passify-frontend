import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SubscriptionCard from "../Components/SubscriptionCard";
import { get } from "../axios";
import BaseSwitch from "../Components/reuseableComponents/BaseSwitch";
import { getLabelsBySelectedLang } from "../utils/LabelsTranslation";
const Subscription = () => {
  const navigate = useNavigate();
  const [subsPlans, setSubsPlans] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [error, setError] = useState(null);

  const goPreviousPage = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchSubscriptionPlans = async () => {
      try {
        const planData = await get("plans");
        setSubsPlans(planData.data);
      } catch (error) {
        setError("Error fetching subscription plans");
      } finally {
      }
    };

    fetchSubscriptionPlans();
  }, []);

  const onSwitchChange = (checked) => {
    setToggle(checked);
  };

  return (
    <>
      <div className="dashboard_screen w-[100%] pl-[6.25rem] bg-[#f9f8fc] overflow-y-auto">
        <div className="flex items-center gap-3 my-4">
          <FaArrowLeft onClick={goPreviousPage} className="cursor-pointer" />
          <p className="font-[500] text-[1.875rem] leading-[2.5rem]">
            {getLabelsBySelectedLang("Subscription")}
          </p>
        </div>

        <div className="bg-white p-5 ">
          <div className="flex flex-col items-center gap-3 my-4">
            <h1 className="text-[#364349] text-[1.5625rem] font-[500] leading-[2.1875rem]">
              {getLabelsBySelectedLang("Simple Flexible Pricing")},{" "}
              {getLabelsBySelectedLang("Flexible Pricing")}
            </h1>
            <div className="flex items-center gap-2">
              <p className="text-[#364349] text-[1rem] font-[500] leading-[1.5rem]">
                {getLabelsBySelectedLang("Billed Monthly")}
              </p>
              <BaseSwitch onChange={onSwitchChange} checked={toggle} />
              <p className="text-[#677781] text-[1rem] leading-[1.5rem] font-[500]">
                {getLabelsBySelectedLang("Billed Yearly")}
              </p>
            </div>
            <p className="text-[#FF3E44] text-[.9375rem] font-[400] leading-[1.5rem]">
              {getLabelsBySelectedLang("Save up to 25% with yearly billing")}
            </p>
          </div>

          <div className="rounded-[1rem] flex flex-col items-center xl:flex-row xl:justify-center gap-5">
            {!toggle ? (
              <>
                {subsPlans && subsPlans.monthly ? (
                  subsPlans.monthly.map((plan) => (
                    <SubscriptionCard key={plan.id} plan={plan} />
                  ))
                ) : (
                  <p>No subscription plans available.</p>
                )}
              </>
            ) : (
              <>
                {subsPlans && subsPlans.annual ? (
                  subsPlans.annual.map((plan) => (
                    <SubscriptionCard key={plan.id} plan={plan} />
                  ))
                ) : (
                  <p>No subscription plans available.</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Subscription;
