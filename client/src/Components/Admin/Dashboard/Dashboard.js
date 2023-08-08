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
} from "firebase/firestore";
import { db } from "../../../Firebase/Firebase";
import { toast } from "react-toastify";
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

  const menuRef = doc(db, "DiningMenu", "Menu");

  const handleMenuUpdate = async (e) => {
    e.preventDefault();
    setButtonDisable(true);
    await setDoc(menuRef, {
      Menu: [{
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
      const docR = (await getDoc(menuRef));
      const doc = docR.data().Menu;

      console.log(doc);
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
    const q1 = query(collection(db, "ActiveTenants"));
    const q2 = query(collection(db, "Rooms"));
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
    return () => {
      getTentsCount();
      getRoomsCount();
      getAvailableRoomsCount();
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
                      !flag[index] ? (
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
                              disabled={buttonDisable}
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
