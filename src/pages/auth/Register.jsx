import React, { useState, useEffect } from "react";
import BaseInput from "../../Components/reuseableComponents/BaseInput";
import BasePasswordField from "../../Components/reuseableComponents/BasePasswordField";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../../axios";
import { useAuth } from "../../Hooks/AuthHook";
import { Spin } from "antd";
import SelectField from "../../Components/reuseableComponents/Select";
import { toast } from "react-toastify";
import BaseInputNumber from "../../Components/reuseableComponents/BaseInputNumber";
import BaseInputField from "../../Components/reuseableComponents/BaseInputField";

const Register = () => {
  const navigate = useNavigate();
  const { getUserData } = useAuth();
  const [inputVal, setInputVal] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
  const [btnLoading, setBtnLoading] = useState(false);

  const { isLoggedIn } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputVal({ ...inputVal, [name]: value });

    setValidationErrors((prevErrors) => {
      return { ...prevErrors, [name]: undefined };
    });
  };




  const handleSelectChange = (name, value) => {
    setInputVal({ ...inputVal, [name]: value });

    setValidationErrors((prevErrors) => {
      return { ...prevErrors, [name]: undefined };
    });
  };

  const validationSchema = yup.object().shape({
    fullName: yup.string().required("Full Name is required"),
    OrganizationName: yup
      .string()
      .matches(/^[A-Za-z\s]+$/
        , 'Only alphabetic characters are allowed in Organization Name')
      .required('Organization Name is required'),
    email: yup
      .string()
      .required("email is required")
      .email("Please enter a valid email"),
    language: yup.string().required("Please select Language"),
    Phone: yup.string()
      .typeError("That doesn't look like a phone number")
      .matches(/^\d+$/, "A phone number can only contain digits")
      .min(4, "A phone number must have at least 4 characters")
      .max(17, "A phone number can have at most 17 characters")
      .required("A phone number is required"),
    OrganizationPhone: yup
      .string()
      .required("OrganizationPhone number is required"),

    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const signUData = {
    name: inputVal.fullName,
    email: inputVal.email,
    password: inputVal.password,
    language: inputVal.language,
    phone: inputVal.Phone,
    organization_name: inputVal.OrganizationName,
    organization_phone: inputVal.OrganizationPhone,
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      setBtnLoading(true);

      await validationSchema.validate(inputVal, { abortEarly: false });

      const signupResponse = await post("/sign_up", signUData);
      getUserData(signupResponse.token);
      if (signupResponse.status === "success") {
        localStorage.setItem("token", signupResponse.token);
        toast.success(signupResponse.message);

      } else {

        toast.error(signupResponse.message);
      }
      getUserData(signupResponse.token);
      navigate("/dashboard");

      setBtnLoading(false);
    } catch (err) {
      if (err.inner) {
        const errors = {};
        err.inner.forEach((error) => {
          errors[error.path] = error.message;
        });
        setValidationErrors(errors);
      }

      setBtnLoading(false);
    }
  };

  const LangOptions = [
    { value: "eng", label: "English" },
    { value: "ara", label: "عربي" },
  ];

  const redirectDashboard = () => {
    if(isLoggedIn){
      navigate("/dashboard");
    }
  }

  useEffect(() => {
    redirectDashboard();
  }, []);

  return (
    <>
      <div className="h-[100vh] w-full loginPageBg p-1 overflow-y-auto">
        <div className="w-[70%] mx-auto my-[3.125rem] rounded-[1.25rem] shadow-2xl loginCardBg flex flex-col-reverse lg:flex-row">
          <div className="w-[100%] lg:w-[50%] p-[3.75rem] bg-[#ffffff]">
            <form onSubmit={submitForm}>

              <BaseInputField
                label="Full Name *"
                type="text"
                placeholder="Tommy Vercetty"
                name="fullName"
                handleChange={handleChange}
                validationErrors={validationErrors.fullName}
              />


              <BaseInputField
                label="Organization Name *"
                type="text"
                placeholder="Tommy Vercetty"
                name="OrganizationName"
                handleChange={handleChange}
                validationErrors={validationErrors.OrganizationName}
              />

              <BaseInputField
                label="Email address *"
                type="email"
                placeholder="example@example.com"
                name="email"
                handleChange={handleChange}
                validationErrors={validationErrors.email}
              />

              <SelectField
                options={LangOptions}
                onChange={handleSelectChange}
                validationErrors={validationErrors.language}
                name="language"
                signupSelect="signupSelect"
                placeholder="Language *"
              />

              <BaseInputField
                label="Phone *"
                type="number"
                placeholder="+966-3243-3424"
                name="Phone"
                handleChange={handleChange}
                validationErrors={validationErrors.Phone}
              />

              <BaseInputField
                label="Organization Phone *"
                type="number"
                placeholder="+966-3243-3424"
                name="OrganizationPhone"
                handleChange={handleChange}
                validationErrors={validationErrors.OrganizationPhone}
              />

              <BaseInputField
                label="Password *"
                type="password"
                placeholder="min 8 character"
                name="password"
                handleChange={handleChange}
                validationErrors={validationErrors.password}
              />

              <BaseInputField
                label="Confirm Password *"
                type="password"
                placeholder="same as above"
                name="confirmPassword"
                handleChange={handleChange}
                validationErrors={validationErrors.confirmPassword}
              />



              <p className="text-[#6c757d] font-[400] text-[.9375rem]">
                By clicking “Create Account”, you agree to our
                <Link to="#" className="border-[#353f4f] border-b-2 text-[#353f4f] mx-1">
                  Terms
                </Link>
                and that you have read our
                <Link to="#" className="border-[#353f4f] border-b-2 text-[#353f4f] mx-1">
                  Privacy Policy
                </Link>
              </p>


              <button
                className="bg-[#e73971] h-[3.75rem] transition-all duration-400 ease-in-out rounded-lg text-white w-full my-3"
                type="submit"
              >
                {btnLoading ? <Spin /> : "Create Account"}
              </button>

              <p className="text-[#6c757d] text-[0.925rem]">
                Already have an account?
                <Link
                  to="/login"
                  className="text-[#e73971] font-bold border-b-2 border-[#e73971] mx-1"
                >
                  Log in
                </Link>
              </p>
            </form>
          </div>

          <div className="w-[100%] lg:w-[50%] p-[3.75rem] flex flex-col justify-between">
            <div>
              <h5 className="text-[0.85rem] text-white font-[600]">
                START FOR FREE
              </h5>

              <h1 className="font-[500] leading-[3.125rem] text-white text-[2.75rem]">
                Create <br /> an account
              </h1>
            </div>

            <p className="text-white">
              &copy; 2024 Passify All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
