import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import UserLogin from "./Components/User/UserLogInAndSignIn/UserLogin";
import UserSignIn from "./Components/User/UserLogInAndSignIn/UserSignIn";
import AdminLogin from './Components/Admin/AdminLogin/AdminLogin'
import Dashboard from "./Components/Admin/Dashboard/Dashboard";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/user_login" element={<UserLogin />} />
          <Route exact path="/user_signin" element={<UserSignIn />} />
          <Route exact path="/admin/dashboard" element={<Dashboard />} />
          <Route exact path="/admin" element={<Dashboard />} />
          <Route exact path="/admin/login" element={<AdminLogin />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
