import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import AdminLogin from './Components/Admin/AdminLogin/AdminLogin'
import Dashboard from "./Components/Admin/Dashboard/Dashboard";
import Tenants from "./Components/Admin/Tenants/Tenants";
import RoomsAllotment from "./Components/Admin/RoomAllotment/RoomsAllotment";
import RoomUpdate from "./Components/Admin/RoomUpdate/RoomUpdate";
import TenantsInfo from "./Components/Admin/TenantsInfo/TenantsInfo";
import VaccatedTanats from "./Components/Admin/Tenants/VaccatedTanats";
import AllTenants from "./Components/Admin/Tenants/AllTenanats";
import RoomApplicationRequest from "./Components/Admin/RoomApplicationReq/RoomApplicationRequest";
import FeesSection from "./Components/Admin/FeesSection/FeesSection";
import AddRooms from "./Components/Admin/RoomUpdate/AddRoom";
// import { UserAuthContext } from "./ContextAPI/UsersAuthContext";
function App() {
  // const {currentUser} = useContext(UserAuthContext);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/admin" element={<Dashboard />} />
          <Route exact path="/admin/dashboard" element={<Dashboard />} />
          <Route exact path="/admin/tenants" element={<Tenants />} />
          <Route exact path="/admin/tenants/active" element={<Tenants />} />
          <Route exact path="/admin/tenants/vacated" element={<VaccatedTanats />} />
          <Route exact path="/admin/tenants/all" element={<AllTenants />} />
          <Route exact path="/admin/tenants/info" element={<TenantsInfo />} />
          <Route exact path="/admin/rooms_allotment" element={<RoomsAllotment />} />
          <Route exact path="/admin/rooms_allotment/update" element={<RoomUpdate />} />
          <Route exact path="/admin/rooms_allotment/add" element={<AddRooms />} />
          <Route exact path="/admin/request" element={<RoomApplicationRequest />} />
          <Route exact path="/admin/fees" element={<FeesSection />} />
          <Route exact path="/admin/login" element={<AdminLogin />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
