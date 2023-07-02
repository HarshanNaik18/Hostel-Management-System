import React, { useState } from "react";
import "./AdminPanel.css";
import AdminNavbar from "./AdminNavbar/AdminNavbar";
import Sidebar from "./Sidebar/Sidebar";
import Dashboard from "./Dashboard/Dashboard";

function AdminPanel() {
  const [button, setButton] = useState(true);
  return (
    <div className="Admin_panel">
      <AdminNavbar />
      <div className="admin_panel_container">
        <Sidebar open={button} onClose={() => setButton(!button)} />
        <div className="admin_panel_component_holder" style={{width:`${!button ? 'calc(100% - 250px)' : 'calc(100% - 3.5rem)'}`}}  >
          <Dashboard />
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
