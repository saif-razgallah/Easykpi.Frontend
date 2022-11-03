import SecureIcon from "../assets/SecureIcon.svg";
import SecureIconActive from "../assets/SecureIconActive.svg";
import SettingsIcon from "../assets/SettingsIcon.svg";
import SettingsIconActive from "../assets/SettingsIconActive.svg";
import SignOutIcon from "../assets/SignOutIcon.svg";
import ChatIconActive from "../assets/ChatIconActive.svg";
import ChatIcon from "../assets/ChatIcon.svg";
import databaseGrey from "../assets/database-grey.png";
import databaseActive from "../assets/database-active.png";
import Profile from "../pages/Profile";
import DwhPage from "../pages/DwhPage";
import AccessDatawh from "../pages/AccessDatawh";
import handleSignout from "../components/utils/handleSignout";


const GestionnaireRoute = [
  {
    label: "Datawarehouse ",
    path: "/",
    icon: databaseGrey,
    activeIcon: databaseActive,
    component: DwhPage
  },
  {
    label: "Priviléges ",
    path: "/Acces",
    icon: SecureIcon,
    activeIcon: SecureIconActive,
    component: AccessDatawh
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

export default GestionnaireRoute;
