import { Navigate } from "react-router-dom";

const RoleRedirect = ({ children }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    // not logged in → allow public home
    if (!token || !user) {
        return children;
    }
    // seller → force dashboard
    if (user.role === "seller") {
        return <Navigate to="/seller/dashboard" replace />;
    }
    // buyer → allow home
    return children;
};

export default RoleRedirect;