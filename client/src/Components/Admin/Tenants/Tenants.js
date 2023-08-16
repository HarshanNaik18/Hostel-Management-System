import React, { useState, useEffect } from "react";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import Sidebar from "../Sidebar/Sidebar";
import "./Tanants.css";
import { useNavigate } from "react-router-dom";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../../Firebase/Firebase";
import { toast } from "react-toastify";

function ActiveTenants() {
  const [tenantsData, setTenantsData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const handleTenantView = (item) => {
    sessionStorage.setItem("TenantInfo", JSON.stringify(item));
    navigate("/admin/tenants/info");
  };

  const handleVacate = async (item) => {
    const id = item.id;
    const rNo = "Room" + item.roomNo.toString();
    const alloData = (await getDoc(doc(db, "Allotment_Table", id))).data();
    const persData = (await getDoc(doc(db, "Users", id))).data();
    const roomData = (await getDoc(doc(db, "Rooms", rNo))).data();
    const tntatl = roomData.occupants;
    const temp = tntatl.filter((ele) => ele.uid !== id);
    const len = temp.length;
    for (var i = temp.length; i < tntatl.length; i++) {
      temp.push({ flag: false, uid: "", fname: "", lname: "" });
    }

    await setDoc(doc(db, "VacatedTenants", id), {
      name: alloData.fname + " " + alloData.lname,
      email: alloData.email,
      phone: alloData.phone_no,
      roomNo: "-",
      floorNo: "-",
      join: alloData.time,
      vacated: serverTimestamp(),
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
      fees: "-",
      paid: "-",
      due: "-",
    })
      .then(async () => {
        await updateDoc(doc(db, "AllTenants", id), {
          fees: "-",
          paid: "-",
          due: "-",
          roomNo: "-",
          floorNo: "-",
          vacated: serverTimestamp(),
        });
        await updateDoc(doc(db, "Rooms", rNo), {
          occupied: temp.length - len,
          occupants: temp,
        });
        await deleteDoc(doc(db, "ActiveTenants", id));
        await deleteDoc(doc(db, "Allotment_Table", id));
        await deleteDoc(doc(db, "Payments", id));
        await auth.updateUser(id, {
          disabled: true
      });
        toast.success(item.name + " is markes as vacated");
      })
      .catch(() => toast.error(item.name + " is not markes as vacated"));
  };

  useEffect(() => {
    const q = query( collection(db, "ActiveTenants"), orderBy('name'));
    const getTenantsData = onSnapshot(q, async (snpashot) => {
      const data = [];
      snpashot.forEach((element) => {
        data.push({ ...element.data(), id: element.id });
      });
      setTenantsData(data);
      setFilterData(data);
    });
    return () => {
      getTenantsData();
    };
    //eslint-disable-next-line
  }, []);

  return (
    <div className="Tenants_Table_Container">
      <div className="Tenants_Search">
        <span>
          <input
            type="text"
            placeholder="Search here...!!"
            value={search}
            onChange={(e) => {
              const val = e.target.value;
              const data = filterData.filter((ele) =>
                ele.name.toLowerCase().includes(val.toLowerCase())
              );
              setTenantsData(data);
              setSearch(val);
            }}
          />
          <i
            className="fa-solid fa-xmark"
            onClick={() => {
              const data = filterData.filter((ele) => ele.name.includes(""));
              setTenantsData(data);
              setSearch("");
            }}
          />
        </span>
      </div>
      <div className="Tenants_Search_Table">
        <table>
          <thead>
            <tr>
              <td id="Table_SL">S.No</td>
              <td id="Table_User_Name">Name</td>
              <td id="Table_Email">Email</td>
              <td id="Table_Phone">Phone</td>
              <td id="Table_Room_No">Room</td>
              <td id="Table_Address">Address</td>
              <td id="Table_Join_Date">Joined Date</td>
              <td id="Table_Action">Action</td>
            </tr>
          </thead>
          <tbody className="Tenants_table_body">
            {tenantsData.length > 0 ? (
              tenantsData &&
              tenantsData.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.roomNo}</td>
                  <td>{item.address}</td>
                  <td>
                    {new Date(
                      item.join.seconds * 1000 + item.join.nanoseconds / 1000000
                    ).getDate() +
                      " - " +
                      new Date(
                        item.join.seconds * 1000 +
                          item.join.nanoseconds / 1000000
                      ).getMonth() +
                      " - " +
                      new Date(
                        item.join.seconds * 1000 +
                          item.join.nanoseconds / 1000000
                      ).getFullYear()}
                  </td>
                  <td id="Action_Buttons">
                    <button
                      id="Table_View_Button"
                      onClick={() => handleTenantView(item)}
                    >
                      View
                    </button>
                    <button
                      id="Table_Vacate_Button"
                      onClick={() => handleVacate(item)}
                    >
                      Vacated
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr
                  style={{
                    textAlign: "center",
                    fontSize: "18px",
                    fontWeight: "bolder",
                  }}
                >
                  <td></td>
                  <td></td>
                  <td>Result</td>
                  <td> not </td>
                  <td>found</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Tenants() {
  const [button, setButton] = useState(true);
  const [displayWidth, setDisplayWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

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
            <label> Tenants List</label>
          </div>
          <div className="Admin_panel_cards_container">
            <div className="Tanants_table_Select_header">
              <div className="Tanants_table_Select_header_changer">
                <label
                  className="Table_Selectot"
                  style={{
                    borderBottom: "4px solid blue",
                  }}
                  onClick={() => navigate("/admin/tenants/active")}
                >
                  {displayWidth > 450 ? "Active Tenants" : "Active"}
                </label>
              </div>
              <div className="Tanants_table_Select_header_changer">
                <label
                  className="Table_Selectot"
                  style={{
                    borderBottom: "none",
                  }}
                  onClick={() => navigate("/admin/tenants/vacated")}
                >
                  {displayWidth > 450 ? "Vacated Tenants" : "Vacated"}
                </label>
              </div>
              <div className="Tanants_table_Select_header_changer">
                <label
                  className="Table_Selectot"
                  style={{
                    borderBottom: "none",
                  }}
                  onClick={() => navigate("/admin/tenants/all")}
                >
                  {displayWidth > 450 ? "All Tenants" : "All"}
                </label>
              </div>
            </div>
            <div className="Tenants_component_holder">
              <ActiveTenants />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tenants;
