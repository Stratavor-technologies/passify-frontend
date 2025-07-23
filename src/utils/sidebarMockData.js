import HomeIcon from "../Components/Icons/HomeIcon";
import MessageIcon from "../Components/Icons/MessageIcon";
import UserIcon from "../Components/Icons/UserIcon";
import CardIcon from "../Components/Icons/CardIcon";
import SettingIcon from "../Components/Icons/SettingIcon";
import LogoutIcon from "../Components/Icons/LogoutIcon";
export const sidebarData = [
  {
    icon: HomeIcon,
    title: "My Cards",
    color: "#677781",
    type: "solid",
    border: false,
    path: "/dashboard",
  },
  {
    icon: MessageIcon,
    type: "solid",
    title: "Start",
    border: false,
    color: "#677781",
    path: "/messages",
  },
  {
    icon: UserIcon,
    type: "solid",
    title: "Start",
    border: false,
    color: "#677781",
    path: "/subusers",
  },
  {
    icon: CardIcon,
    title: "Setting",
    color: "#677781",
    border: false,
    path: "/library",
  },
  {
    icon: SettingIcon,
    title: "Logout",
    color: "#677781",
    border: false,
    path: "/setting",
  },
  {
    icon: LogoutIcon,
    title: "Logout",
    color: "#ABB4B9",
    border: true,
  },
];
