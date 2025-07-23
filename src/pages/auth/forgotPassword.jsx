import React, { useState } from "react";
import { Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../../axios";
import { Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const date = new Date().getFullYear();

  const [btnLoading, setBtnLoading] = useState(false);

  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const count = useSelector((state) => state.user);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setInputValue(e.target.value);
  };
  const [inputValue, setInputValue] = useState(null);

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      setBtnLoading(true);
      const postDataResponse = await post("/forget-password", formData);

      if (postDataResponse.status && postDataResponse.status != "error") {
        toast.success(postDataResponse.message);
        setInputValue(null);
      } else {
        toast.error(postDataResponse.message);
      }

      setBtnLoading(false);
    } catch (error) {
      if (error.response.status === 422) {
        toast.error(error.response.data.message);
      }
      setBtnLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-[100vh] w-[100%] loginPageBg">
        <div className="max-w-[75rem] w-full h-[80%] rounded-[30px] mx-4 xl:mx-auto flex flex-col gap-4 items-center lg:flex-row lg:justify-between lg:gap-0">
          <div className="loginCardBg h-full w-[100%] lg:w-[50%] flex flex-col justify-between">
            <div className="p-[3.75rem] flex flex-col gap-6">
              <h1 className="font-[400] md:font-[700] text-white text-[1.875rem] md:text-[3.0625rem] leading-[1.875rem] md:leading-[3.5rem]">
                Forgot your password?
              </h1>

              <p className="text-[1.25rem] leading-[2.0625rem] text-white font-[400]">
                Enter your email address, if an account exists we‘ll send you a
                link to reset your password.
              </p>
            </div>

            <div className="p-[3.75rem]">
              <p className="text-[1rem] leading-[1rem] text-white font-[400]">
                &copy; {date} Passify. All Rights Reserved
              </p>
            </div>
          </div>

          <div className="w-[100%] h-full lg:w-[50%] bg-[#ffffff] rounded-[1.875rem] lg:rounded-none lg:rounded-r-[1.875rem] p-[3.75rem]">
            <div className="w-full flex justify-center mt-[1.125rem] items-center gap-[.9375rem]">
              <div className=" h-[.0625rem] w-full bg-[#C6C7C9]"></div>
              <p className="whitespace-nowrap text-[#6c757d]">
                Enter your email
              </p>
              <div className=" h-[.0625rem] w-full bg-[#C6C7C9]"></div>
            </div>

            <form
              className="flex flex-col justify-around h-full"
              onSubmit={submitForm}
            >
              <div>
                <div className="mb-5">
                  <label
                    htmlFor="email"
                    className="font-[500] text-[1rem] text-[#353f4f] leading-[1rem]"
                  >
                    Email address *
                  </label>
                  <Input
                    onChange={(e) => handleChange(e)}
                    placeholder="example@example.com"
                    id="email"
                    name="email"
                    className="text-[#353f4f] h-[3.75rem] bg-[#f5f6f8] font-[400] text-[1.125rem] leading-[1.125rem] border border-solid border-transparent py-[.3125rem] px-[1.25rem] rounded-[.375rem] transition-all duration-300 ease-in-out"
                    value={inputValue || ""}
                  />
                </div>

                <Link
                  to="/login"
                  className="text-[1.0625rem] font-[400] leading-[1.0625rem] text-[#f74780]"
                >
                  Never mind, I remembered!
                </Link>
              </div>

              <button
                type="submit"
                className="text-[#ffffff] leading-[1.125rem] text-[1.125rem] font-[500] bg-[#f74780] rounded-lg transition-all duration-400 ease-in-out w-full h-[3.75rem] "
              >
                {btnLoading ? <Spin /> : "Reset My Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
