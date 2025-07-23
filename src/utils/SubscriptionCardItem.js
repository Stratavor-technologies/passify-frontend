import CloseIcon from "../assets/images/svg/Close.svg";
import CheckIcon from "../assets/images/svg/Check.svg";
import { getLabelsBySelectedLang } from "./LabelsTranslation";

const cardItems = (plan) => [
  {
    svgIcon: plan?.card_design_count >= 1 ? CheckIcon : CloseIcon,
    textHeading: `${plan?.card_design_count} ${getLabelsBySelectedLang(
      "Card Design"
    )}`,
  },
  {
    svgIcon: plan?.location_count >= 1 ? CheckIcon : CloseIcon,
    textHeading: `${plan?.location_count} ${getLabelsBySelectedLang(
      "Location"
    )}`,
  },
  {
    svgIcon: plan?.user_count >= 1 ? CheckIcon : CloseIcon,
    textHeading: `${plan?.user_count} ${getLabelsBySelectedLang("Users")}`,
  },
  {
    svgIcon: plan?.exportable === null ? CloseIcon : CheckIcon,
    textHeading: getLabelsBySelectedLang("Data Export"),
  },
  {
    svgIcon: plan?.card_redesign_annual_count === null ? CloseIcon : CheckIcon,
    textHeading: getLabelsBySelectedLang(
      "Card re-design and customize (allowing two edit in a year)"
    ),
  },
  {
    svgIcon: plan?.is_notification_on === null ? CloseIcon : CheckIcon,
    textHeading: getLabelsBySelectedLang(
      "Enable push notifications for all customers."
    ),
  },
];

export { cardItems };
