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
import { get } from "../axios";
import {
    resetForm,
    saveFormValues,
    saveId,
} from "../store/reducers/designSlice";
import { stepperData } from "../utils/stepperData";
import { getLabelsBySelectedLang } from "../utils/LabelsTranslation";
import FieldMobileComp from "../Components/Mobile_Screens/FieldMobileComp";

const Design = () => {
    const dispatch = useDispatch();
    //const savedFormData = useSelector((state) => state.design);

    const navigate = useNavigate();
    const { id } = useParams();

    const [tab, setTab] = useState(0);
    const [detailMobileData, setDetailMobileData] = useState({});
    const [nodeElement, setNodeElement] = useState({});
    const [FieldMobileData, setFieldMobileData] = useState({});
    const [mobileViewData, setMobileViewData] = useState();

    const userId = localStorage.getItem("userId");

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

    const getAlldata = async () => {
        if (id) {
            try {
                const response = await get(`/library/details/${id}`);
                console.log("response: ", response);
                const data = {
                    ...response?.data,
                    reward_at_stamp_no: JSON?.parse(response?.data?.reward_at_stamp_no),
                    reward_type: response?.data?.reward_type === "multi" ? 2 : 1,
                };
                setMobileViewData(data);
                dispatch(saveFormValues(data));

            } catch (error) {
                toast.error(error?.response?.data?.message);
            }
        }
    };

    useEffect(() => {
        getAlldata();
        // return () => dispatch(resetForm());
    }, [tab]);

    useEffect(() => {
        dispatch(saveId(id));
    }, [id]);

    useEffect(() => {
        getAlldata();
        // return () => dispatch(resetForm());
    }, []);

    return (
        <>
            <div className="dashboard_screen w-[100%] px-5 md:px-[6.125rem] md:pr-[6rem] overflow-auto scroll-hidden">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 my-[.75rem] bg-white py-[2rem] rounded-[.75rem] px-[1.5rem]">
                    <div className="flex justify-center flex-row flex-wrap">
                        {stepperData.map((item, index) => (
                            <div>
                                {index == 0 && (
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
                                )}
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
                    <div className="content lg:w-[70%]  overflow-y-auto scroll-hidden">
                        {tab === 0 && (
                            <div>
                                {mobileViewData && (
                                    <DesignTabs
                                        type="template"
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
                                <LocationTabs setTab={setTab} tab={tab} refresh={getAlldata} />
                            </div>
                        )}
                    </div>
                    <div className="mobileView w-[30%] hidden lg:block ">
                        <div className="bg-white w-[100%] flex justify-center rounded-[1rem] overflow-y-auto scroll-hidden mobileScreen">
                            {mobileViewData?.card_bg_color && (
                                <Mobile>
                                    {tab === 0 && (
                                        <DesignMobileComp
                                            mobileViewData={mobileViewData}
                                            id={id}
                                            setNodeElement={setNodeElement}
                                        />
                                    )}
                                    {tab === 1 && (
                                        <>
                                            <DetailMobileComp detailMobileData={detailMobileData} />
                                        </>
                                    )}
                                    {tab === 2 && (
                                        <>
                                            <FieldMobileComp
                                                mobileViewData={mobileViewData}
                                                FieldViewData={FieldMobileData}
                                            />
                                        </>
                                    )}
                                </Mobile>
                            )}
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default Design;
