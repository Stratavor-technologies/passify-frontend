import SubUser from "../pages/SubUser.jsx";
import Setting from "../pages/Setting.jsx";
import Dashboard from "../pages/Dashboard";
import Create from "../Components/Model.jsx";
import Design from "../pages/Design.jsx";
import Template from "../pages/Template.jsx";
import Library from "../pages/Library.jsx";
import Subscription from "../pages/Subscription.jsx";
import MyCards from "../pages/MyCards.jsx";
import Overview from "../pages/Overview.jsx";
import Stamps from "../pages/Stamps.jsx";
import Messages from "../pages/Messages.jsx";

export const appRoutes = [
  {
    path: "/dashboard",
    element: Dashboard,
  },
  {
    path: "/create",
    element: Create,
  },
  {
    path: "/messages",
    element: Messages,
  },
  {
    path: "/design",
    element: Design,
  },
  {
    path: "/subusers",
    element: SubUser,
  },
  {
    path: "/setting",
    element: Setting,
  },
  {
    path: "/library",
    element: Library,
  },
  {
    path: "/subscription",
    element: Subscription,
  },
  {
    path: "/mycards",
    element: MyCards,
  },
  {
    path: "/overview/:id",
    element: Overview,
  },
  {
    path: "/design/:id",
    element: Design,
  },
  {
    path: "/template/:id",
    element: Template,
  },
  {
    path: "/stamps",
    element: Stamps,
  },
];
