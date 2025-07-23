import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import BaseInputField from "./reuseableComponents/BaseInputField";
import { post } from "../axios";
import * as yup from "yup";
import { toast } from "react-toastify";
import { Spin } from "antd";
import { get } from "../axios";
import { getLabelsBySelectedLang } from "../utils/LabelsTranslation";
import { usersValidations } from "../utils/validations/subusersValidations.js";

const Model = ({ toggleModel, fetchData, id, handleClose }) => {
  const [btnLoading, setBtnLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [inputData, setInputData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // validations import from utils

  // get userData by id
  const useFetchData = async (id) => {
    try {
      if (id) {
        const result = await get(`/subuser/show/${id}`);
        setInputData({
          name: result.data.name,
          email: result.data.email,
          phone: result.data.phone,
          password: "",
          confirmPassword: "",
        });
      } else {
        console.error("ID is missing. Unable to make API call.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputData({ ...inputData, [name]: value });

    setValidationErrors((prevErrors) => {
      return { ...prevErrors, [name]: "" };
    });
  };






  const body = {
    name: inputData.name,
    email: inputData.email,
    phone: inputData.phone,
    password: inputData.password,
    password_confirmation: inputData.confirmPassword,
  };


  const validationSchema = usersValidations(id);


  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setBtnLoading(true);

      await validationSchema.validate(inputData, { abortEarly: false });


      let ApiResponse;
      const requestBody = {
        name: inputData.name,
        email: inputData.email,
        phone: inputData.phone,
      };

      // Conditionally add password fields if they are not empty
      if (inputData.password && inputData.confirmPassword) {
        requestBody.password = inputData.password;
        requestBody.password_confirmation = inputData.confirmPassword;
      }

      if (id) {
        const updateUser = await post(`subuser/update/${id}`, requestBody);
        ApiResponse = updateUser;
      } else {
        const createUsers = await post(
          "/subuser/store",
          requestBody,
          "application/json"
        );
        ApiResponse = createUsers;
      }

      if (ApiResponse?.status === "success") {
        toast.success(
          id ? "User Updated Successfully" : "User Added Successfully"
        );

        setValidationErrors({
          name: "",
          phone: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        setInputData({
          name: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
        });

        await fetchData();
        handleClose();
        setBtnLoading(false);
      } else if (ApiResponse?.status === "error") {
        setBtnLoading(false);
        toast.error(`${ApiResponse?.message}`);
      }
    } catch (error) {
      if (error?.inner) {
        const validationErrors = {};
        error?.inner?.forEach((error) => {
          validationErrors[error?.path] = error?.message;
        });
        setValidationErrors(validationErrors);
      }

      setBtnLoading(false);
    }
  };


  const handleCancel = () => {
    handleClose();
    setInputData({
      name: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  useEffect(() => {
    if (id) {
      useFetchData(id);
    }
  }, [id]);

  return (
    <Modal centered open={toggleModel} onCancel={handleCancel} footer={null}>
      <h3 className="text-[#364349] font-[500] text-[1.5625rem] leading-[2.1875rem]">
        {getLabelsBySelectedLang(`${id ? "Edit" : "New"} User`)}
      </h3>

      <form onSubmit={handleSubmit}>
        <BaseInputField
          label="Name"
          type="text"
          value={inputData.name}
          placeholder="Tommy Vercetty"
          id="name"
          forLabel="name"
          name="name"
          handleChange={handleChange}
          validationErrors={validationErrors.name}
        />
        <BaseInputField
          label="Phone"
          type="number"
          placeholder="+91 9072147774"
          id="phone"
          value={inputData.phone}
          forLabel="Phone"
          name="phone"
          handleChange={handleChange}
          validationErrors={validationErrors.phone}
        />
        <BaseInputField
          label="Email"
          type="email"
          value={inputData.email}
          placeholder="tommygta@gmail.com"
          id="email"
          forLabel="email"
          name="email"
          handleChange={handleChange}
          validationErrors={validationErrors.email}
        />
        {/* Render password fields always */}
        <BaseInputField
          label="Password"
          type="password"
          placeholder="................."
          id="password"
          forLabel="password"
          name="password"
          value={inputData.password}
          handleChange={handleChange}
          validationErrors={validationErrors?.password}
        />
        <BaseInputField
          label="Confirm Password"
          type="password"
          placeholder="Confirm Password"
          id="confirmPassword"
          forLabel="confirmPassword"
          name="confirmPassword"
          value={inputData.confirmPassword}
          handleChange={handleChange}
          validationErrors={validationErrors?.confirmPassword}
        />

        <div className="flex gap-3 w-full">
          <div className="flex gap-3 ml-auto">
            <button
              type="button"
              className="py-[.5rem] px-[2rem] rounded-[.1875rem] bg-[#EDEFF0] text-[#677781]"
              onClick={handleCancel}
            >
              {getLabelsBySelectedLang("Cancel")}
            </button>
            <button
              className="py-[.5rem] px-[2rem] rounded-[.1875rem] bg-[#00B41A] text-[#FFFFFF]"
              type="submit"
            >
              {btnLoading && <Spin />}
              {id
                ? getLabelsBySelectedLang("Update")
                : getLabelsBySelectedLang("Submit")}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default Model;
