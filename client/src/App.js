import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import UserLogin from "./Components/User/UserLogInAndSignIn/UserLogin";
import UserSignIn from "./Components/User/UserLogInAndSignIn/UserSignIn";
import AdminLogin from './Components/Admin/AdminLogin/AdminLogin'
import Dashboard from "./Components/Admin/Dashboard/Dashboard";
import Tenants from "./Components/Admin/Tenants/Tenants";
import RoomsAllotment from "./Components/Admin/RoomAllotment/RoomsAllotment";
import RoomUpdate from "./Components/Admin/RoomUpdate/RoomUpdate";
// import { UserAuthContext } from "./ContextAPI/UsersAuthContext";
function App() {
  // const {currentUser} = useContext(UserAuthContext);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/user_login" element={<UserLogin />} />
          <Route exact path="/user_signin" element={<UserSignIn />} />
          <Route exact path="/admin" element={<Dashboard />} />
          <Route exact path="/admin/dashboard" element={<Dashboard />} />
          <Route exact path="/admin/tenants" element={<Tenants />} />
          <Route exact path="/admin/rooms_allotment" element={<RoomsAllotment />} />
          <Route exact path="/admin/rooms_allotment/update" element={<RoomUpdate />} />
          <Route exact path="/admin/login" element={<AdminLogin />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
