import React from "react";
import CardHeading from "./reuseableComponents/SubscriptionPlan/CardHeading";
import BorderLine from "./reuseableComponents/SubscriptionPlan/BorderLine";
import CardTitle from "./reuseableComponents/SubscriptionPlan/CardTitle";
import Pricing from "./reuseableComponents/SubscriptionPlan/Pricing";
import CardItemList from "./reuseableComponents/SubscriptionPlan/CardItemList";
import SubscribeBtn from "./reuseableComponents/SubscriptionPlan/SubscribeBtn";
import { cardItems } from "../utils/SubscriptionCardItem.js";
import { getLabelsBySelectedLang } from "../utils/LabelsTranslation.js";
import { toast } from "react-toastify";
import { get, post } from "../axios";

const SubscriptionCard = ({ plan }) => {

  const handleSubmit = async (e) => {
    const postDataResponse = await post(
      "/plans/payment",
      { plan_id: plan.id },
      "multipart/form-data"
    );
    if (postDataResponse.status === "success") {
      window.open(postDataResponse.data, "_blank");
    }
  };

  const items = cardItems(plan);
  return (
    <>
      <div
        className={`max-w-[23.625rem] rounded-[.75rem] p-5 flex flex-col subscriptionCard gap-3
                ${plan?.plan_name === "Starter"
            ? "bg-[#f3eeff]"
            : plan?.plan_name === "Plus"
              ? "bg-[#E6FAFB]"
              : plan?.plan_name === "Pro"
                ? "bg-[#FFF7E6]"
                : ""
          } `}
      >
        <div div className="text-center flex flex-col gap-3">
          <CardHeading
            heading={getLabelsBySelectedLang(`${plan?.plan_name}`)}
            // heading={plan?.plan_name}
            color={plan?.plan_name}
          />

          <BorderLine Color="#7249CB" />
          <CardTitle
            text={
              getLabelsBySelectedLang(
                "For anyone getting started with smaller projects"
              ) + "."
            }
          />
        </div>

        <Pricing
          price={plan?.price}
          curruncy={plan?.currency_symbol}
          plan={plan?.plan_type}
          dollarColor={plan?.plan_name}
          priceColor={plan?.plan_name}
          planColor="#677781"
        />

        <ul>
          {items.map((item, index) => (
            <CardItemList
              key={index}
              svgIcon={item.svgIcon}
              textHeading={item.textHeading}
            />
          ))}
        </ul>

        <SubscribeBtn planID={plan?.id} handleSubmit={handleSubmit} btnBgColor="#7249CB" />
      </div>
    </>
  );
};

export default SubscriptionCard;
