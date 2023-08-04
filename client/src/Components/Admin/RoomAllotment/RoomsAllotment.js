import React, { useState, useEffect } from "react";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import Sidebar from "../Sidebar/Sidebar";
import "./RoomsAllotment.css";
import { useNavigate } from "react-router-dom";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../../Firebase/Firebase";

function RoomsAllotment() {
  const [button, setButton] = useState(true);
  const [displayWidth, setDisplayWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  const [roomDetails, setRoomDetails] = useState([]);
  const [filterRoomDetails, setFilterRoomDetails] = useState([]);

  const b = [1, 2, 3, 4];

  useEffect(() => {
    const roomsRef = collection(db, "Rooms");
    const q = query(roomsRef);
    const FetchData = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((item) => {
        data.push({ ...item.data(), id: item.id });
      });
      setFilterRoomDetails(data);
      setRoomDetails(data);
    });

    return () => {
      FetchData();
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
            <label>Rooms Allotment</label>
          </div>
          <div className="Admin_panel_cards_container">
            <div className="Room_Allotment_wrapper">
              <div className="Room_allotment_header">
                <div className="Tenants_Search">
                  <span>
                    <input type="number" placeholder="Search Room No...!!" />
                    <i className="fa-solid fa-xmark" />
                  </span>
                </div>
                <div
                  className="Room_Add_Button"
                  onClick={() => navigate("/admin/rooms_allotment/add")}
                >
                  <span>Add</span>
                  <i className="fa-solid fa-plus" />
                </div>
              </div>
              <div className="Room_Allotment_Container">
                {filterRoomDetails &&
                  filterRoomDetails.map((item, index) => (
                    <div className="Room_Card" key={index}>
                      <div className="Room_Card_Header">
                        <label>{item.roomNo}</label>
                        <div className="Room_Card_Info">
                          <div className="Room_Card_Info_value">
                            <label>Floor No : </label>
                            <span> {item.floorNo} </span>
                          </div>
                          <div className="Room_Card_Info_value">
                            <label>Beds : </label>
                            <span>{item.occupied}/{item.beds}</span>
                          </div>
                          <div className="Room_Card_Info_value">
                            <label>Fees : </label>
                            <span>₹{item.fees}</span>
                          </div>
                        </div>
                      </div>
                      <div className="Room_Card_Body">
                        <label>Occupants List :</label>
                        <table>
                          <thead>
                            <tr>
                              <td style={{ width: "15%" }}>S.No</td>
                              <td style={{ width: "70%" }}>Name</td>
                              <td style={{ width: "15%" }}>Sem</td>
                            </tr>
                          </thead>
                          <tbody>
                            {item.occupants.map((data, index) => (
                              <tr key={index}>
                                <td style={{ width: "15%" }}>{index}</td>
                                <td style={{ width: "70%" }}>Dheeraj T N</td>
                                <td style={{ width: "15%" }}>{index}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="Room_Card_Footer">
                        <button
                          style={{ background: "#379237", color: "white" }}
                          onClick={() =>
                            navigate("/admin/rooms_allotment/update")
                          }
                        >
                          Update
                        </button>
                        <button style={{ background: "red" }}>Delete</button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomsAllotment;
