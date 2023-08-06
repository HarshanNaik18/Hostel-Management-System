import React, { useState, useEffect } from "react";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import Sidebar from "../Sidebar/Sidebar";
import "./RoomUpdate.css";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../Firebase/Firebase";
import { toast } from "react-toastify";

function RoomUpdate() {
  const navigate = useNavigate();
  const [button, setButton] = useState(true);
  const [displayWidth, setDisplayWidth] = useState(window.innerWidth);
  const [buttonDisable, setButtonDisable] = useState(false);

  const [roomDetails, setRoomDetails] = useState({
    beds: 0,
    fees: 0,
    floorNo: 0,
    occupants: [{ fname: "", lname: "", uid: "", sem: "" , username:"" }],
    occupied: 0,
    roomNo: 0,
  });
  const [flagRoomDetails, setFlagRoomDetails] = useState({
    beds: 0,
    fees: 0,
    floorNo: 0,
    occupants: [{ fname: "", lname: "", uid: "", sem: "" }],
    occupied: 0,
    roomNo: 0,
  });

  const [usersTable, setUsersTable] = useState(["", "", "", "", "", ""]);

  const [options, setOptions] = useState([{ value: "", label: "" }]);
  const [tempOptions, setTempOption] = useState([
    { value: "", label: "" },
    { value: "", label: "" },
    { value: "", label: "" },
    { value: "", label: "" },
    { value: "", label: "" },
    { value: "", label: "" },
  ]);

  const updateForm = async (e) => {
    e.preventDefault();
    toast.success("Updateding " + roomDetails.id + " details");
    setButtonDisable(true);
    var count = 0;
    roomDetails.occupants.forEach(async (ele) => {
      if (ele.flag === true) {
        count++;
        const alloData = (
          await getDoc(doc(db, "Allotment_Table", ele.uid))
        ).data();
        const persData = (await getDoc(doc(db, "Users", ele.uid))).data();
        await setDoc(doc(db, "ActiveTenants", ele.uid), {
          name: alloData.fname + " " + alloData.lname,
          email: alloData.email,
          phone: alloData.phone_no,
          roomNo: roomDetails.roomNo,
          floorNo: roomDetails.floorNo,
          join: alloData.time,
          vacated: "-",
          address:
            alloData.address +
            " " +
            alloData.city +
            " " +
            alloData.state +
            " " +
            alloData.pincode,
          usn: persData.usn,
          pic: persData.profile,
          sem: persData.sem,
          branch: persData.branch,
          fees: roomDetails.fees,
          paid: 0,
          due: roomDetails.fees,
        });
        await setDoc(doc(db, "AllTenants", ele.uid), {
          name: alloData.fname + " " + alloData.lname,
          email: alloData.email,
          phone: alloData.phone_no,
          roomNo: roomDetails.roomNo,
          floorNo: roomDetails.floorNo,
          join: alloData.time,
          vacated: "-",
          address:
            alloData.address +
            " " +
            alloData.city +
            " " +
            alloData.state +
            " " +
            alloData.pincode,
          usn: persData.usn,
          pic: persData.profile,
          sem: persData.sem,
          branch: persData.branch,
          fees: roomDetails.fees,
          paid: 0,
          due: roomDetails.fees,
        });
        await setDoc(doc(db, "Payments", ele.uid), {
          name: alloData.fname + " " + alloData.lname,
          email: alloData.email,
          phone: alloData.phone_no,
          fees: roomDetails.fees,
          paid: 0,
          flag:true,
          due: roomDetails.fees,
        });
        await updateDoc(doc(db, "Allotment_Table", ele.uid), {
          flag: true,
        });
      }
    });
    roomDetails.occupied = count;
    await updateDoc(doc(db, "Rooms", roomDetails.id), {
      occupants: roomDetails.occupants,
      occupied: roomDetails.occupied,
    });
    toast.success("Updateding " + roomDetails.id + " details");
    navigate("/admin/rooms_allotment/");
    setButtonDisable(true);
  };

  const ResetForm = (e) => {
    e.preventDefault();
    setButtonDisable(true);
    window.location.reload();
    setButtonDisable(true);
  };

  const changeUser = async (option, index) => {
    const val = option.value;
    const docRef = doc(db, "Users", val);
    const userData = (await getDoc(docRef)).data();
    const occData = [];
    roomDetails.occupants.forEach((item, ind) => {
      if (ind === index) {
        occData.push({
          ...userData,
          flag: true,
          uid: val,
          fname: userData.username,
          lname: "",
        });
      } else {
        occData.push(item);
      }
    });
    roomDetails.occupants = occData;
    usersTable[index] = val;
    const data = [];
    for (var i = 0; i < tempOptions.length; i++) {
      var check = true;
      for (var j = 0; j < 6; j++) {
        if (usersTable[j] === tempOptions[i].value) {
          check = false;
          break;
        }
      }
      if (check) {
        data.push(tempOptions[i]);
      }
    }
    setUsersTable(usersTable);
    setOptions(data);
    setRoomDetails(roomDetails);
    
  };

  useEffect(() => {
    const getRoomDetails = () => {
      const dataItem = JSON.parse(sessionStorage.getItem("RoomDetails"));
      setRoomDetails(dataItem);
      setFlagRoomDetails(dataItem);
      console.log(dataItem.occupants);
      const optRef = query(
        collection(db, "Allotment_Table"),
        where("flag", "==", false),
        where("roomType", "==", dataItem.beds)
      );
      const data = [];
      onSnapshot(optRef, (querySnapshot) => {
        querySnapshot.forEach((element) => {
          data.push({
            value: element.id,
            label: element.data().fname + " " + element.data().lname,
          });
        });
        setOptions(data);
        setTempOption(data);
        
      });
    };
    return () => {
      getRoomDetails();
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
            <label>Rooms Update</label>
          </div>
          <div className="Room_Update_wrapper">
            <form className="Room_Update_Form">
              <div className="Room_Update_Form_Header">
                <label>Room No:</label>
                <span>{roomDetails.roomNo}</span>
              </div>
              <table className="Room_Update_Form_Table">
                <tbody style={{ borderBottom: "1px solid lightgrey" }}>
                  <tr style={{ borderBottom: "1px solid lightgrey" }}>
                    <td>Floor No</td>
                    <td>{roomDetails.floorNo}</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid lightgrey" }}>
                    <td>
                      Fees&nbsp;({" "}
                      <i className="fa-solid fa-indian-rupee-sign" />
                      &nbsp;)
                    </td>
                    <td>{roomDetails.fees}</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid lightgrey" }}>
                    <td>Occupied Beds</td>
                    <td>{roomDetails.occupied}</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid lightgrey" }}>
                    <td>Total Beds</td>
                    <td>{roomDetails.beds}</td>
                  </tr>
                  {roomDetails.occupants.map((item, index) => (
                    <tr key={index}>
                      <td> {index === 0 ? "Occupants" : ""} </td>
                      <td style={{ padding: "0", maxHeight: "25px" }}>
                        <Select
                          options={options}
                          defaultValue={
                            index === 0 || index < roomDetails.occupied
                              ? {
                                  value: item.uid,
                                  label:
                                    item.username +
                                    " " +
                                    item.lname,
                                }
                              : null
                          }
                          isSearchable
                          noOptionsMessage={() => "No result found"}
                          onChange={(option) => changeUser(option, index)}
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
