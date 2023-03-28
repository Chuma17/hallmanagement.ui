import { useLocation } from "react-router-dom";
import Header from "./Header";

const HeaderForLogin = () => {
    const location = useLocation();

    if (location.pathname === '/student-login' || location.pathname === '/student-registration' ||
    location.pathname === '/porter-login' || location.pathname === '/hallAdmin-login' ||
    location.pathname === '/chiefHallAdmin-login') {
        return null; // Return null to not render the header component
    }

    return <Header />;
}
export default HeaderForLogin;