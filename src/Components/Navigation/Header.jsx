import React, { useState, useEffect } from "react";
import passifyLogo from "../../assets/images/svg/passifyLogo.svg";
import userIcon from "../../assets/images/svg/userIcon.svg";
import SelectField from "../reuseableComponents/Select";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserLang } from "../../store/reducers/userSlice";
import { getLabelsBySelectedLang } from "../../utils/LabelsTranslation";
import { post2 } from "../../axios";

const Header = () => {

  const userLang = useSelector((state) => state.user.userLang);
  const [planStatus, setPlanStatus] = useState("");
  const [day, setDay] = useState("");
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  
  const getMessages = {
    "trialsDaysMessage": getLabelsBySelectedLang("Days Left On Trial"),
    "upgradePlanMessage": getLabelsBySelectedLang("Upgrade Plan"),
    "daysTrialExpired": getLabelsBySelectedLang("Days trial plan is expired")
    // "daysLeftCurrentPlan": getLabelsBySelectedLang("Days trial plan is expired")
  }

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const LangOptions = [
    {
      label: "English",
      value: "eng"
    },
    {
      label: "عربي",
      value: "ara",
    },
  ];

  const handleSelectChange = (name, value) => {
    dispatch(setUserLang(value));
  };


  const navigateToSubscription = () => {
    navigate("/subscription");

  }

  const [ planData, setPlanData ] = useState();

  const fetchUserInfo = async () => {
    const responseUser = await post2("user/getUserInfo");
    if (responseUser.status === "success") {
      if (!userLang) {
        if (responseUser.data.language) {
          dispatch(setUserLang(responseUser.data.language));
          // useSelector(responseUser.data.language);
        }
      } else {
        dispatch(setUserLang(userLang));
      }
      setPlanStatus(responseUser.data.status);
      setDay(responseUser.data.day);
      setPlanData(responseUser.data?.subscription?.plan);
      setIsDataLoaded(true);
      if (responseUser.data.status == 3 || responseUser.data.status == 4) {
        if (window.location.pathname != "/subscription") {
          navigate("/subscription");
        }
      }
    } else if (responseUser.status === "error") {
      toast.error(responseUser.message);
    }

  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  
  return (
    <>
        <nav className="py-[1rem] px-[1.5rem] md:px-0 md:pl-[6.25rem] flex justify-between items-center header-nav">
          <img src={passifyLogo} alt="logo" className="flex" />
          {(planStatus == 1 || planStatus == 2) ? (
            <div className="hidden md:flex items-center gap-2 bg-[#FFF7E6] px-[1rem] py-[.625rem] rounded-[.25rem]">
              {planStatus == 2 && (
                <p className="text-[.9375rem] text-[#364349]">
                  {planData?.plan ? ( <>
                    {day} Days Left on current plan
                  </> ) : ( <>
                    {day} {getMessages.trialsDaysMessage}
                  </> )}
                  
                </p>
              )}
                <button className="bg-[#FFA900] text-[.8125rem] text-white rounded-[.1875rem] py-[.3125rem] px-[.75rem]"
                  onClick={() => navigateToSubscription()}
                >
                  {getMessages.upgradePlanMessage}
                </button>
            </div>
          ) : (
            <p className="text-[.9375rem] text-[#364349]">
              {getMessages.daysTrialExpired}
            </p>
          )}

          <div className="flex items-center gap-4  md:mr-[6.25rem]">
            <Link to="/setting">
              <div className="bg-[#F3EEFF] p-[.75rem]  rounded-full w-[40px] h-[40px] flex items-center ">
                <img src={userIcon} alt="userIcon" />
              </div>
            </Link>
            <div className="w-[100px]">
              <SelectField
                options={LangOptions}
                onChange={handleSelectChange}
                name="lang"
                selectedValue={userLang}
              />
            </div>
          </div>
        </nav >
      
    </>
  );
};

export default Header;
