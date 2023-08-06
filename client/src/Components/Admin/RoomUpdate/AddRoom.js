import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import "./AddRoom.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { collection, doc, onSnapshot, query, setDoc } from "firebase/firestore";
import { db } from "../../../Firebase/Firebase";
import { useNavigate } from "react-router-dom";

function AddRooms() {
  const [button, setButton] = useState(true);
  const [displayWidth, setDisplayWidth] = useState(window.innerWidth);
  const [buttonDisable, setButtonDisable] = useState(false);

  const [roomIds, setRoomIds] = useState([]);

  const [roomNo, setRoomNo] = useState(0);
  const [floorNo, setFloorNo] = useState(0);
  const [sharing, setSharing] = useState(0);
  const [price, setPrice] = useState(0);

  const bedsArray = [0, 2, 3, 4, 5, 6];
  const priceArray = [0, 0, 80000, 70000, 60000, 55000, 50000];
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    setButtonDisable(true);
    const rn = parseInt(roomNo);
    const fn = parseInt(floorNo);

    if (rn === 0 && fn === 0 && sharing === 0) {
      toast.warning("Fill all the fields");
      setButtonDisable(false);
      return;
    }
    if (rn === 0) {
      toast.warning("Fill Room Number");
      setButtonDisable(false);
      return;
    }

    if (fn === 0) {
      toast.warning("Fill floor Number");
      setButtonDisable(false);
      return;
    }

    if (sharing === 0) {
      toast.warning("Select Sharing");
      setButtonDisable(false);
      return;
    }

    const roomName =
      rn >= 10 ? "Room" + floorNo + rn : "Room" + floorNo + "0" + rn;

    if (roomIds.includes(roomName)) {
      toast.error("Room already exists");
      setButtonDisable(false);
      return;
    }

    const docRef = doc(db, "Rooms", roomName);
    const occupants = [];

    toast.success("Room is adding");
    for (var i = 0; i < sharing; i++) {
      occupants.push({ flag: false, uid: "",fname:"",lname:"" });
    }

    await setDoc(docRef, {
      roomNo: fn * 100 + rn,
      floorNo: fn,
      fees: price,
      beds: sharing,
      occupied: 0,
      occupants: occupants,
    })
      .then(() => {
        toast.success("Room added");
      })
      .catch(() => {
        toast.error("Room not created");
        return;
      });
    navigate("/admin/rooms_allotment");
    setButtonDisable(false);
  };

  useEffect(() => {
    const roomRef = collection(db, "Rooms");
    const q = query(roomRef);
    const FetchData = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((item) => {
        data.push(item.id);
      });
      setRoomIds(data);
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
          <div className="Add_Room_Wrapper">
            <div className="Add_room">
              <h2>Add Room</h2>
              <div className="Add_Room_Container">
                <label>Room No :</label>
                <input
                  type="number"
                  onChange={(e) => setRoomNo(e.target.value)}
                />
              </div>
              <div className="Add_Room_Container">
                <label>Floor No :</label>
                <input
                  type="number"
                  onChange={(e) => setFloorNo(e.target.value)}
                />
              </div>
              <div className="Add_Room_Container">
                <label>Sharing :</label>
                <select
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    setSharing(val);
                    setPrice(priceArray[val]);
                  }}
                >
                  <option value={bedsArray[0]}>Select Here</option>
                  <option value={bedsArray[1]}>2</option>
                  <option value={bedsArray[2]}>3</option>
                  <option value={bedsArray[3]}>4</option>
                  <option value={bedsArray[4]}>5</option>
                  <option value={bedsArray[5]}>6</option>
                </select>
              </div>
              <div className="Add_Room_Container">
                <label>
                  Fees ( &nbsp; <i className="fa-solid fa-indian-rupee-sign" />
                  &nbsp;) :
                </label>
                <label style={{ width: "180px" }}>{price}</label>
              </div>
              <button onClick={handleClick} disabled={buttonDisable}>
                Add
              </button>
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddRooms;
