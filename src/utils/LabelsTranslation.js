import engLabels from "./language/eng.json";
import araLabels from "./language/ara.json";
import { useSelector } from "react-redux";

export const getLabelsBySelectedLang = (label) => {
  const userLang = useSelector((state) => state.user.userLang);
  return userLang == "eng" ? engLabels[label] : araLabels[label];
};
