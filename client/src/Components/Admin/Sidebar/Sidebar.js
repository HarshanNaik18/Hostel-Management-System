import React from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";

function Sidebar({ open, onClose }) {
  return (
    <div className="Sidebar" style={{ width: `${!open ? "230px" : "3.5rem"}` }}>
      <div className="Sidebar_toggle">
        {!open ? (
          <i className="fa-solid fa-xmark" onClick={onClose} />
        ) : (
          <i className="fa-solid fa-bars" onClick={onClose}></i>
        )}
      </div>

      <div className="sidebar_components_container">
        <NavLink to="/admin/dashboard" className="sidebar_components">
          <label onClick={onClose}>
            <i
              className="fa fa-tachometer"
              style={{ padding: "0 1rem", fontSize: "1.5rem" }}
            ></i>
            {!open ? <span>Dashboard</span> : ""}
          </label>
        </NavLink>
        <NavLink to="/admin/rooms_allotment" className="sidebar_components">
          <label onClick={onClose}>
            <i
              className="fa-solid fa-building-user"
              style={{ padding: "0 1rem", fontSize: "1.5rem" }}
            ></i>
            {!open ? <span>Rooms</span> : ""}
          </label>
        </NavLink>
        <NavLink to="/admin/tenants" className="sidebar_components">
          <label onClick={onClose}>
            <i
              className="fa-solid fa-users"
              style={{ padding: "0 1rem", fontSize: "1.5rem" }}
            ></i>
            {!open ? <span>Tenants</span> : ""}
          </label>
        </NavLink>
        <NavLink to="/admin/request" className="sidebar_components">
          <label onClick={onClose}>
            <i
              className="fa-solid fa-tasks"
              style={{ padding: "0 1rem", fontSize: "1.5rem" }}
            ></i>
            {!open ? <span>Applications</span> : ""}
          </label>
        </NavLink>
        <NavLink to="/admin/fees" className="sidebar_components">
          <label onClick={onClose}>
            <i
              className="fa-solid fa-book-open"
              style={{ padding: "0 1rem", fontSize: "1.5rem" }}
            ></i>
            {!open ? <span>Fees</span> : ""}
          </label>
        </NavLink>
        <NavLink to="/admin/dashboard" className="sidebar_components">
          <label onClick={onClose}>
            <i
              className="fa-solid fa-envelopes-bulk"
              style={{ padding: "0 1rem", fontSize: "1.5rem" }}
            ></i>
            {!open ? <span>Enquiries</span> : ""}
          </label>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
