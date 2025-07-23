import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import DesignTabs from "../Components/DesignCoffee/DesignTabs";
import DetailsTab from "../Components/DesignCoffee/DetailsTab";
import FieldTabs from "../Components/DesignCoffee/FieldTabs";
import LocationTabs from "../Components/DesignCoffee/LocationTabs";
import DesignMobileComp from "../Components/Mobile_Screens/DesignMobileComp";
import DetailMobileComp from "../Components/Mobile_Screens/DetailMobileComp";
import CommonButton from "../Components/reuseableComponents/BaseButton";
import Mobile from "../Components/reuseableComponents/Mobile";
import { get, post, post2 } from "../axios";
import { resetForm, saveFormValues, saveId, } from "../store/reducers/designSlice";
import { stepperData } from "../utils/stepperData";
import { getLabelsBySelectedLang } from "../utils/LabelsTranslation";
import FieldMobileComp from "../Components/Mobile_Screens/FieldMobileComp";
import AppleIcon from "../Components/Icons/AppleIcon";
import AndroidIcon from "../Components/Icons/AndroidIcon";
import NotificationIcon from "../Components/Icons/NotificationIcon";
import NotificationView from "../Components/Mobile_Screens/NotificationView";

const Design = () => {
  const dispatch = useDispatch();
  const savedFormData = useSelector((state) => state.design.formValues);
  const navigate = useNavigate();
  const { id } = useParams();

  const [tab, setTab] = useState(0);
  const [detailMobileData, setDetailMobileData] = useState({});
  const [nodeElement, setNodeElement] = useState({});
  const [FieldMobileData, setFieldMobileData] = useState({});
  const [mobileViewData, setMobileViewData] = useState();

  const userId = localStorage.getItem("userId");

  const [currentDevice, setCurrentDevice] = useState("apple");
  const [isNotification, setIsNotification] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  localStorage.setItem("tabIndex", tab);

  const handleChangeTab = (index) => {
    if (index && !userId) {
      toast.error("Please submit the Design tab first.");
      return;
    }
    setTab(index);
  };

  const handleDesignChange = (form) => {
    setMobileViewData(form);
  };
  const handleDetailChange = (detailForm) => {
    setDetailMobileData(detailForm);
  };

  const handleFieldChange = (fieldForm) => {
    setFieldMobileData(fieldForm);
  };

  const handleButtonClick = () => { };

  const handleSaveClick = () => {
    if (userId) {
      navigate("/dashboard");
    } else {
      toast.error("create pass first")
    }
  };

  const [currentUserData, setCurrentUserData] = useState([]);
  const [locationAccess , setlocationAccess] = useState();


  const fetchUserInfo = async () => {
    const responseUser = await post2("user/getUserInfo");
    if (responseUser.status === "success") {
      setCurrentUserData(responseUser.data);
      if(!id){
        var cardDesign = responseUser.data?.subscription?.plan?.card_design_count; 
        const responsecard = await get(`pass/readByUser?offset=10&limit=0`);
        const passDataLegth = responsecard.data?.passData.length;
        
        if(cardDesign <= passDataLegth){
          navigate("/dashboard");
          toast.error(`You can create only  ${cardDesign} Cards` );
        }
       
      }
      var location = responseUser.data?.subscription?.plan?.location_count;
      setlocationAccess(location);

    } else if (responseUser.status === "error") {
      toast.error(responseUser.message);
    }
  };

  const [businessName, setBusinessName] = useState("");
  const getAlldata = async () => {
    if (id) {
      try {
        const response = await get(`/pass/readById/${id}`);
        const data = {
          ...response?.data,
          reward_at_stamp_no: JSON?.parse(response?.data?.reward_at_stamp_no),
          reward_type: response?.data?.reward_type === "multi" ? 2 : 1,
        };
        setMobileViewData(data);
        setBusinessName(data.businessName);

        dispatch(saveFormValues(data));

      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    } else {
      setMobileViewData(savedFormData);
      dispatch(saveFormValues(savedFormData));
    }
  };

  const changeCurrentDevice = (value) => {
    setCurrentDevice(value);
    setIsNotification(false);
  }

  const changeNotification = () => {
    setCurrentDevice("apple");
    setIsNotification(true);
  }

  useEffect(() => {
    getAlldata();
    // return () => dispatch(resetForm());
  }, [tab]);

  useEffect(() => {
    dispatch(saveId(id));
  }, [id]);

  useEffect(() => {
    fetchUserInfo();

    setTimeout(() => {
      setIsPageLoaded(true);
    }, 1000);
  }, []);

  return (
    <>
      <div className="dashboard_screen w-[100%] px-5 md:px-[6.125rem] overflow-auto scroll-hidden">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 my-[.75rem] bg-white py-[2rem] rounded-[.75rem] px-[1.5rem]">
          <div className="flex justify-center flex-row flex-wrap">
            {stepperData.map((item, index) => (
              <div
                key={index}
                className={`flex items-center justify-center gap-2 focus-within:bg-[#e7e7e7] cursor-pointer p-2
                                ${tab === index && "text-[#7249CB]"}
                                `}
                onClick={() => handleChangeTab(index)}
              >
                <item.icon fill={tab === index ? "#7249CB" : item.color} />
                <h3>{getLabelsBySelectedLang(item.heading)}</h3>
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <CommonButton
              onClick={handleButtonClick}
              label="Save Draft"
              className="px-[1.5rem] py-[.5rem] bg-[#EDEFF0] hover:bg-[#EDEFF0] text-[#677781] rounded-[.1875rem] font-medium"
            />
            <CommonButton
              onClick={handleSaveClick}
              label="Save"
              className=" px-[1.5rem] py-[.5rem] bg-[#00B41A] hover:bg-[#00B41A]  text-[#ffffff] rounded-[.1875rem] font-medium"
            />
          </div>
        </div>

        <div className="flex stepperHeight md:gap-[2rem]">
          <div className="content lg:w-[70%] md:w-[100%] overflow-y-auto scroll-hidden">
            {tab === 0 && (
              <div>
                {mobileViewData && (
                  <DesignTabs
                    type="design"
                    handleDesignChange={handleDesignChange}
                    mobileViewData={mobileViewData}
                    setTab={setTab}
                    tab={tab}
                  />
                )}
              </div>
            )}
            {tab === 1 && (
              <div>
                <DetailsTab
                  handleDetailChange={handleDetailChange}
                  setTab={setTab}
                  tab={tab}
                />
              </div>
            )}
            {tab === 2 && (
              <div>
                <FieldTabs
                  handleFieldChange={handleFieldChange}
                  setTab={setTab}
                  tab={tab}
                />
              </div>
            )}
            {tab === 3 && (
              <div>
                <LocationTabs setTab={setTab} tab={tab} refresh={getAlldata} locationAccess={locationAccess}/>
              </div>
            )}
          </div>
          <div className="mobileView w-[30%] hidden lg:block ">
              <div className="bg-white w-[100%] flex justify-center gap-2.5 rounded-[1rem] overflow-y-auto scroll-hidden mobileScreen">
                {mobileViewData?.card_bg_color && (
                  <Mobile currentDevice={currentDevice} isChangeAble={true}>
                    {!isNotification ? <>
                        {(tab === 0 || tab == 3) && (
                          <DesignMobileComp
                            mobileViewData={mobileViewData}
                            id={id}
                            setNodeElement={setNodeElement}
                            currentDevice={currentDevice}
                            currentUserData={currentUserData}
                            businessName={businessName}
                          />
                        )}
                        {tab === 1 && (
                          <>
                            <DetailMobileComp detailMobileData={detailMobileData} currentDevice={currentDevice} />
                          </>
                        )}
                        {tab === 2 && (
                          <>
                            <FieldMobileComp
                              mobileViewData={mobileViewData}
                              FieldViewData={FieldMobileData}
                              currentDevice={currentDevice}
                              businessName={businessName}
                            />
                          </>
                        )}
                      </> : <>
                      <NotificationView mobileViewData={mobileViewData} />
                      </>
                    }
                    
                  </Mobile>
                )}

              {isPageLoaded && (
                <div className="changeMobileIcons w-[12%] flex flex-column">
                  <button className={`appleIcon changeDeviceBtn ${(currentDevice === "apple" && isNotification !== true) ? "active" : ""}`} onClick={(event) => changeCurrentDevice("apple")}>
                    <AppleIcon />
                  </button>

                  <button className={`androidIcon changeDeviceBtn ${currentDevice === "android" ? "active" : ""}`} onClick={(event) => changeCurrentDevice("android")}>
                    <AndroidIcon />
                  </button>

                  <button className={`notificationIcon changeDeviceBtn ${isNotification ? "active" : ""}`} onClick={changeNotification}>
                    <NotificationIcon />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Design;
