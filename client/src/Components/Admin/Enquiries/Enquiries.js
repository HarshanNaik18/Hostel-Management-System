import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import "./Enquiry.css";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../Firebase/Firebase";

function EnquiryCard({item}) {
  const [clicked, setClicked] = useState(false);
  const [reply, setreply] = useState("");

  const sendReply = (e) => {
    e.preventDefault();
    console.log(reply);
  };

  return (
    <div className="container">
      <div className="enquiry_component">
        <span>From :&nbsp;</span>
        <label>{item.email}</label>
      </div>
      <div className="enquiry_component">
        <span>Subject :&nbsp;</span>
        <label>{item.subject}</label>
      </div>
      <div className="enquiry_component">
        <span>Message :&nbsp;</span>
        <label>
         {item.message}
        </label>
      </div>

      <button onClick={() => setClicked(!clicked)}>
        {!clicked ? "Reply" : "Cancel"}
      </button>
      {clicked ? (
        <div className="reply__input">
          <textarea
            type="text"
            placeholder="Reply to user..."
            onChange={(e) => setreply(e.target.value)}
          />
          <i
            className="fa fa-paper-plane"
            aria-hidden="true"
            onClick={sendReply}
          ></i>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

function Enquiries() {
  const [button, setButton] = useState(true);
  const [displayWidth, setDisplayWidth] = useState(window.innerWidth);
  const [enqueries, setEnqueries] = useState([]);

  useEffect(() => {
    const docRef = collection(db, "Contact");
    const unSubscribe = onSnapshot(docRef, (snapshot) => {
      const data = [];
      snapshot.forEach((element) => {
        data.push({ ...element.data(), id: element.id });
      });
      setEnqueries(data);
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
            <label>Enquiries</label>
          </div>
          <div className="enquiry">
            {enqueries && enqueries.map((item, index) => (
              <EnquiryCard item = {item} key = {index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Enquiries;
