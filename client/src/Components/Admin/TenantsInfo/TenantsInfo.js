import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import "./TenantsInfo.css";
function TenantsInfo() {
  const [button, setButton] = useState(true);
  const [displayWidth, setDisplayWidth] = useState(window.innerWidth);

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
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKVgdPnMdBjCdxkKFnwvfzcvEA6RTfYRMuEA&usqp=CAU"
                  alt=""
                />
                <label>Tenant Name</label>
              </div>
              <div className="Tanent_Details_card_body">
                <div className="Tenant_Details_Fields">
                  <label>USN :</label>
                  <span>1BG21ISXYZ</span>
                </div>
                <div className="Tenant_Details_Fields">
                  <label>Sem :</label>
                  <span>4</span>
                </div>
                <div className="Tenant_Details_Fields">
                  <label>Branch :</label>
                  <span>ISE</span>
                </div>
                <div className="Tenant_Details_Fields">
                  <label>Room No :</label>
                  <span>212</span>
                </div>
                <div className="Tenant_Details_Fields">
                  <label>Phone :</label>
                  <span>9876543210</span>
                </div>
                <div className="Tenant_Details_Fields">
                  <label>Email :</label>
                  <span>21ise100@bnmit.in</span>
                </div>
                <div className="Tenant_Details_Fields">
                  <label>Fees :</label>
                  <span>Rs 56000</span>
                </div>
                <div className="Tenant_Details_Fields">
                  <label>Due :</label>
                  <span>Rs 20000</span>
                </div>
                <div className="Tenant_Details_Fields">
                  <label>Joined Date :</label>
                  <span>06-JAN-2022</span>
                </div>
                <div className="Tenant_Details_Fields">
                  <label>Vaccated Date :</label>
                  <span>-</span>
                </div>
                <div className="Tenant_Address_Fields">
                  <label>Address :</label>
                  <span>12th Main Road, 27th Cross, Banashankari Stage II, Banashankari, Bengaluru, Karnataka 560070</span>
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
