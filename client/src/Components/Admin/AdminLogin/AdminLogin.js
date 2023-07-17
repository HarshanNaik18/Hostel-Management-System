import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";
import {auth} from '../../../Firebase/Firebase'
import Logo from "../../../Images/LOGO.png";
import { createUserWithEmailAndPassword } from "firebase/auth";

function AdminLogin() {
  const [buttonDisable, setButtonDisable] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (username === '' || password === ''){
      return;
    }
    setButtonDisable(true);
    await createUserWithEmailAndPassword(auth,username,password).then(()=>{
      console.log(auth.currentUser);
      navigate('/admin/dashboard')
    }).catch((err)=>console.log(err))
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
    </div>
  );
}

export default AdminLogin;
