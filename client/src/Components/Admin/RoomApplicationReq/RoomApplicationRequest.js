import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import "./RoomAPplicationReq.css";

function RoomApplicationRequest() {
  const [button, setButton] = useState(true);
  const [displayWidth, setDisplayWidth] = useState(window.innerWidth);

  const a = [1, 2, 3, 4, 5, 6, 7, 78, 4, 9, 9, 5, 3, 6, 3, 21];

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
            <label>Rooms Application Request</label>
          </div>
          <div className="Application_req_wrapper">
            <table>
              <thead>
                <tr>
                  <td style={{ width: "5%" }}>Sl No</td>
                  <td style={{ width: "15%" }}>Name</td>
                  <td style={{ width: "5%" }}>Sharing</td>
                  <td style={{ width: "10%" }}>Phone</td>
                  <td style={{ width: "15%" }}>Email</td>
                  <td style={{ width: "30%" }}>Address</td>
                  <td style={{ width: "20%" }}>Action</td>
                </tr>
              </thead>
              <tbody>
                {a &&
                  a.map((item, index) => (
                    <tr key={index}>
                      <td>{index}</td>
                      <td style={{textAlign:'left'}} >Dheeraj T N</td>
                      <td>{item}</td>
                      <td>9876543210</td>
                      <td style={{textAlign:'left'}}>dtn123@gmail.com</td>
                      <td style={{textAlign:'left'}} >
                        12th Main Road, 27th Cross, Banashankari Stage II,
                        Banashankari, Bengaluru, Karnataka
                      </td>
                      <td style={{display:'flex', gap:'5px',justifyContent:'space-around', alignItems:'center', borderRight:'1px solid #f3f3f3'}} >
                        <button id="Table_View_Button" >Add</button>
                        <button id="Table_Vacate_Button">Reject</button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomApplicationRequest;
