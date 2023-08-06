import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import "./RoomAPplicationReq.css";
import { db } from "../../../Firebase/Firebase";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

function RoomApplicationRequest() {
  const [button, setButton] = useState(true);
  const [displayWidth, setDisplayWidth] = useState(window.innerWidth);
  const [bookingData, setBookingData] = useState([]);
  const [buttonDisable, setButtonDisable] = useState(false);

  const handleAdd = async (item) => {
    setButtonDisable(true);
    const docRef = doc(db, "Allotment_Table", item.id);
    await setDoc(docRef, item)
      .then(() => {
        toast.success("Application Accepted");
      //   const docRef = doc(db, "Booking", item.id);
      // await deleteDoc(docRef);
      })
      .catch(() => toast.error("Error occured"));
    setButtonDisable(false);
  };

  const handleReject = async (item) => {
    setButtonDisable(true);
    const docRef = doc(db, "Booking", item.id);
    await deleteDoc(docRef)
      .then(() => toast.error("Application Rejected"))
      .catch(() => toast.error("Error"));
    setButtonDisable(false);
  };

  useEffect(() => {
    const q = query(collection(db, "Booking"));
    const unSubscribe = onSnapshot(q, (queySnapshot) => {
      const data = [];
      queySnapshot.forEach((item) => {
        data.push({ ...item.data(), id: item.id, flag:false, time:serverTimestamp() });
      });
      setBookingData(data);
    });
    return () => {
      unSubscribe();
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
                {bookingData &&
                  bookingData.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td style={{ textAlign: "left" }}>
                        {item.fname + " " + item.lname}
                      </td>
                      <td>{item.roomType}</td>
                      <td>{item.phone_no}</td>
                      <td style={{ textAlign: "left" }}>{item.email}</td>
                      <td style={{ textAlign: "left" }}>
                        {item.address +
                          " " +
                          item.city +
                          " " +
                          item.state +
                          " " +
                          item.pincode}
                      </td>
                      <td
                        style={{
                          display: "flex",
                          gap: "5px",
                          justifyContent: "space-around",
                          alignItems: "center",
                          borderRight: "1px solid #f3f3f3",
                        }}
                      >
                        <button
                          id="Table_View_Button"
                          onClick={() => handleAdd(item)}
                          disabled={buttonDisable}
                        >
                          Add
                        </button>
                        <button
                          id="Table_Vacate_Button"
                          onClick={() => handleReject(item)}
                          disabled={buttonDisable}
                        >
                          Reject
                        </button>
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
