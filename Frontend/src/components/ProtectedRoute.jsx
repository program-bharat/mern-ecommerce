import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRole }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    if (!token || !user) {
        return <Navigate to="/login" replace />
    }
    if (allowedRole && user.role !== allowedRole) {
        if (user.role === "seller") {
            return <Navigate to="/login" replace />
        }
        return <Navigate to="/" replace />;
    }
    return children;
}

export default ProtectedRoute;
