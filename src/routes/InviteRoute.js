import DashboardIcon from "../assets/DashboardIcon.svg";
import DashboardIconActive from "../assets/DashboardIconActive.svg";
import SettingsIcon from "../assets/SettingsIcon.svg";
import SettingsIconActive from "../assets/SettingsIconActive.svg";
import SignOutIcon from "../assets/SignOutIcon.svg";
import ChatIconActive from "../assets/ChatIconActive.svg";
import ChatIcon from "../assets/ChatIcon.svg";
import reportActive from "../assets/report-activeIcone.png";
import reportGrey from "../assets/grey1.png";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import ReportView from "../pages/ReportView";
import handleSignout from "../components/utils/handleSignout";


const InviteRoute = [
  {
    label: "Dashboard",
    path: "/",
    icon: DashboardIcon,
    activeIcon: DashboardIconActive,
    component: Dashboard,
  },
  {
    label: "Rapports",
    path: "/Rapport",
    icon: reportGrey,
    activeIcon: reportActive,
    component:ReportView,
  },
  {
    label: "Discussions",
    path: "/Discussions",
    icon: ChatIcon,
    activeIcon: ChatIconActive  
  },
  {
    label: "Paramètres",
    path: "/Parametres",
    icon: SettingsIcon,
    activeIcon: SettingsIconActive,
    component: Profile
  },
  {
    label: "Sign Out",
    path: "/sign-out",
    icon: SignOutIcon,
    activeIcon: SignOutIcon,
    component: handleSignout
  },
];

export default InviteRoute;
