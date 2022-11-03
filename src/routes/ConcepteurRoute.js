import DashboardIcon from "../assets/DashboardIcon.svg";
import DashboardIconActive from "../assets/DashboardIconActive.svg";
import SecureIcon from "../assets/SecureIcon.svg";
import SecureIconActive from "../assets/SecureIconActive.svg";
import SettingsIcon from "../assets/SettingsIcon.svg";
import SettingsIconActive from "../assets/SettingsIconActive.svg";
import SignOutIcon from "../assets/SignOutIcon.svg";
import ChatIconActive from "../assets/ChatIconActive.svg";
import ChatIcon from "../assets/ChatIcon.svg";
import reportActive from "../assets/report-activeIcone.png";
import reportGrey from "../assets/grey1.png";
import databaseGrey from "../assets/database-grey.png";
import databaseActive from "../assets/database-active.png";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import DwhView from "../pages/DwhView";
import ReportPage from "../pages/ReportPage";
import AccessReport from "../pages/AccessReport";
import handleSignout from "../components/utils/handleSignout";


const ConcepteurRoute = [
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
    component:ReportPage,
  },
  {
    label: "Datawarehouse ",
    path: "/Base",
    icon: databaseGrey,
    activeIcon: databaseActive,
    component: DwhView
  },
  {
    label: "Priviléges ",
    path: "/Acces",
    icon: SecureIcon,
    activeIcon: SecureIconActive,
    component: AccessReport
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

export default ConcepteurRoute;
