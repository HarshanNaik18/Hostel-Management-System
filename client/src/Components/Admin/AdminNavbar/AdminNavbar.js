import React from "react";
import "./AdminNavbar.css";
import Logo from "../../../Images/LOGO.png";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../../Firebase/Firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth).then(() => {
      toast.warning("Logged out");
      navigate("/admin/login");
    });
  };

  return (
    <div className="Admin_Navbar">
      <img src={Logo} alt="" />
      <ToastContainer />
      <label onClick={handleLogout}>Logout</label>
    </div>
  );
}

export default AdminNavbar;
