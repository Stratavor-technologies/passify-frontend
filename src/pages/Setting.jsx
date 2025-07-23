import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FaInfoCircle } from "react-icons/fa";
import { post } from "../axios";
import { toast } from "react-toastify";
import { Spin, Modal } from "antd";
import * as Yup from "yup";
import BaseInputField from "../Components/reuseableComponents/BaseInputField";
import BaseRadio from "../Components/reuseableComponents/BaseRadio";
import { useNavigate } from "react-router-dom";
import { getLabelsBySelectedLang } from "../utils/LabelsTranslation";

const Setting = () => {
  const [changesMade, setChangesMade] = useState(false);
  const [passwordChangesMade, setPasswordChangesMade] = useState(false);
  const [btnLoadingPassword, setBtnLoadingPassword] = useState(false);
  const [btnLoadingProfileUpdate, setBtnLoadingProfileUpdate] = useState(false);
  const [selectedValue, setSelectedValue] = useState();
  const [iniitalProfileData, setInitialProfileData] = useState();
  const [validationErrors, setValidationErrors] = useState({
    currentPass: "",
    NewPass: "",
    ConfirmPass: "",
  });

  // validation for password

  const validationSchema = Yup.object({
    currentPass: Yup.string().required("Current Password is required"),
    NewPass: Yup.string()
      .required("New Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
    ConfirmPass: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("NewPass"), null], "Passwords must match"),
  });

  // state for validation errors
  const [profileValidationErrors, setProfileValidationErrors] = useState({
    name: "",
    organizationName: "",
    email: "",
    phone: "",
    organizationPhone: "",
  });

  const profileValidationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    organizationName: Yup.string().required("Organization Name is required"),
    email: Yup.string()
      .matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "This is not a valid email address"
      )
      .required("Email is required"),
    phone: Yup.string()
      .typeError("That doesn't look like a phone number")
      .matches(/^\d+$/, "A phone number can only contain digits")
      .min(4, "A phone number must have at least 4 characters")
      .max(17, "A phone number can have at most 17 characters")
      .required("A phone number is required"),
    organizationPhone: Yup.string().required(
      "Organization Phone number is required"
    ),
  });

  const languageData = [
    { id: 1, label: "English", value: 1 },
    { id: 2, label: "عربي", value: 2 },
  ];

  const [inputData, setInputData] = useState({
    name: "",
    phone: "",
    email: "",
    organizationName: "",
    organizationPhone: "",
  });

  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });

    setChangesMade(true);
  };

  const [passwordField, setPasswordField] = useState({
    currentPass: "",
    NewPass: "",
    ConfirmPass: "",
  });

  const handlePasswordChange = (e) => {
    setPasswordField({ ...passwordField, [e.target.name]: e.target.value });

    setPasswordChangesMade(true);
  };

  const handleRadioChange = (event) => {
    setSelectedValue(parseInt(event.target.value, 10));
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [event.target.name]: parseInt(event.target.value, 10),
    }));
  };

  // navigate To Subscription

  const navigate = useNavigate();

  const navigateToSubscription = () => {
    navigate("/subscription");
  };

  // display logedin user data

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const responseUser = await post("user/getUserInfo");
        if (responseUser.status === "success") {
          setInputData({
            name: responseUser.data.name || "",
            phone: responseUser.data.phone || "",
            email: responseUser.data.email || "",
            organizationName: responseUser.data.organization_name || "",
            organizationPhone: responseUser.data.organization_phone || "",
          });
          setInitialProfileData(responseUser.data);
        } else if (responseUser.status === "error") {
          toast.error(responseUser.message);
        }
      } catch (error) {
        console.error("An error occurred while fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  // update user profile

  const updateUserProfile = async (e) => {
    e.preventDefault();

    if (!changesMade) {
      toast.warning("Make changes first.");
      return;
    }

    try {
      setBtnLoadingProfileUpdate(true);

      await profileValidationSchema.validate(inputData, { abortEarly: false });

      const updatedUserData = {
        name: inputData.name,
        email: inputData.email,
        phone: inputData.phone,
        organization_name: inputData.organizationName,
        organization_phone: inputData.organizationPhone,
      };
      if (updatedUserData !== iniitalProfileData) {
        const updatedRequest = await post("update/profile", updatedUserData);

        if (updatedRequest.status === "success") {
          toast.success(updatedRequest.message);
          setBtnLoadingProfileUpdate(false);

          setProfileValidationErrors({
            name: "",
            organizationName: "",
            email: "",
            phone: "",
            organizationPhone: "",
          });
        } else if (updatedRequest.status === "error") {
          toast.error(updatedRequest.message);
          setBtnLoadingProfileUpdate(false);
        }
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = {};
        error.inner.forEach((e) => {
          errors[e.path] = e.message;
        });
        setProfileValidationErrors(errors);
        setBtnLoadingProfileUpdate(false);
      }
    }
  };

  // delete user profile
  const deleteProfile = async () => {
    try {
      Modal.confirm({
        title: "Confirm Delete",
        content:
          "Before we proceed, can you confirm that you intend to delete the profile permanently?",
        onOk: async () => {
          try {
            const deleteUserProfile = await post("user/delete");

            if (deleteUserProfile?.status === "success") {
              toast.success(deleteUserProfile?.message);
              localStorage.removeItem("token");
              navigate("/register");
            } else if (deleteUserProfile?.status === "error") {
              toast.error(deleteUserProfile?.message);
            }
          } catch (error) {
            console.error(error);
          }
        },
        onCancel: () => { },
        okButtonProps: { style: { backgroundColor: "#7249cb" } },
      });
    } catch (error) {
      console.error(error);
    }
  };

  // update user password

  const updatePassword = async (e) => {
    e.preventDefault();

    if (!passwordChangesMade) {
      toast.warning("Make changes first.");
      return;
    }

    try {
      setBtnLoadingPassword(true);

      await validationSchema.validate(passwordField, { abortEarly: false });

      const body = {
        currentPassword: passwordField.currentPass,
        newPassword: passwordField.NewPass,
      };

      if (body.currentPassword !== body.newPassword) {
        const updatedPassword = await post("user/updatePassword", body);

        if (updatedPassword.status === "success") {
          toast.success(updatedPassword.message);

          setBtnLoadingPassword(false);

          setPasswordField({
            currentPass: "",
            NewPass: "",
            ConfirmPass: "",
          });

          setValidationErrors({
            currentPass: "",
            NewPass: "",
            ConfirmPass: "",
          });
        } else if (updatedPassword.status === "error") {
          toast.error(updatedPassword.message);

          setValidationErrors({
            currentPass: "",
            NewPass: "",
            ConfirmPass: "",
          });

          setBtnLoadingPassword(false);
        }
      } else {
        toast.info("New password must be different from old password");
        setBtnLoadingPassword(false);
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = {};
        error.inner.forEach((e) => {
          errors[e.path] = e.message;
          setBtnLoadingPassword(false);
        });
        setValidationErrors(errors);
      }
    }
  };

  return (
    <>
      <div className="dashboard_screen w-[100%] px-5 md:px-[6.125rem] md:pr-[6rem] overflow-auto scroll-hidden">
        <div className="flex justify-between items-center py-10 pr-[4.375rem]">
          <h3 className="font-[500] text-[1.875rem] text-[#364349] leading-[2.5rem]">
            {getLabelsBySelectedLang("Setting")}
          </h3>
          <button
            className="bg-[#FFA900] px-[1.5rem] py-[.5rem] rounded-[.1875rem] leading-[1.375rem] text-white font-[600] text-[.9375rem]"
            onClick={() => navigateToSubscription()}
          >
            {getLabelsBySelectedLang("Upgrade Plan")}
          </button>
        </div>

        {/* Cards section Start */}
        <div className="flex flex-col gap-5 lg:flex-row lg:gap-14 w-full my-5">
          {/* Profile Update Section Start */}
          <div className="w-[100%] lg:max-w-[37.5rem] lg:w-full h-max rounded-[1rem] p-10 dashboardCard">
            <div className="flex justify-between items-center w-[100%]">
              <h2 className="text-[#364349] text-[1.5625rem] font-[500] leading-[2.1875rem]">
                {getLabelsBySelectedLang("Profile")}
              </h2>

              <button
                className="flex items-center gap-[.5rem] px-[1.5rem] py-[.5rem] border border-[#FF3E44] rounded-[.1875rem]"
                onClick={() => deleteProfile()}
              >
                <AiFillDelete color="#FF3E44" />
                <span className="text-[#FF3E44] font-[600] leading-[1.375rem] text-[.9375rem]">
                  {getLabelsBySelectedLang("Delete Profile")}
                </span>
              </button>
            </div>
            <form onSubmit={updateUserProfile}>
              <BaseInputField
                label="Name"
                value={inputData.name}
                type="text"
                placeholder="Tommy Vercetty"
                id="name"
                forLabel="name"
                name="name"
                handleChange={handleChange}
                validationErrors={profileValidationErrors.name}
              />
              <BaseInputField
                label="Organization Name"
                type="text"
                value={inputData.organizationName}
                placeholder="Tommy Vercetty"
                id="organizationName"
                forLabel="organizationName"
                name="organizationName"
                handleChange={handleChange}
                validationErrors={profileValidationErrors.organizationName}
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
                validationErrors={profileValidationErrors.email}
              />
              <BaseInputField
                label="Phone"
                type="number"
                value={inputData.phone}
                placeholder="+91 9072147774"
                id="phone"
                forLabel="Phone"
                name="phone"
                handleChange={handleChange}
                validationErrors={profileValidationErrors.phone}
              />
              <BaseInputField
                label="Organization Phone"
                type="number"
                value={inputData.organizationPhone}
                placeholder="+91 9072147774"
                id="organizationPhone"
                forLabel="organizationPhone"
                name="organizationPhone"
                handleChange={handleChange}
                validationErrors={profileValidationErrors.organizationPhone}
              />

              <div className="flex gap-3 w-full">
                <div className="flex gap-3 ml-auto">
                  <button
                    className="py-[.5rem] px-[2rem] font-[600] leading-[1.375rem] rounded-[.1875rem] bg-[#00B41A] text-[#FFFFFF]"
                    type="submit"
                  >
                    {btnLoadingProfileUpdate ? <Spin /> : "Update"}
                  </button>
                </div>
              </div>
            </form>
          </div>
          {/* Profile Update Section End */}

          {/* Password change section Start */}
          <div className="max-w-[43.75rem] w-full h-max rounded-[1rem] p-10 dashboardCard">
            <div className="flex justify-between items-center w-[100%]">
              <h2 className="text-[#364349] font-[500] text-[1.5625rem] leading-[2.1875rem]">
                {getLabelsBySelectedLang("Language")}
              </h2>
              <div>
                <BaseRadio
                  options={languageData}
                  selectedValue={selectedValue}
                  onRadioChange={handleRadioChange}
                  name="language"
                />
              </div>
            </div>

            <div className="bg-[#CED4DA] h-[.0625rem] w-full my-7"></div>

            <form onSubmit={updatePassword}>
              <h2 className="text-[#364349] leading-[2.1875rem] font-[500] text-[1.5625rem] ">
                {getLabelsBySelectedLang("Password")}
              </h2>

              <BaseInputField
                label="Current Password"
                type="password"
                placeholder="................."
                forLabel="currentPass"
                id="currentPass"
                name="currentPass"
                handleChange={handlePasswordChange}
                validationErrors={validationErrors.currentPass}
                value={passwordField.currentPass}
              />
              <BaseInputField
                label="New Password"
                type="password"
                placeholder="New Password"
                forLabel="NewPass"
                id="NewPass"
                name="NewPass"
                handleChange={handlePasswordChange}
                validationErrors={validationErrors.NewPass}
                value={passwordField.NewPass}
              />
              <BaseInputField
                label="Confirm Password"
                type="password"
                placeholder="Confirm Password"
                forLabel="ConfirmPass"
                id="ConfirmPass"
                name="ConfirmPass"
                handleChange={handlePasswordChange}
                validationErrors={validationErrors.ConfirmPass}
                value={passwordField.ConfirmPass}
              />

              <div className="flex items-center gap-3">
                <FaInfoCircle color="#677781" />
                <p className="text-[#677781] text-[.8125rem] font-[400] leading-[1.125rem]">
                  {getLabelsBySelectedLang(
                    "Password must contain a minimum of 8 characters"
                  )}
                  .
                </p>
              </div>

              <div className="flex gap-3 w-full mb-4">
                <div className="flex gap-3 ml-auto">
                  <button
                    className="px-[2rem] my-2 py-[.5rem] rounded-[.1875rem] bg-[#00B41A] text-white text-[.9375rem] leading-[1.375rem] font-[600] "
                    type="submit"
                  >
                    {btnLoadingPassword ? <Spin /> : "Update"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* Cards section End */}
      </div>
    </>
  );
};

export default Setting;
