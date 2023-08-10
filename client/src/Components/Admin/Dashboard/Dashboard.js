import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import Sidebar from "../Sidebar/Sidebar";
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
  onSnapshot,
  query,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  orderBy,
} from "firebase/firestore";
import { db } from "../../../Firebase/Firebase";
import { toast } from "react-toastify";

function StaffTD({ item, key, index }) {
  const [staffName, setStaffName] = useState(item.Name);
  const [staffPhone, setStaffPhone] = useState(item.phone);
  const [staffEmail, setStaffEmail] = useState(item.email);
  const [staffDesignation, setStaffDesignation] = useState(item.designation);
  const [flag, setFlag] = useState(true);

  const updateStaff = async (e) => {
    e.preventDefault();
    const mailformat =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!staffName || staffPhone === 0 || !staffEmail || !staffDesignation) {
      toast.warning("Fill all the fields");
      return;
    }
    if (staffPhone < 6000000000 || staffPhone > 9999999999) {
      toast.warning("Invalid phone number");
      return;
    }
    if (!staffEmail.match(mailformat)) {
      toast.warning("Invalid email");
      return;
    }
    const docRef = doc(db, "Staffs", item.id);
    await updateDoc(docRef, {
      Name: staffName,
      phone: staffPhone,
      email: staffEmail,
      designation: staffDesignation,
    })
      .then(() => toast.success("Updated"))
      .catch(() => toast.error("Error"));
    setFlag(true);
  };

  const removeStaff = async () => {
    await deleteDoc(doc(db, "Staffs", item.id))
      .then(() => toast.success("Staff data deleted"))
      .catch(() => toast.error("Error"));
  };

  const cancelUpdate = () => {
    setStaffName(item.Name);
    setStaffPhone(item.phone);
    setStaffEmail(item.email);
    setStaffDesignation(item.designation);
    setFlag(true);
  };
  return flag ? (
    <tr key={key}>
      <td style={{ textAlign: "center", width: "10%" }}>{index + 1}</td>
      <td style={{ width: "15%" }}>{item.Name}</td>
      <td style={{ width: "15%" }}>{item.phone}</td>
      <td style={{ width: "20%" }}>{item.email}</td>
      <td style={{ textAlign: "center", width: "20%" }}>{item.designation}</td>
      <td
        style={{
          textAlign: "center",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          height: "40px",
          minWidth: "200px",
          paddingLeft: "0",
        }}
      >
        <button onClick={() => setFlag(false)} style={{ background: "purple" }}>
          Update
        </button>
        <button onClick={removeStaff} style={{ background: "Red" }}>
          Remove
        </button>
      </td>
    </tr>
  ) : (
    <tr key={key}>
      <td style={{ textAlign: "center", width: "10%" }}>{index + 1}</td>
      <td style={{ width: "15%" }}>
        {" "}
        <input
          type="text"
          value={staffName}
          onChange={(e) => setStaffName(e.target.value)}
        />{" "}
      </td>
      <td style={{ width: "15%" }}>
        <input
          type="number"
          value={staffPhone}
          onChange={(e) => setStaffPhone(parseInt(e.target.value))}
        />
      </td>
      <td style={{ width: "20%" }}>
        <input
          type="text"
          value={staffEmail}
          onChange={(e) => setStaffEmail(e.target.value)}
        />
      </td>
      <td style={{ textAlign: "center", width: "20%" }}>
        <input
          type="text"
          value={staffDesignation}
          style={{ textAlign: "center" }}
          onChange={(e) => setStaffDesignation(e.target.value)}
        />
      </td>
      <td
        style={{
          textAlign: "center",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          height: "40px",
          minWidth: "200px",
          paddingLeft: "0",
        }}
      >
        <button onClick={updateStaff} style={{ background: "green" }}>
          OK
        </button>
        <button onClick={cancelUpdate} style={{ background: "orange" }}>
          Cancel
        </button>
      </td>
    </tr>
  );
}

function Dashboard() {
  const [button, setButton] = useState(true);
  const [displayWidth, setDisplayWidth] = useState(window.innerWidth);
  const [staffData, setStaffData] = useState([]);
  const [buttonDisable, setButtonDisable] = useState(false);
  const [tenants, setTenats] = useState(0);
  const [totalRooms, setTotalRooms] = useState(0);
  const [availableRooms, setAvailableRooms] = useState(0);

  const [sundayTfn, setSundayTfn] = useState("");
  const [sundayLunch, setSundayLunch] = useState("");
  const [sundaySnacks, setSundaySnacks] = useState("");
  const [sundayDinner, setSundayDinner] = useState("");

  const [mondayTfn, setmondayTfn] = useState("");
  const [mondayLunch, setmondayLunch] = useState("");
  const [mondaySnacks, setmondaySnacks] = useState("");
  const [mondayDinner, setmondayDinner] = useState("");

  const [tuesdaydayTfn, settuesdaydayTfn] = useState("");
  const [tuesdaydayLunch, settuesdaydayLunch] = useState("");
  const [tuesdaydaySnacks, settuesdaydaySnacks] = useState("");
  const [tuesdaydayDinner, settuesdaydayDinner] = useState("");

  const [wednsdayTfn, setwednsdayTfn] = useState("");
  const [wednsdayLunch, setwednsdayLunch] = useState("");
  const [wednsdaySnacks, setwednsdaySnacks] = useState("");
  const [wednesdayDinner, setwednsdaydayDinner] = useState("");

  const [tuesdayTfn, settuesdayTfn] = useState("");
  const [tuesdayLunch, settuesdayLunch] = useState("");
  const [tuesdaySnacks, settuesdaySnacks] = useState("");
  const [tuesdayDinner, settuesdayDinner] = useState("");

  const [fridayTfn, setfridayTfn] = useState("");
  const [fridayLunch, setfridayLunch] = useState("");
  const [fridaySnacks, setfridaySnacks] = useState("");
  const [fridayDinner, setfridayDinner] = useState("");

  const [saturdayTfn, setsaturdayTfn] = useState("");
  const [saturdayLunch, setsaturdayLunch] = useState("");
  const [saturdaySnacks, setsaturdaySnacks] = useState("");
  const [saturdayDinner, setsaturdayDinner] = useState("");

  const [staffName, setStaffName] = useState("");
  const [staffPhone, setStaffPhone] = useState(0);
  const [staffEmail, setStaffEmail] = useState("");
  const [staffDesignation, setStaffDesignation] = useState("");

  const menuRef = doc(db, "DiningMenu", "Menu");

  const handleMenuUpdate = async (e) => {
    e.preventDefault();
    setButtonDisable(true);
    await setDoc(menuRef, {
      Menu: [
        {
          Tiffin: sundayTfn,
          Lunch: sundayLunch,
          Snacks: sundaySnacks,
          Dinner: sundayDinner,
        },
        {
          Tiffin: mondayTfn,
          Lunch: mondayLunch,
          Snacks: mondaySnacks,
          Dinner: mondayDinner,
        },
        {
          Tiffin: tuesdaydayTfn,
          Lunch: tuesdaydayLunch,
          Snacks: tuesdaydaySnacks,
          Dinner: tuesdaydayDinner,
        },
        {
          Tiffin: wednsdayTfn,
          Lunch: wednsdayLunch,
          Snacks: wednsdaySnacks,
          Dinner: wednesdayDinner,
        },
        {
          Tiffin: tuesdayTfn,
          Lunch: tuesdayLunch,
          Snacks: tuesdaySnacks,
          Dinner: tuesdayDinner,
        },
        {
          Tiffin: fridayTfn,
          Lunch: fridayLunch,
          Snacks: fridaySnacks,
          Dinner: fridayDinner,
        },
        {
          Tiffin: saturdayTfn,
          Lunch: saturdayLunch,
          Snacks: saturdaySnacks,
          Dinner: saturdayDinner,
        },
      ],
      Time: serverTimestamp(),
    })
      .then(() => {
        toast.success("Menu updated");
      })
      .catch((e) => {
        toast.error("Error. Menu not  updated");
      });
    setButtonDisable(false);
  };

  const handleClear = async (e) => {
    e.preventDefault();
    setButtonDisable(true);
    window.location.reload();
    toast.warning("Changes has been cleared");
    setButtonDisable(false);
  };

  useEffect(() => {
    const unSubscribe = async () => {
      const docR = await getDoc(menuRef);
      const doc = docR.data().Menu;

      setSundayTfn(doc[0].Tiffin);
      setSundayLunch(doc[0].Lunch);
      setSundaySnacks(doc[0].Snacks);
      setSundayDinner(doc[0].Dinner);

      setmondayTfn(doc[1].Tiffin);
      setmondayLunch(doc[1].Lunch);
      setmondaySnacks(doc[1].Snacks);
      setmondayDinner(doc[1].Dinner);

      settuesdaydayTfn(doc[2].Tiffin);
      settuesdaydayLunch(doc[2].Lunch);
      settuesdaydaySnacks(doc[2].Snacks);
      settuesdaydayDinner(doc[2].Dinner);

      setwednsdayTfn(doc[3].Tiffin);
      setwednsdayLunch(doc[3].Lunch);
      setwednsdaySnacks(doc[3].Snacks);
      setwednsdaydayDinner(doc[3].Dinner);

      settuesdayTfn(doc[4].Tiffin);
      settuesdayLunch(doc[4].Lunch);
      settuesdaySnacks(doc[4].Snacks);
      settuesdayDinner(doc[4].Dinner);

      setfridayTfn(doc[5].Tiffin);
      setfridayLunch(doc[5].Lunch);
      setfridaySnacks(doc[5].Snacks);
      setfridayDinner(doc[5].Dinner);

      setsaturdayTfn(doc[6].Tiffin);
      setsaturdayLunch(doc[6].Lunch);
      setsaturdaySnacks(doc[6].Snacks);
      setsaturdayDinner(doc[6].Dinner);
    };
    return () => {
      unSubscribe();
    };
    //eslint-disable-next-line
  }, []);

  const IncTable = (e) => {
    const data = [];
    staffData.forEach((ele) => {
      data.push(ele);
    });
    data.push({ data: "", flag: false });
    setStaffData(data);
  };

  const HandleAddStaff = async (e) => {
    e.preventDefault();
    const mailformat =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!staffName || staffPhone === 0 || !staffEmail || !staffDesignation) {
      toast.warning("Fill all the fields");
      return;
    }
    if (staffPhone < 6000000000 || staffPhone > 9999999999) {
      toast.warning("Invalid phone number");
      return;
    }
    if (!staffEmail.match(mailformat)) {
      toast.warning("Invalid email");
      return;
    }

    await addDoc(collection(db, "Staffs"), {
      Name: staffName,
      phone: staffPhone,
      email: staffEmail,
      designation: staffDesignation,
      time:serverTimestamp()
    })
      .then(() => toast.success("Staff added"))
      .catch(() => toast.error("Error"));
  };

  const cancelStaffAdd = () => {
    const data = [];
    staffData.forEach((ele, index) => {
      if (index !== staffData.length - 1) {
        data.push(ele);
      }
    });
    setStaffData(data);
  };

  useEffect(() => {
    const q1 = query(collection(db, "ActiveTenants"));
    const q2 = query(collection(db, "Rooms"));
    const q3 = query(collection(db, "Staffs"),orderBy("time"));
    const getTentsCount = onSnapshot(q1, (snapshot) => {
      const data = [];
      snapshot.forEach((ele) => {
        data.push(ele.data());
      });
      setTenats(data.length);
    });
    const getRoomsCount = onSnapshot(q2, (snapshot) => {
      const data = [];
      snapshot.forEach((ele) => {
        data.push(ele.data());
      });
      setTotalRooms(data.length);
    });
    const getAvailableRoomsCount = onSnapshot(q2, (snapshot) => {
      const data = [];
      snapshot.forEach((ele) => {
        if (ele.data().occupied !== ele.data().beds) data.push(ele.data());
      });
      setAvailableRooms(data.length);
    });

    const getStaffData = onSnapshot(q3, (snapshot) => {
      const data = [];
      snapshot.forEach((ele) => {
        data.push({ ...ele.data(), id: ele.id, flag: true });
      });
      setStaffData(data);
    });
    return () => {
      getTentsCount();
      getRoomsCount();
      getAvailableRoomsCount();
      getStaffData();
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
                <label>{tenants}</label>
              </div>

              <div className="box red">
                <h2 id="h2">Total Rooms</h2>
                <label>{totalRooms}</label>
              </div>

              <div className="box box-down blue">
                <h2 id="h2">Available Rooms</h2>
                <label>{availableRooms}</label>
              </div>
            </div>
            <div className="row2-container">
              <div className="box orange">
                <h2 id="h2">Total Staffs</h2>
                <label>{staffData.length}</label>
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
                        value={sundayTfn}
                        onChange={(e) => setSundayTfn(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={sundayLunch}
                        onChange={(e) => setSundayLunch(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={sundaySnacks}
                        onChange={(e) => setSundaySnacks(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={sundayDinner}
                        onChange={(e) => setSundayDinner(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td id="day_td">Monday</td>
                    <td>
                      <input
                        type="text"
                        value={mondayTfn}
                        onChange={(e) => setmondayTfn(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={mondayLunch}
                        onChange={(e) => setmondayLunch(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={mondaySnacks}
                        onChange={(e) => setmondaySnacks(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={mondayDinner}
                        onChange={(e) => setmondayDinner(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td id="day_td">Tuesday</td>
                    <td>
                      <input
                        type="text"
                        value={tuesdaydayTfn}
                        onChange={(e) => settuesdaydayTfn(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={tuesdaydayLunch}
                        onChange={(e) => settuesdaydayLunch(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={tuesdaydaySnacks}
                        onChange={(e) => settuesdaydaySnacks(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={tuesdaydayDinner}
                        onChange={(e) => settuesdaydayDinner(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td id="day_td">Wednesday</td>
                    <td>
                      <input
                        type="text"
                        value={wednsdayTfn}
                        onChange={(e) => setwednsdayTfn(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={wednsdayLunch}
                        onChange={(e) => setwednsdayLunch(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={wednsdaySnacks}
                        onChange={(e) => setwednsdaySnacks(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={wednesdayDinner}
                        onChange={(e) => setwednsdaydayDinner(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td id="day_td">Thursday</td>
                    <td>
                      <input
                        type="text"
                        value={tuesdayTfn}
                        onChange={(e) => settuesdayTfn(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={tuesdayLunch}
                        onChange={(e) => settuesdayLunch(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={tuesdaySnacks}
                        onChange={(e) => settuesdaySnacks(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={tuesdayDinner}
                        onChange={(e) => settuesdayDinner(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td id="day_td">Friday</td>
                    <td>
                      <input
                        type="text"
                        value={fridayTfn}
                        onChange={(e) => setfridayTfn(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={fridayLunch}
                        onChange={(e) => setfridayLunch(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={fridaySnacks}
                        onChange={(e) => setfridaySnacks(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={fridayDinner}
                        onChange={(e) => setfridayDinner(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td id="day_td">Saturday</td>
                    <td>
                      <input
                        type="text"
                        value={saturdayTfn}
                        onChange={(e) => setsaturdayTfn(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={saturdayLunch}
                        onChange={(e) => setsaturdayLunch(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={saturdaySnacks}
                        onChange={(e) => setsaturdaySnacks(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={saturdayDinner}
                        onChange={(e) => setsaturdayDinner(e.target.value)}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="menu_controll">
                <button
                  style={{ background: "orange" }}
                  onClick={handleMenuUpdate}
                  disabled={buttonDisable}
                >
                  Update
                </button>
                <button
                  style={{ background: "red", color: "white" }}
                  onClick={handleClear}
                  disabled={buttonDisable}
                >
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
                      Action
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {staffData &&
                    staffData.map((item, index) =>
                      item.flag ? (
                        <StaffTD item={item} key={index} index={index} />
                      ) : (
                        <tr key={index}>
                          <td style={{ textAlign: "center", width: "10%" }}>
                            {index + 1}
                          </td>
                          <td style={{ width: "15%" }}>
                            {" "}
                            <input
                              type="text"
                              onChange={(e) => setStaffName(e.target.value)}
                            />{" "}
                          </td>
                          <td style={{ width: "15%" }}>
                            <input
                              type="number"
                              onChange={(e) =>
                                setStaffPhone(parseInt(e.target.value))
                              }
                            />
                          </td>
                          <td style={{ width: "20%" }}>
                            <input
                              type="text"
                              onChange={(e) => setStaffEmail(e.target.value)}
                            />
                          </td>
                          <td style={{ textAlign: "center", width: "20%" }}>
                            <input
                              type="text"
                              style={{textAlign:'center'}}
                              onChange={(e) =>
                                setStaffDesignation(e.target.value)
                              }
                            />
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                              display: "flex",
                              justifyContent: "space-evenly",
                              alignItems: "center",
                              height: "40px",
                              minWidth: "200px",
                              paddingLeft: "0",
                            }}
                          >
                            <button
                              onClick={HandleAddStaff}
                              style={{ background: "green" }}
                            >
                              OK
                            </button>
                            <button
                              onClick={cancelStaffAdd}
                              style={{ background: "orange" }}
                            >
                              Cancel
                            </button>
                          </td>
                        </tr>
                      )
                    )}
                </tbody>
              </table>
              <div style={{ padding: "1.5rem" }}>
                <button
                  className="Staff_ADD_button"
                  onClick={IncTable}
                  disabled={buttonDisable}
                >
                  Add Staff
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
