import React, { useState, useEffect } from "react";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import Sidebar from "../Sidebar/Sidebar";
import "./RoomUpdate.css";

function RoomUpdate() {
  const [button, setButton] = useState(true);
  const [displayWidth, setDisplayWidth] = useState(window.innerWidth);

  const roomNo = 404;
  const floorNo = 4;
  const fees = 4000;
  const beds = 4;
  const occupiedBeds = 2;
  const occupants = ["Harshan Naik", "Dheeraj T N", "", ""];

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
            <label>Rooms Update</label>
          </div>
          <div className="Room_Update_wrapper">
            <form className="Room_Update_Form">
              <div className="Room_Update_Form_Header">
                <label>Room No:</label>
                <span>{roomNo}</span>
              </div>
              <table className="Room_Update_Form_Table">
                <tbody>
                  <tr>
                    <td>Floor No</td>
                    <td>{floorNo}</td>
                  </tr>
                  <tr>
                    <td>Fees</td>
                    <td>{fees}</td>
                  </tr>
                  <tr>
                    <td>Total Beds</td>
                    <td>{beds}</td>
                  </tr>
                  <tr>
                    <td>Occupied Beds</td>
                    <td>{occupiedBeds}</td>
                  </tr>
                  {occupants.map((item, index) => (
                    <tr key={index}>
                      <td> {index===0?"Occupants":""} </td>
                      <td>
                        <input type="text" placeholder={item} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomUpdate;
