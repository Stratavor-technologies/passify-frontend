import React, { useEffect, useState } from "react";
import VideoTutorials from "./videoTutorials";
import Heading from "../reuseableComponents/headingWIthInfo";
import BaseInput from "../reuseableComponents/BaseInput";
import BaseTextArea from "../reuseableComponents/BaseTextArea";
import { ExpiryData } from "../../utils/RadioButtonData";
import RadioGroup from "../reuseableComponents/BaseRadio.jsx";
import BaseDatePicker from "../reuseableComponents/BaseDatePicker.jsx";
import DynamicTable from "../reuseableComponents/DynamicTable.jsx";
import CommonButton from "../reuseableComponents/BaseButton.jsx";
import arrowBack from "../../assets/images/svg/arrowBack.svg";
import { generateDate } from "../../utils/dateGenerator.js";
import { post } from "../../axios";
import { Spin } from "antd";
import { toast } from "react-toastify";
import SelectField from "../reuseableComponents/Select.jsx";
import { useDispatch, useSelector } from "react-redux";
import { saveFormValues } from "../../store/reducers/designSlice.js";
import { getLabelsBySelectedLang } from "../../utils/LabelsTranslation.js";

// data Arrays //

const calenderData = [
  { id: 1, label: "Day", value: "day" },
  { id: 2, label: "Month", value: "month" },
  { id: 3, label: "Year", value: "year" },
];
const linkType = [
  { id: 1, label: "Url", value: "Url" },
  { id: 2, label: "Phone", value: "Phone" },
  { id: 3, label: "Email", value: "Email" },
  { id: 4, label: "Address", value: "Address" },
];

const DetailsTab = ({ handleDetailChange, setTab, tab, id }) => {
  const dispatch = useDispatch();
  const FormData = useSelector((state) => state.design.formValues);

  const [btnLoading, setBtnLoading] = useState(false);
  const [fixedPeriodAfterSignup, setFixedPeriodAfterSignup] = useState(false);
  const [selectedValue, setSelectedValue] = useState(
    FormData?.expiry_type ?? calenderData[0].value
  );
  const [calenderSelect, setCalenderSelect] = useState({});
  const [formValue, setFormValue] = useState(FormData ? FormData : {});

  
  
  const handleInputChange = (event) => {
      let updatedValue = {
        ...formValue,
        [event.target.name]: event.target?.value,
      };

      setFormValue(updatedValue);
  };

  const handleRadioChange = (event) => {
    let updatedValue = {
      ...formValue,
      [event.target.name]: event.target?.value,
    };
    setSelectedValue(event.target?.value);
    setFormValue(updatedValue);
    dispatch(saveFormValues(updatedValue));
  };

  const handlePeriodAfterSignup = (date) => {
    const currentYear = new Date().getFullYear();
    const expiryYear = new Date(date).getFullYear();
    const difference = expiryYear - currentYear;
    return difference;
  };

  const handleDateChange = ({ dates, dateStrings, name }) => {
    let Updated = {
      ...formValue,
      [name]: dateStrings,
    };

    setFormValue(Updated);
    dispatch(saveFormValues(Updated));
  };
  const handleTableChange = (newData) => {
    setFormValue((prevFormValues) => ({
      ...formValue,
      usefull_links: newData,
    }));
  };
  const handleSelectChange = (name, value) => {
    let updatedValue = {
      ...calenderSelect,
      [name]: value,
    };
    let updateTabValue = {
      ...formValue,
      [name]: value,
    };

    setFormValue(updateTabValue);
    setCalenderSelect(updatedValue);
    dispatch(saveFormValues(updateTabValue));
  };
  const onCalenderChange = (event) => {
    if (!formValue?.expiry_period_type) {
      toast.error("select period type first");
      return;
    }

    setFixedPeriodAfterSignup(event.target.value);
    const generatedDate = generateDate(
      formValue.expiry_period_type,
      parseInt(event.target.value)
    );

    setFormValue((prevFormValues) => ({
      ...formValue,
      [event.target?.name]: +event.target.value,
      expiry_date: generatedDate,
    }));
  };

  const handleTextAreaChange = (event) => {
    setFormValue((prevFormValues) => ({
      ...formValue,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValue.expiry_type) {
      toast.error("please select an expiry");
      return;
    }
    const passID = localStorage.getItem("userId");
    const body = {
      id: formValue.id || passID,
      businessName: formValue.businessName,
      card_description: formValue.card_description,
      expiry_period_count: formValue.expiry_period_count,
      expiry_date: formValue.expiry_date,
      how_can_earn: formValue.how_can_earn,
      reward_name: formValue.reward_name,
      reward_description: formValue.reward_description,
      reward_success_message: formValue.reward_success_message,
      expiry_type: formValue.expiry_type,
      stamp_success_message: formValue.stamp_success_message,
      usefull_links: formValue.usefull_links,
      expiry_period_type: formValue.expiry_period_type,
      termsAndConditions: formValue.termsAndConditions,
      howToCollectStamps: formValue.howToCollectStamps,
      rewardDetail: formValue.rewardDetail,
      poweredBy: formValue.poweredBy,
    };
    try {
      setBtnLoading(true);
      const postDataResponse = await post(
        "/pass/storeDetails",
        body,
        "application/json"
      );

      if (postDataResponse.status === "success") {
        toast.success(postDataResponse.message);
        setTab(2);
        localStorage.setItem("tabIndex", tab);
        setBtnLoading(false);
      } else if (postDataResponse.status === "error") {
        toast.error(postDataResponse.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  };

  useEffect(() => {
    handleDetailChange(formValue);
    if (Object.keys(formValue)?.length) {
      dispatch(saveFormValues(formValue));
    }
  }, [formValue]);

  useEffect(() => {
    handlePeriodAfterSignup(FormData?.expiry_date);
  }, []);


  return (
    <>
      <div className="bg-[#ffffff] p-[2rem] rounded-[1rem]">
        <div className="flex justify-between">
          <h1 className="text-[#364349] text-[1.5625rem] font-[500] leading-[2.1875rem]">
            {getLabelsBySelectedLang("Card Details")}
          </h1>
          <VideoTutorials title="Adding Details" />
        </div>
        <hr className="text-[#CED4DA] my-[1.5rem]" />
        <form onSubmit={handleSubmit}>
          <div className="flex items-center gap-[5px] py-3">
            <Heading
              title="Card Descriptions"
              number="1"
              icon={true}
              numberIcon={true}
            />
          </div>

          <div className="py-4">
            <div className="py-2">
              <Heading title="Descriptions" icon={true} numberIcon={false} />
            </div>
            <BaseInput
              inputValue={FormData.card_description}
              placeholder="Enter card description..."
              name="card_description"
              className="h-[3.125rem] border text-[#ABB4B9] text-sm leading-4 font-normal px-5 rounded-md transition-all duration-300 ease-in-out"
              handleChange={handleInputChange}
            />
          </div>
          <div>
            <div className="pb-2">
              <Heading
                title="How your customers earn 1 stamp"
                icon={true}
                numberIcon={false}
              />
            </div>
            <BaseTextArea
              value={FormData.how_can_earn}
              placeholder="How your customers earn 1 stamp..."
              name="how_can_earn"
              onChange={handleTextAreaChange}
            />
          </div>
          <div>
            <div className="py-4">
              <Heading title="Business Name" icon={true} numberIcon={false} />
            </div>
            <BaseInput
              inputValue={FormData.businessName}
              placeholder="business Name"
              name="businessName"
              className="h-[3.125rem] border text-[#ABB4B9] text-sm leading-4 font-normal px-5 rounded-md transition-all duration-300 ease-in-out"
              handleChange={handleInputChange}
            />
          </div>

          <div>
            <div className="py-4">
              <Heading
                title="How to Collect Stamps"
                icon={true}
                numberIcon={false}
              />
            </div>
            <BaseInput
              inputValue={FormData.howToCollectStamps}
              placeholder="Spend $5 to get 1 stamp"
              name="howToCollectStamps"
              className="h-[3.125rem] border text-[#ABB4B9] text-sm leading-4 font-normal px-5 rounded-md transition-all duration-300 ease-in-out"
              handleChange={handleInputChange}
            />
          </div>

          <div>
            <div className="py-4">
              <Heading title="Reward Details" icon={true} numberIcon={false} />
            </div>
            <BaseInput
              inputValue={FormData.rewardDetail}
              placeholder="You will get a free coffee after collecting 8 stamps"
              name="rewardDetail"
              className="h-[3.125rem] border text-[#ABB4B9] text-sm leading-4 font-normal px-5 rounded-md transition-all duration-300 ease-in-out"
              handleChange={handleInputChange}
            />
          </div>
          <hr className="text-[#CED4DA] my-[1.5rem]" />
          <div className="flex items-center gap-[5px] py-3">
            <Heading
              title="Reward Details"
              number="2"
              icon={true}
              numberIcon={true}
            />
          </div>
          <div className="py-4">
            <div className="py-2">
              <Heading title="Reward Name" icon={true} numberIcon={false} />
            </div>
            <BaseInput
              inputValue={FormData.reward_name}
              placeholder="Free Coffee"
              name="reward_name"
              className="h-[3.125rem] border text-[#ABB4B9] text-sm leading-4 font-normal px-5 rounded-md transition-all duration-300 ease-in-out"
              handleChange={handleInputChange}
            />
          </div>
          <div>
            <div className="pb-2">
              <Heading
                title="Reward Description"
                icon={true}
                numberIcon={false}
              />
            </div>
            <BaseTextArea
              value={FormData.reward_description}
              placeholder="Enter reward description..."
              name="reward_description"
              onChange={handleTextAreaChange}
            />
          </div>

          {/* terms & conditions  */}
          <div className="py-4">
            <div className="py-2">
              <Heading
                title="Terms & Conditions"
                icon={true}
                numberIcon={false}
              />
            </div>
            <BaseTextArea
              value={FormData.termsAndConditions}
              placeholder="Terms & Conditions..."
              name="termsAndConditions"
              className="h-[3.125rem] border text-[#ABB4B9] text-sm leading-4 font-normal px-5 rounded-md transition-all duration-300 ease-in-out"
              onChange={handleTextAreaChange}
            />
          </div>

          <div className="py-4">
            <div className="py-2">
              <Heading title="Powered By" icon={true} numberIcon={false} />
            </div>
            <BaseInput
              value={FormData.poweredBy}
              placeholder="poweredBy"
              name="poweredBy"
              className="h-[3.125rem] border text-[#ABB4B9] text-sm leading-4 font-normal px-5 rounded-md transition-all duration-300 ease-in-out"
              handleChange={handleInputChange}
            />
          </div>

          <hr className="text-[#CED4DA] my-[1.5rem]" />
          <div className="flex items-center gap-[5px] py-3">
            <Heading
              title="Success Message"
              number="3"
              icon={true}
              numberIcon={true}
            />
          </div>

          <div className="py-4">
            <div className="py-2">
              <Heading title="Stamp success" icon={true} numberIcon={false} />
            </div>
            <BaseInput
              inputValue={FormData.stamp_success_message}
              placeholder="Only {#} more stamps until your reward!"
              name="stamp_success_message"
              className="h-16 border text-[#ABB4B9] text-sm leading-4 font-normal px-5 py-2 rounded-md transition-all duration-300 ease-in-out"
              infoText={getLabelsBySelectedLang(
                "You must include {#} in your stamp success message. '{#}' is a placeholder for the number of stamps"
              )}
              handleChange={handleInputChange}
            />
          </div>

          <div className="pb-4">
            <div>
              <Heading title="Reward Success" icon={true} numberIcon={false} />
            </div>
            <BaseInput
              inputValue={FormData.reward_success_message}
              name="reward_success_message"
              placeholder="Come and get your free coffee today!"
              className="h-[3.125rem] border text-[#ABB4B9] text-sm leading-4 font-normal px-5 rounded-md transition-all duration-300 ease-in-out"
              handleChange={handleInputChange}
            />
          </div>
          <hr className="text-[#CED4DA] my-[1.5rem]" />
          <div className="flex items-center gap-[2rem] w-full">
            <div className="flex  items-center gap-[5px] py-3">
              <Heading
                title="Expiry"
                number="4"
                icon={true}
                numberIcon={true}
              />
            </div>
            <div className="py-[1.5rem]">
              <RadioGroup
                options={ExpiryData}
                selectedValue={selectedValue}
                onRadioChange={handleRadioChange}
                name="expiry_type"
              />
            </div>
          </div>
          {selectedValue == ExpiryData[1].id ? (
            <BaseDatePicker
              defaultValue={FormData?.expiry_date}
              onDateChange={handleDateChange}
              name="expiry_date"
            />
          ) : selectedValue == ExpiryData[2].id ? (
            <div className="flex items-center gap-4">
              <div className="w-[20%]">
                <BaseInput
                  inputValue={FormData?.expiry_period_count}
                  className="bg-transparent h-[50px]"
                  type="number"
                  name="expiry_period_count"
                  handleChange={onCalenderChange}
                />
              </div>
              <div className="w-[20%]">
                <SelectField
                  selectedValue={FormData?.expiry_period_type}
                  options={calenderData}
                  onChange={handleSelectChange}
                  name="expiry_period_type"
                />
              </div>
            </div>
          ) : (
            ""
          )}

          <div className="flex items-center gap-[5px] py-3">
            <Heading
              title="Useful Links"
              number="5"
              icon={true}
              numberIcon={true}
            />
          </div>
          <div className="">
            <DynamicTable
              onChange={handleTableChange}
              name="useful_links"
              linkType={linkType}
            />
          </div>

          <div className="w-full flex justify-end">
            <CommonButton
              label={btnLoading ? <Spin /> : "Next: Details"}
              className="flex items-center gap-2 bg-[#7249CB] text-[#FFFFFF] py-[.5rem] px-[1.5rem] rounded-[.1875rem]"
              icon={arrowBack}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default DetailsTab;
