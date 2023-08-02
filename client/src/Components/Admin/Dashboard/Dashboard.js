import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import Sidebar from "../Sidebar/Sidebar";
function Dashboard() {
  const [button, setButton] = useState(true);
  const [displayWidth, setDisplayWidth] = useState(window.innerWidth);
  const [staffData, setStaffData] = useState([]);
  const [item, setItem] = useState("Masala dosa");

  const a = [
    { data: "1", flag: false },
    { data: "2", flag: false },
    { data: "3", flag: false },
    { data: "4", flag: false },
    { data: "5", flag: false },
    { data: "6", flag: false },
    { data: "7", flag: false },
    { data: "8", flag: false },
    { data: "9", flag: false },
    { data: "10", flag: false },
    { data: "11", flag: false },
  ];
  const flag = [];

  const staffUpdate = (index) => {};
  useEffect(() => {
    const unSubscribe = () => {
      for (var i = 0; i < a.length; i++) {
        flag.push(false);
      }
      setStaffData(a);
    };
    return () => {
      unSubscribe();
    };
    //eslint-disable-next-line
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
            <label>Dashboard</label>
          </div>
          <div className="Admin_panel_cards_container">
            <div className="row1-container">
              <div className="box box-down cyan">
                <h2 id="h2">Total Tenants</h2>
                <label>120</label>
              </div>

              <div className="box red">
                <h2 id="h2">Total Rooms</h2>
                <label>40</label>
              </div>

              <div className="box box-down blue">
                <h2 id="h2">Available Rooms</h2>
                <label>15</label>
              </div>
            </div>
            <div className="row2-container">
              <div className="box orange">
                <h2 id="h2">Total Staffs</h2>
                <label>10</label>
              </div>
            </div>
            <div className="MenuTable">
              <h1>Dining Menu</h1>
              <table>
                <thead>
                  <tr>
                    <td>Day\Time</td>
                    <td>Tiffin</td>
                    <td>Lunch</td>
                    <td>Snacks</td>
                    <td>Dinner</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td id="day_td">Sunday</td>
                    <td>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => setItem(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => setItem(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => setItem(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => setItem(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td id="day_td">Monday</td>
                    <td>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => setItem(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => setItem(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => setItem(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => setItem(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td id="day_td">Tuesday</td>
                    <td>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => setItem(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => setItem(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => setItem(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => setItem(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td id="day_td">Wednesday</td>
                    <td>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => setItem(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => setItem(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => setItem(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => setItem(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td id="day_td">Thursday</td>
                    <td>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => setItem(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => setItem(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => setItem(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => setItem(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td id="day_td">Friday</td>
                    <td>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => setItem(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => setItem(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => setItem(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => setItem(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td id="day_td">Saturday</td>
                    <td>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => setItem(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => setItem(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => setItem(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => setItem(e.target.value)}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="menu_controll">
                <button style={{ background: "orange" }}>Update</button>
                <button style={{ background: "red", color: "white" }}>
                  Reset
                </button>
              </div>
            </div>
            <div className="Workers_details">
              <h1>Staff Details</h1>
              <table>
                <thead>
                  <tr>
                    <td style={{ width: "10%", textAlign: "center" }}>Sl No</td>
                    <td style={{ width: "20%" }}>Name</td>
                    <td style={{ width: "15%" }}>Phone</td>
                    <td style={{ width: "20%" }}>Email</td>
                    <td style={{ width: "15%", textAlign: "center" }}>
                      Designation
                    </td>
                    <td style={{ width: "20%", textAlign: "center" }}>
                      Designation
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {staffData &&
                    staffData.map((item, index) =>
                      flag[index] ? (
                        <tr key={index}>
                          <td style={{ textAlign: "center" }}>{item.data}</td>
                          <td>Dheeraj T N</td>
                          <td>9876543210</td>
                          <td>abcd123@gmail.com</td>
                          <td style={{ textAlign: "center" }}>Warden</td>
                          <td style={{ textAlign: "center" }}>
                            <button
                              style={{ background: "green" }}
                              onClick={() => {
                                flag[index] = false;
                              }}
                            >
                              Ok
                            </button>
                          </td>
                        </tr>
                      ) : (
                        <tr key={index}>
                          <td style={{ textAlign: "center" }}>{item.data}</td>
                          <td>Dheeraj T N</td>
                          <td>9876543210</td>
                          <td>abcd123@gmail.com</td>
                          <td style={{ textAlign: "center" }}>Warden</td>
                          <td style={{ textAlign: "center" }}>
                            <button onClick={() => staffUpdate(index)}>
                              Update
                            </button>
                          </td>
                        </tr>
                      )
                    )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
