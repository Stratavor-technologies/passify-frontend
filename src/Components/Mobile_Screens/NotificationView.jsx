import { useEffect, useState } from "react";
import Categoryicon from "../Icons/Categoryicon";
import { defaultImageConfig } from "../../utils/config";

const NotificationView = ({mobileViewData}) => {

    console.log("mobileViewData: ", mobileViewData);
    const [businessName, setBusinessName] = useState("Your Business Name");

    const getBusinessName = () => {
        if(document.querySelector('input[name="businessName"]') !== null){
            setBusinessName(document.querySelector('input[name="businessName"]').value);
        }
    }

    useEffect(() => {
        getBusinessName();
    });

    return (
        <div className="notification_preview">
            <div className="notification_icon">
                <div className="circle">
                    <div className="rounded-full flex justify-center items-center scale-[0.6]">
                        {/* <Categoryicon icon="Tea" color="#000" width={20} height={20} /> */}
                        <img 
                            src={defaultImageConfig.Base_URL + mobileViewData.icon_image}
                        />
                    </div>
                </div>

                <div className="org_name">
                    {businessName}
                </div>
            </div>
            <div className="notification_text">Your notification message goes here...</div>
        </div>
    )
}

export default NotificationView;