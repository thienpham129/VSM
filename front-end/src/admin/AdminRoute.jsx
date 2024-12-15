import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("TOKEN"); 
  const userRole = localStorage.getItem("role"); 

  // Nếu không có token hoặc không phải admin, chuyển hướng về trang chủ
  if (!token || userRole !== "ROLE_ADMIN") {
    return window.location.href = "/home";
  }

  return children;
};

export default AdminRoute;
