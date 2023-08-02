import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import "./FeesSection.css";
function FeesSection() {
  const [button, setButton] = useState(true);
  const [displayWidth, setDisplayWidth] = useState(window.innerWidth);
  const [buttonDisable, setButtonDisable] = useState(false);

  const a = [1, 2, 4, 5, 67, 8, 9, 0, 3, 2, 4, 2, 52, 2, 46, 2, 2, 6];

  const handleFeesUpdate = () => {
    setButtonDisable(true);
  };

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
            <label>Fees Management</label>
          </div>
          <div className="Fees_Field_wrapper">
            <div className="Fees_field_header">
              <button
                style={{ background: "rgb(0, 82, 204)", color: "white" }}
                disabled={buttonDisable}
                onClick={handleFeesUpdate}
              >
                Update Fees
              </button>
              <button
                style={{ background: "rgb(204, 51, 0)", color: "white" }}
                disabled={buttonDisable}
              >
                Dismiss
              </button>
            </div>
            <div className="Fees_section_Wrapper">
              <table>
                <thead>
                  <tr>
                    <td>Sl No</td>
                    <td>Name</td>
                    <td>Phone</td>
                    <td>Email</td>
                    <td>Total</td>
                    <td>Paid</td>
                    <td>Due</td>
                    <td>Action</td>
                  </tr>
                </thead>
                <tbody>
                  {a.map((item, index) => (
                    <tr key = {index}>
                      <td>{index}</td>
                      <td>Harshan Naik</td>
                      <td>9876543210</td>
                      <td>abcd123@gmail.com</td>
                      <td>56000</td>
                      <td>3000</td>
                      <td>2600</td>
                      <td id="Reminder">
                      <button
                      disabled={buttonDisable}
                       style={{background:'gold', padding:'5px 10px', border:'none', borderRadius:'5px'}} >Reminder</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeesSection;
