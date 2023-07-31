import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";
import {auth} from '../../../Firebase/Firebase'
import Logo from "../../../Images/LOGO.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminLogin() {
  const [buttonDisable, setButtonDisable] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (username === '' || password === ''){
      toast.warning("Fill all the fields")
      return;
    }
    setButtonDisable(true);
    await signInWithEmailAndPassword(auth,username,password).then(()=>{
      toast.success("Logged in")
      navigate('/admin/dashboard')
    }).catch(()=>{
      toast.error("Invalid username or Password")
    })
    setButtonDisable(false);
  };

  return (
    <div className="Admin_Login_Overlay">
      <form className="Admin_login_form">
        <div className="Admin_login_form_header">
          <img src={Logo} alt="Logo" />
        </div>
        <label>Admin Login</label>
        <div className="Admin_login_input_fields">
          <input type="text" placeholder="Username" onChange={(e)=>setUsername(e.target.value)} />
          <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
        </div>
        <div className="Admin_login_action">
          <button onClick={handleSubmit} disabled={buttonDisable}>
            {" "}
            Login{" "}
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default AdminLogin;
