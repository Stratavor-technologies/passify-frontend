import React, { useEffect, useState } from "react";
import { Table, Space, Modal, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Model from "../Components/Model";
import { get } from "../axios";
import { post, post2 } from "../axios";
import { FaPen } from "react-icons/fa6";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { getLabelsBySelectedLang } from "../utils/LabelsTranslation";
import Mobile from "../Components/reuseableComponents/Mobile";
import RadioGroup from "../Components/reuseableComponents/BaseRadio";
import BaseTextArea from "../Components/reuseableComponents/BaseTextArea";
import { messageOptions } from "../utils/RewardOption.js";
import Selectbox from "../Components/reuseableComponents/Selectbox.jsx";
import SelectField from "../Components/reuseableComponents/Select.jsx";
import Select2 from "../Components/reuseableComponents/Select2.jsx";
import CommonButton from "../Components/reuseableComponents/BaseButton.jsx";
import arrowBack from "../assets/images/svg/arrowBack.svg";
import { CiSearch } from "react-icons/ci";
import Categoryicon from "../Components/Icons/Categoryicon";
import { defaultImageConfig } from "../utils/config";


const Messages = () => {
    const [data, setData] = useState([]);
    const [passList, setPassList] = useState([]);
    const [selectReadioValue, setSelectReadioValue] = useState(1);
    const [filteredData, setFilteredData] = useState([]);
    const [toggleModel, setToggleModel] = useState(false);
    const [editUserById, setEditUserById] = useState(null);
    const [searchInput, setSearchInput] = useState("");
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 5,
        },
    });

    const messageSent = getLabelsBySelectedLang("Message Sent");
    const customerTypeRequired = getLabelsBySelectedLang("Customer type is required");
    const customerNameRequired = getLabelsBySelectedLang("Customer name is required");
    const planUpgradeNotification = getLabelsBySelectedLang("Enable push notifications for all customers");


    const customer_type_options = [
        {
            id: "1",
            label: "All",
            value: "1"
        },
        {
            id: "2",
            label: "Most Visited",
            value: "2"
        },
        {
            id: "3",
            label: "Least Visited",
            value: "3"
        },
        {
            id: "4",
            label: "Recently Visited",
            value: "4"
        }
    ];
    const columns = [
        {
            title: "#",
            dataIndex: "id",
            key: "id",
            sorter: true,
        },
        {
            title: getLabelsBySelectedLang("Date & Time"),
            dataIndex: "created_at",
            key: "created_at",
            sorter: true,
        },
        {
            title: getLabelsBySelectedLang("Message"),
            dataIndex: "message",
            key: "message",
            sorter: true,
        },
        {
            title: getLabelsBySelectedLang("Segment"),
            dataIndex: "segment",
            key: "segment",
            sorter: true,
        },
        {
            title: getLabelsBySelectedLang("Reach"),
            dataIndex: "reach",
            key: "reach",
            sorter: true,
        }
    ];

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams((prevParams) => ({
            ...prevParams,
            pagination,
            filters,
            ...sorter,
        }));

        if (pagination.pageSize !== prevParams.pagination?.pageSize) {
            setData([]);
        }
    };

    const [btnLoading, setBtnLoading] = useState(false);

    const defaultFormValues = {"type": 1};
    const [formValues, setFormValues] = useState(defaultFormValues);
    const [customerMessage, setCustomerMessage] = useState("");
    const [selectedCardId, setSelectedCardId] = useState("");
    const [vendorCustomers, setVendorCustomers] = useState([]);

    const handleRadioChange = (event) => {
        // console.log("brefore formValues: ", parseInt(event.target.value));

        setSelectReadioValue(parseInt(event.target.value));

        if(parseInt(event.target.value) === 1){
            var removed = delete formValues.customerId;
            setFormValues(removed);
        }else{
            var removed = delete formValues.customer_type;
            setFormValues(removed);

        }
    };

    const [selectedBusinessName, setSelectedBusinessName] = useState([]);
    const [notificationIcon, setNotificationIcon] = useState("");
    
    const handleSelectChange = (name, value, businessName, icon_image) => {
        let updateTabValue = {
            ...formValues,
            [name]: value,
        };

        if(name === "passId"){
            setSelectedCardId(value);
            setSelectedBusinessName(businessName);
            setNotificationIcon(icon_image);
        }

        setFormValues(updateTabValue);
    };
    
    const handleMessageChange = (event) => {
        let updateTabValue = {
            ...formValues,
            [event.target.name]: event.target.value,
        }

        setCustomerMessage(event.target.value);
        
        setFormValues(updateTabValue);
    }
    
    const getAllpasses = async () => {
        try {
            const response = await get(`/pass/readByUser?offset=0&limit=6`);
            setPassList(response?.data.passData);
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };

    const [ notificationAccess, setNotificationAccess ] = useState(false);

    const sendMessage = async () => {
        setBtnLoading(true);
        try{

            if(formValues?.type === 1){
                if(!notificationAccess){
                    toast.error(planUpgradeNotification);
                    setBtnLoading(false);
                    return  false;
                } 
            }
                
            if(parseInt(formValues?.type) === 1 && formValues?.customer_type === undefined){
                toast.error(customerTypeRequired);
                setBtnLoading(false);
                return false;      
            }
            
            
            if(parseInt(formValues?.type) === 2 && formValues?.customerId === undefined){
                toast.error(customerNameRequired);
                setBtnLoading(false);
                return false;      
            }

            var response = await post2(`/loyalty/card/sendMessage`, formValues);

            if(response.status === true){
                setFormValues(defaultFormValues);
                setCustomerMessage("");
                setSelectedCardId("");
                setBtnLoading(false);
                getMessagesHistory();
                toast.success(messageSent);

            }

        } catch (err){
            toast.error(err?.response?.data?.message);
            setBtnLoading(false);
        }
    }

    const getVendorUsers = async () => {
        try {
            var response = await get(`/message/user/${selectedCardId}`);
            if(response.status === "success"){
                setVendorCustomers(response.data);
            }
        } catch (err){
            toast.error(err?.response?.data?.message);
        }
    }

    const [ messageHistory, setMessageHistory ] = useState([]);


    const getMessagesHistory = async () => {
        try {
            var response = await get('/message/history');

            if(response.status === "success"){
                setMessageHistory(response?.data);
            }
        } catch (err){
            toast.error(err?.response?.data?.message);
        }   
    }


    const fetchUserInfo = async () => {
        const responseUser = await post2("user/getUserInfo");
        if (responseUser.status === "success") {
            var notifi = responseUser.data?.subscription?.plan?.is_notification_on;
            if(notifi){
                setNotificationAccess(true);
            }
        } else if (responseUser.status === "error") {
          toast.error(responseUser.message);
        }
      };



    useEffect(() => {
        let updateTabValue = {
            ...formValues,
            ["type"]: selectReadioValue,
        };
        
        setFormValues(updateTabValue);
    }, [selectReadioValue]);

    useEffect(() => {
        if(selectedCardId != ""){
            getVendorUsers();
        }
    }, [selectedCardId]);

    useEffect(() => {
        fetchUserInfo();
        getAllpasses();
        getMessagesHistory();
    }, []);










    return (
        <>
            <div className="dashboard_screen w-[100%] px-5 md:px-[6.125rem] md:pr-[6rem] overflow-auto scroll-hidden">
                <div className="flex stepperHeight md:gap-[2rem] mt-8">
                    <div className="w-full">
                        <div className="bg-[#ffffff] rounded-[1rem] p-[2rem] mb-8">
                            <div className="justify-between pb-[2rem]">
                                <h1 className="text-[1.875rem] font-[500] text-[#364349]">
                                    {getLabelsBySelectedLang("Send Message to Customers")}
                                </h1>
                                <p className="text-[1.2rem]">{getLabelsBySelectedLang("Send Message Description")}</p>
                            </div>
                            <hr className="flex justify-between h-[.125rem]"></hr>
                            <div className="flex items-center gap-6 my-8">
                                <h1 className="text-[#364349] text-[1.2rem] leading-[1.5rem] font-[500]">
                                    {getLabelsBySelectedLang("Who")}
                                </h1>

                                <RadioGroup
                                    options={messageOptions}
                                    selectedValue={parseInt(formValues?.type)}
                                    onRadioChange={handleRadioChange}
                                    name="type"
                                />

                            </div>

                            <div className="flex gap-6 mb-8">
                                <div className="w-[33.3%]">
                                    <h1 className="text-[#364349] text-[1.2rem] font-[500] mb-2">
                                        {getLabelsBySelectedLang("Select the card")}
                                    </h1>
                                    <Selectbox
                                        selectedValue={formValues?.passId}
                                        options={passList}
                                        onChange={handleSelectChange}
                                        name="passId"
                                        selectType="pass"
                                        isCardSelection={true}
                                    />
                                </div>

                                <div className="w-[33.3%]">
                                    <h1 className="text-[#364349] text-[1.2rem] font-[500] mb-2">
                                        {getLabelsBySelectedLang("Customer Type")}
                                    </h1>
                                    <SelectField
                                        selectedValue={formValues?.customer_type}
                                        options={customer_type_options}
                                        onChange={handleSelectChange}
                                        name="customer_type"
                                        disabled={parseInt(formValues?.type) === 2 ? true : false}
                                    />
                                </div>
                                <div className="w-[33.3%]">
                                    <h1 className="text-[#364349] text-[1.2rem] font-[500] mb-2">
                                        {getLabelsBySelectedLang("Customer Name")}
                                    </h1>

                                    <Select2
                                        selectedValue={formValues?.customerId}
                                        options={vendorCustomers}
                                        onChange={handleSelectChange}
                                        name="customerId"
                                        disabled={parseInt(formValues?.type) === 1 ? true : false}
                                    /> 
                                </div>
                            </div>
                            <div>
                                <h1 className="text-[#364349] text-[1.2rem] font-[500] mb-2">
                                    {getLabelsBySelectedLang("Message")}
                                </h1>
                                <BaseTextArea
                                    value={formValues?.message}
                                    placeholder="How your customers earn 1 stamp..."
                                    name="message"
                                    onChange={handleMessageChange}
                                    // value={customerMessage}
                                />
                            </div>
                            <div className="w-full flex justify-end">
                                <CommonButton
                                    btnLoading={btnLoading}
                                    label="Next: Details"
                                    className="flex items-center gap-2 bg-[#00B41A] text-[#FFFFFF] py-[.5rem] px-[1.5rem] mt-6 rounded-[.1875rem]"
                                    icon={arrowBack}
                                    disabled={btnLoading}
                                    onClick={sendMessage}
                                />
                            </div>
                        </div>
                        <div className="mb-8">
                            <div className="bg-[#ffffff] rounded-[1rem] p-[2rem]">
                                <div className="justify-between pb-[2rem]">
                                    <h1 className="text-[1.875rem] font-[500] text-[#364349]">
                                        {getLabelsBySelectedLang("Push Message History")}
                                    </h1>
                                </div>
                                <div className="w-[100%]">
                                    <div className="flex justify-end py-4">
                                        <Input
                                            className="rounded-[5rem] py-2"
                                            placeholder="search..."
                                            onChange={(e) => setSearchInput(e.target.value)}
                                            style={{ width: 300, color: '#ced4da' }}
                                            value={searchInput}
                                            // enterButton={false}
                                            prefix={<CiSearch style={{ transform: 'rotate(90deg)', color: '#ced4da', fontSize: "1.25rem" }} />}
                                        />
                                    </div>

                                    <Table
                                        bordered
                                        columns={columns}
                                        rowKey={(record) => record.id}
                                        dataSource={messageHistory}
                                        pagination={{
                                            ...tableParams.pagination,
                                            showTotal: (total, range) =>
                                                `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                                            position: ['bottomRight']
                                        }}
                                        onChange={handleTableChange}
                                        rowClassName="custom-row"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mobileView w-[30%] hidden lg:block ">
                        <div className="bg-white w-[100%] justify-center rounded-[1rem] overflow-y-auto scroll-hidden mobileScreen p-5">
                            <h1 className="text-[1.6rem] font-[500] text-[#364349]">
                                Notification View
                            </h1>
                            <Mobile bg="#000">
                                <div className="notification_preview">
                                    <div className="notification_icon">
                                        <div className="circle">
                                            <div className="rounded-full flex justify-center items-center scale-[0.6]">
                                                {!notificationIcon ? <>
                                                    <Categoryicon icon="Tea" color="#000" width={20} height={20} />
                                                </> : <>
                                                <img
                                                    src={defaultImageConfig.Base_URL + notificationIcon}
                                                />
                                                </>}
                                            </div>
                                        </div>

                                        <div className="org_name">
                                            {selectedBusinessName ? selectedBusinessName : "Your Business Name"}
                                        </div>
                                    </div>
                                    <div className="notification_text">{formValues?.message ? formValues?.message : "Your notification message goes here..."}</div>
                                </div>
                            </Mobile>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Messages;
