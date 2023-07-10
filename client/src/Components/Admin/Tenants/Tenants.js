import React, { useState, useEffect } from "react";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import Sidebar from "../Sidebar/Sidebar";
import "./Tanants.css";

function ActiveTenants() {
  return (
    <div className="Tenants_Table_Container">
      <div className="Tenants_Search">
        <span>
          <input type="text" />
          <i className="fa-solid fa-xmark" />
        </span>
      </div>
      <div className="Tenants_Search_Table">
        <table>
          <thead>
            <tr id="tr">
              <td>S No</td>
              <td>Name</td>
              <td>Contact</td>
              <td>Sem</td>
              <td>Branch</td>
              <td>Room</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
      Active
    </div>
  );
}

function LeftoutTenants() {
  return <div>Leftout</div>;
}

function AllTenants() {
  return <div>All</div>;
}

function Tenants() {
  const [button, setButton] = useState(true);
  const [displayWidth, setDisplayWidth] = useState(window.innerWidth);
  const [loadComponent, setLoadComponent] = useState(0);

  const components = [<ActiveTenants />, <LeftoutTenants />, <AllTenants />];

  useEffect(() => {
    const unSubscribe = () => {
      setDisplayWidth(window.innerWidth);
    };
    return () => {
      unSubscribe();
    };
    //eslint-disable-next-line
  }, [displayWidth]);
  return (
    <div className="Admin_panel">
      <AdminNavbar />
      <div className="admin_panel_container">
        <Sidebar open={button} onClose={() => setButton(!button)} />
        <div
          className="admin_panel_component_holder"
          style={{
            width: `${!button ? "calc(100% - 230px)" : "calc(100% - 3.5rem)"}`,
          }}
        >
          <div className="Admin_panel_header">Tenants List</div>
          <div className="Admin_panel_cards_container">
            <div className="Tanants_table_Select_header">
              <label
                className="Table_Selectot"
                style={{
                  borderBottom: `${
                    loadComponent === 0 ? "4px solid blue" : "none"
                  }`,
                }}
                onClick={() => setLoadComponent(0)}
              >
                {displayWidth > 450 ? "Active Tenants" : "Active"}
              </label>
              <label
                className="Table_Selectot"
                style={{
                  borderBottom: `${
                    loadComponent === 1 ? "4px solid blue" : "none"
                  }`,
                }}
                onClick={() => setLoadComponent(1)}
              >
                {displayWidth > 450 ? "Leftout Tenants" : "Leftout"}
              </label>
              <label
                className="Table_Selectot"
                style={{
                  borderBottom: `${
                    loadComponent === 2 ? "4px solid blue" : "none"
                  }`,
                }}
                onClick={() => setLoadComponent(2)}
              >
                {displayWidth > 450 ? "All Tenants" : "All"}
              </label>
            </div>
            <div className="Tenants_component_holder">
              {components[loadComponent]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tenants;
