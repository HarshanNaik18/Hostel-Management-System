import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./Components/Admin/AdminLogin/AdminLogin";
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
import { ToastContainer, toast } from "react-toastify";
import Enquiries from "./Components/Admin/Enquiries/Enquiries";
// import { UserAuthContext } from "./ContextAPI/UsersAuthContext";
function App() {
  // const {currentUser} = useContext(UserAuthContext);

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // const [isLoading, setIsLoading] = useState(navigator.onLine);

  // useEffect(() => {
  //   const onPageLoad = () => {
  //     setIsOnline(true);
  //   };

  //   if (document.readyState === "complete") {
  //     onPageLoad();
  //   } else {
  //     window.addEventListener("load", onPageLoad);
  //     return () => window.removeEventListener("load", onPageLoad);
  //   }
  // }, []);

  useEffect(() => {
    // const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const onlineHandler = () => {
      setIsOnline(true);
      toast.success("Back to online");
    };

    const offlineHandler = async () => {
      setIsOnline(false);
      toast.error("You are in offline");
      // await delay(3000);
      // offlineHandler();
    };

    window.addEventListener("online", onlineHandler);
    window.addEventListener("offline", offlineHandler);

    return () => {
      window.removeEventListener("online", onlineHandler);
      window.removeEventListener("offline", offlineHandler);
    };
  }, []);

  return !isOnline ? (
    <div className="page-loader">
      <div className="loader"></div>
    </div>
  ) : (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/admin" element={<Dashboard />} />
          <Route exact path="/admin/dashboard" element={<Dashboard />} />
          <Route exact path="/admin/tenants" element={<Tenants />} />
          <Route exact path="/admin/tenants/active" element={<Tenants />} />
          <Route
            exact
            path="/admin/tenants/vacated"
            element={<VaccatedTanats />}
          />
          <Route exact path="/admin/tenants/all" element={<AllTenants />} />
          <Route exact path="/admin/tenants/info" element={<TenantsInfo />} />
          <Route
            exact
            path="/admin/rooms_allotment"
            element={<RoomsAllotment />}
          />
          <Route
            exact
            path="/admin/rooms_allotment/update"
            element={<RoomUpdate />}
          />
          <Route
            exact
            path="/admin/rooms_allotment/add"
            element={<AddRooms />}
          />
          <Route
            exact
            path="/admin/request"
            element={<RoomApplicationRequest />}
          />
          <Route exact path="/admin/enquiries" element={<Enquiries />} />
          <Route exact path="/admin/fees" element={<FeesSection />} />
          <Route exact path="/admin/login" element={<AdminLogin />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
