import React, { useEffect, useState } from "react";
import EyeIcon from "../../Components/Icons/EyeIcon";
import DeleteIcon from "../../Components/Icons/DeleteIcon";
import PencilIcon from "../../Components/Icons/PencilIcon";
import { Link } from "react-router-dom";
import Mobile from "../reuseableComponents/Mobile";
import CardDesign from "./CardDesign";
import defaultCardStrip from "../../assets/images/svg/defaultCardStrip.svg";
import { useDispatch } from "react-redux";
import { saveId } from "../../store/reducers/designSlice";
import DesignMobileComp from "../Mobile_Screens/DesignMobileComp";
import { post2 } from "../../axios";
import { toast } from "react-toastify";

const BaseMobileCard = ({ eyeIcon, id, index, cardData, handalDeleted }) => {
  const [activeCardId, setActiveCardId] = useState(1);
  const [reDesignAccess, setReDesignAccess] = useState();
  const dispatch = useDispatch();

  const fetchUserInfo = async () => {
    const responseUser = await post2("user/getUserInfo");
    if (responseUser.status === "success") {
        var reDesign = responseUser.data?.subscription?.plan?.card_redesign_annual_count;
        setReDesignAccess(reDesign);
    
    } else if (responseUser.status === "error") {
      toast.error(responseUser.message);
    }

  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const imagesData = [
    {
      id: 1,
      img: <PencilIcon />,
      type: "edit",
      color: "#ffa900",
      path: reDesignAccess == null ? `#` : `/design/${id}`,
    },

    ...(eyeIcon
      ? [
        {
          id: 2,
          img: <EyeIcon />,
          type: "view",
          color: "#7249cb",
          bgColor: "#f3eeff",
          path: `/overview/${id}`,
        },
      ]
      : []),
    {
      id: 3,
      img: <DeleteIcon />,
      type: "del",
      color: "#ff3e44",
      bgColor: "#ffeced",
      path: "#",
    },
  ];

  const deleteItem = async (id) => {
    try {
      const response = await post2(
        `pass/deleteById/${id}`
      );
      console.log(response.status);
      if (response.status === "success") {
        handalDeleted(id, index);
        toast.success(response.message);
      } else {
        console.error("Error fetching card data:", response.message);
      }
    } catch (error) {
      console.error("Error fetching card data:", error);
    } finally {
    }
  }

  const handleBtnClick = (id, type) => {
    if(type === "edit" && reDesignAccess == null || type === "edit" && reDesignAccess == 0){
      toast.error("Upgrade Your Plan");
    }

    if (type == 'del') {
      deleteItem(id);
    } else {
      setActiveCardId(id);
    }
  };

  return (
    <div className="rounded-xl p-[30px]">
      <Mobile>
        <CardDesign cardData={cardData} />
        <div className="p-5 flex items-center justify-center gap-5 card_action_bar">
          {imagesData.map((item) => (
            <Link to={item.type === item.type ? item.path : ""} key={item.id}>
              <div
                className={`w-[3.5rem] h-[3.5rem] rounded-full flex justify-center items-center cursor-pointer`}
                style={{
                  backgroundColor:
                    activeCardId === item.id && item.type === "edit"
                      ? "#fff7e6"
                      : activeCardId === item.id && item.type === "view"
                        ? "#f3eeff"
                        : activeCardId === item.id && item.type === "del"
                          ? "#ffeced"
                          : "#edeff0",
                }}
                onClick={() => {
                  handleBtnClick(id, item.type);
                  if (
                    activeCardId &&
                    item.id === activeCardId &&
                    item.type === "edit"
                  ) {
                    dispatch(saveId(id));
                  }
                }}
              >
                {React.cloneElement(item.img, {
                  color: activeCardId === item.id ? item.color : "#677781",
                })}
              </div>
            </Link>
          ))}
        </div>
      </Mobile>
      {/* <img src={cardImage} alt="card img" className="object-cover" /> */}
    </div>
  );
};

export default BaseMobileCard;
