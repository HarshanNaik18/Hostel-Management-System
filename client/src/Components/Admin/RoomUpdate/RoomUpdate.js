import React, { useState, useEffect } from "react";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import Sidebar from "../Sidebar/Sidebar";
import "./RoomUpdate.css";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

function RoomUpdate() {
  const navigate = useNavigate();
  const [button, setButton] = useState(true);
  const [displayWidth, setDisplayWidth] = useState(window.innerWidth);
  const [buttonDisable, setButtonDisable] = useState(false);

  const [fee, setFee] = useState(4500);

  var roomNo = 404;
  var floorNo = 4;
  var beds = 4;
  var occupiedBeds = 2;
  var arr = ["Harshan Naik", "Dheeraj T N", "Empty", "Empty"];
  var options = [
    { label: "Harshan Naik", value: "Harshan" },
    { label: "Dheeraj T N", value: "Dheeraj" },
    { label: "Jayatheerth", value: "Jay" },
    { label: "Sheyas", value: "SSY" },
    { label: "Pavan Shetty", value: "Pavan" },
    { label: "Karthk N G", value: "Karthik" },
    { label: "Arjun", value: "Arjun" },
    { label: "Athti Hegde", value: "Atri" },
    { label: "", value: "" },
  ];

  const updateForm = (e)=>{
    e.preventDefault();
    setButtonDisable(true);
    navigate("/admin/rooms_allotment/")
    setButtonDisable(true);
  }

  const ResetForm = (e) => {
    e.preventDefault();
    setButtonDisable(true);
    window.location.reload();
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
            <label>Rooms Update</label>
          </div>
          <div className="Room_Update_wrapper">
            <form className="Room_Update_Form">
              <div className="Room_Update_Form_Header">
                <label>Room No:</label>
                <span>{roomNo}</span>
              </div>
              <table className="Room_Update_Form_Table">
                <tbody style={{ borderBottom: "1px solid lightgrey" }}>
                  <tr style={{ borderBottom: "1px solid lightgrey" }}>
                    <td>Floor No</td>
                    <td>{floorNo}</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid lightgrey" }}>
                    <td>Fees</td>
                    <td>
                      {"₹ "}
                      <input
                        type="number"
                        value={fee}
                        onChange={(e) => setFee(e.target.value)}
                        style={{ border: "1px solid white" }}
                      ></input>{" "}
                    </td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid lightgrey" }}>
                    <td>Occupied Beds</td>
                    <td>{occupiedBeds}</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid lightgrey" }}>
                    <td>Total Beds</td>
                    <td>{beds}</td>
                  </tr>
                  {arr.map((item, index) => (
                    <tr key={index}>
                      <td> {index === 0 ? "Occupants" : ""} </td>
                      <td style={{ padding: "0", maxHeight: "25px" }}>
                        <Select
                          options={options}
                          placeholder={arr[index]}
                          isSearchable
                          noOptionsMessage={() => "No result found"}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="Room_Update_Form_Footer">
                <button
                  style={{ background: "#379237", color: "white" }}
                  onClick={updateForm}
                  disabled={buttonDisable}
                >
                  Update
                </button>
                <button
                  style={{ background: "red" }}
                  onClick={ResetForm}
                  disabled={buttonDisable}
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomUpdate;
