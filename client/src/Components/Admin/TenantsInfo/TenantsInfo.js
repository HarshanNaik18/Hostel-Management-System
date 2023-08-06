import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import "./TenantsInfo.css";
import profileLogo from "../../../Images/profileLogo.png";

function TenantsInfo() {
  const [button, setButton] = useState(true);
  const [displayWidth, setDisplayWidth] = useState(window.innerWidth);
  const [info, setInfo] = useState({
    name: "",
    pic: "",
    usn: "",
    sem: "",
    branch: "",
    roomNo: "",
    floorNo: "",
    email: "",
    phone: "",
    join: "-",
    vacated: "-",
    address: "",
  });

  useEffect(() => {
    const getTenantInfo = () => {
      const data = JSON.parse(sessionStorage.getItem("TenantInfo"));
      setInfo(data);
    };
    return () => {
      getTenantInfo();
    };
  }, []);

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
          <div className="Admin_panel_header">
            <label>Tenant Information</label>
          </div>
          <div className="tennet_info_wrapper">
            <div className="Tanent_Details_card">
              <div className="Tanent_Details_card_header">
                <img src={info.pic === "" ? profileLogo : info.pic} alt="" />
                <label>{info.name}</label>
              </div>
              <div className="Tanent_Details_card_body">
                <div className="Tenant_Details_Fields">
                  <label>Phone :</label>
                  <span>{info.phone}</span>
                </div>
                <div className="Tenant_Details_Fields">
                  <label>Email :</label>
                  <span>{info.email}</span>
                </div>
                <div className="Tenant_Details_Fields">
                  <label>USN :</label>
                  <span>{info.usn}</span>
                </div>
                <div className="Tenant_Details_Fields">
                  <label>Branch :</label>
                  <span>{info.branch}</span>
                </div>
                <div className="Tenant_Details_Fields">
                  <label>Sem :</label>
                  <span>{info.sem}</span>
                </div>
                <div className="Tenant_Details_Fields">
                  <label>Room No :</label>
                  <span>{info.roomNo}</span>
                </div>
                <div className="Tenant_Details_Fields">
                  <label>Floor No :</label>
                  <span>{info.floorNo}</span>
                </div>
                <div className="Tenant_Details_Fields">
                  <label>
                    Fees ( <i className="fa-solid fa-indian-rupee-sign" />
                    &nbsp;) :
                  </label>
                  <span>{info.fees}</span>
                </div>
                <div className="Tenant_Details_Fields">
                  <label>
                    Paid ( <i className="fa-solid fa-indian-rupee-sign" />
                    &nbsp;) :
                  </label>
                  <span>{info.paid}</span>
                </div>
                <div className="Tenant_Details_Fields">
                  <label>
                    Due ( <i className="fa-solid fa-indian-rupee-sign" />
                    &nbsp;) :
                  </label>
                  <span>{info.due}</span>
                </div>
                <div className="Tenant_Details_Fields">
                  <label>Joined Date :</label>
                  <span>
                    {info.join === "-"
                      ? "-"
                      : new Date(
                          info.join.seconds * 1000 +
                            info.join.nanoseconds / 1000000
                        ).getDate() +
                        " - " +
                        new Date(
                          info.join.seconds * 1000 +
                            info.join.nanoseconds / 1000000
                        ).getMonth() +
                        " - " +
                        new Date(
                          info.join.seconds * 1000 +
                            info.join.nanoseconds / 1000000
                        ).getFullYear()}
                  </span>
                </div>
                <div className="Tenant_Details_Fields">
                  <label>Vaccated Date :</label>
                  <span>
                    {info.vacated === "-"
                      ? "-"
                      : new Date(
                          info.vacated.seconds * 1000 +
                            info.vacated.nanoseconds / 1000000
                        ).getDate() +
                        " - " +
                        new Date(
                          info.vacated.seconds * 1000 +
                            info.vacated.nanoseconds / 1000000
                        ).getMonth() +
                        " - " +
                        new Date(
                          info.vacated.seconds * 1000 +
                            info.vacated.nanoseconds / 1000000
                        ).getFullYear()}
                  </span>
                </div>
                <div className="Tenant_Address_Fields">
                  <label>Address :</label>
                  <span>{info.address}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TenantsInfo;
