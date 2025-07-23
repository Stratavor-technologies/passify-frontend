import React, { useState, useEffect } from "react";
import VideoTutorials from "./videoTutorials";
import Heading from "../reuseableComponents/headingWIthInfo";
import BaseInput from "../reuseableComponents/BaseInput";
import CommonButton from "../reuseableComponents/BaseButton.jsx";
import arrowBack from "../../assets/images/svg/arrowBack.svg";
import { post } from "../../axios";
import { Spin } from "antd";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { saveFormValues } from "../../store/reducers/designSlice.js";
import { getLabelsBySelectedLang } from "../../utils/LabelsTranslation.js";

const FieldTabs = ({ setTab, handleFieldChange }) => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.design.formValues);

  const id = useSelector((state) => state.design.id);

  const [fieldValue, setFieldValue] = useState(() => {
    const parsedHeaderFields = JSON.parse(formData?.header_fields || "[]");
    const parsedSecondaryFields = JSON.parse(
      formData?.secondary_fields || "[]"
    );

    return {
      id: null,
      header_fields: Array.isArray(parsedHeaderFields)
        ? parsedHeaderFields[0]?.label
        : "",
      secondary_fields: Array.isArray(parsedSecondaryFields)
        ? parsedSecondaryFields[0]?.label
        : "",
    };
  });
  const [btnLoading, setBtnLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    let updatedValues = {
      ...fieldValue,
      [name]: value,
    };

    setFieldValue(updatedValues);
    dispatch(saveFormValues(updatedValues));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setBtnLoading(true);
      const id = localStorage.getItem("userId") || id;
      const body = {
        id: id || FormData.id,
        header_fields: [
          {
            label: fieldValue.header_fields,
            value: "1/10",
          },
        ],
        secondary_fields: [
          {
            label: fieldValue.secondary_fields,
            value: "10",
          },
        ],
      };
      const postDataResponse = await post(
        "/pass/storeFields",
        body,
        "application/json"
      );

      if (postDataResponse.status === "success") {
        toast.success(postDataResponse.message);
        setTab(3);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setBtnLoading(false);
    }
  };
  useEffect(() => {
    handleFieldChange(fieldValue);
  });

  return (
    <div className="bg-[#ffffff] p-[2rem] rounded-[1rem]">
      <div className="flex justify-between">
        <h1 className="text-[#364349] text-[1.5625rem] font-[500] leading-[2.1875rem]">
          {getLabelsBySelectedLang("Fields")}
        </h1>
        <VideoTutorials title="Adding Fields" />
      </div>
      <hr className="text-[#CED4DA] my-[1.5rem]" />
      <form onSubmit={handleSubmit}>
        <div className="py-4">
          <div className="py-2">
            <Heading title="Header Label" icon={true} numberIcon={false} />
          </div>
          <BaseInput
            placeholder="STAMPS"
            name="header_fields"
            inputValue={fieldValue.header_fields}
            className="h-[3.125rem] border text-[#ABB4B9] text-sm leading-4 font-normal px-5 rounded-md transition-all duration-300 ease-in-out"
            handleChange={handleInputChange}
          />
        </div>
        <div className="py-4">
          <div className="py-2">
            <Heading title="Secondary Label" icon={true} numberIcon={false} />
          </div>
          <BaseInput
            placeholder="STAMPS"
            name="secondary_fields"
            inputValue={fieldValue.secondary_fields}
            className="h-[3.125rem] border text-[#ABB4B9] text-sm leading-4 font-normal px-5 rounded-md transition-all duration-300 ease-in-out"
            handleChange={handleInputChange}
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
  );
};

export default FieldTabs;
