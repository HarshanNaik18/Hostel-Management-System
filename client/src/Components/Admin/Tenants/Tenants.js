import React, { useState, useEffect } from "react";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import Sidebar from "../Sidebar/Sidebar";
import "./Tanants.css";

function ActiveTenants() {
  const a = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30,
  ];

  return (
    <div className="Tenants_Table_Container">
      <div className="Tenants_Search">
        <span>
          <input type="text" placeholder="Search here...!!" />
          <i className="fa-solid fa-xmark" />
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
            {a &&
              a.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>Harshan Naik</td>
                  <td>harshannaik18@gmail.com</td>
                  <td>7676643480</td>
                  <td>212</td>
                  <td>Siddapur, Uttara Kannada, Karnataka India - 581 355</td>
                  <td>06-JAN-2022</td>
                  <td id="Action_Buttons">
                    <button id="Table_View_Button">View</button>
                    <button id="Table_Vacate_Button">Vacated</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function VacatedTenants() {
  const a = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30,
  ];

  return (
    <div className="Tenants_Table_Container">
      <div className="Tenants_Search">
        <span>
          <input type="text" placeholder="Search here...!!" />
          <i className="fa-solid fa-xmark" />
        </span>
      </div>
      <div className="Tenants_Search_Table">
        <table>
          <thead>
            <tr>
              <td id="Vc_Table_SL">S.No</td>
              <td id="Vc_Table_User_Name">Name</td>
              <td id="Vc_Table_Email">Email</td>
              <td id="Vc_Table_Phone">Phone</td>
              <td id="Vc_Table_Address">Address</td>
              <td id="Vc_Table_Join_Date">Joined Date</td>
              <td id="Vc_Table_vc_Date">Vacated Date</td>
              <td id="Vc_Table_Action">Action</td>
            </tr>
          </thead>
          <tbody className="Tenants_table_body">
            {a &&
              a.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>Harshan Naik</td>
                  <td>harshannaik18@gmail.com</td>
                  <td>7676643480</td>
                  <td>Siddapur, Uttara Kannada, Karnataka India - 581 355</td>
                  <td>06-JAN-2022</td>
                  <td>06-JAN-2022</td>
                  <td id="Action_Buttons">
                    <button id="Vc_Table_View_Button">View</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AllTenants() {
  const a = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30,
  ];

  return (
    <div className="Tenants_Table_Container">
      <div className="Tenants_Search">
        <span>
          <input type="text" placeholder="Search here...!!" />
          <i className="fa-solid fa-xmark" />
        </span>
      </div>
      <div className="Tenants_Search_Table">
        <table>
          <thead>
            <tr>
              <td id="Vc_Table_SL">S.No</td>
              <td id="Vc_Table_User_Name">Name</td>
              <td id="Vc_Table_Email">Email</td>
              <td id="Vc_Table_Phone">Phone</td>
              <td id="Vc_Table_Address">Address</td>
              <td id="Vc_Table_Join_Date">Joined Date</td>
              <td id="Vc_Table_vc_Date">Vacated Date</td>
              <td id="Vc_Table_Action">Action</td>
            </tr>
          </thead>
          <tbody className="Tenants_table_body">
            {a &&
              a.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>Harshan Naik</td>
                  <td>harshannaik18@gmail.com</td>
                  <td>7676643480</td>
                  <td>Siddapur, Uttara Kannada, Karnataka India - 581 355</td>
                  <td>06-JAN-2022</td>
                  <td> {index%2===0?"26-JUL-2023":"--"} </td>
                  <td id="Action_Buttons">
                    <button id="Vc_Table_View_Button">View</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Tenants() {
  const [button, setButton] = useState(true);
  const [displayWidth, setDisplayWidth] = useState(window.innerWidth);
  const [loadComponent, setLoadComponent] = useState(0);

  const components = [<ActiveTenants />, <VacatedTenants />, <AllTenants />];

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
                    borderBottom: `${
                      loadComponent === 0 ? "4px solid blue" : "none"
                    }`,
                  }}
                  onClick={() => setLoadComponent(0)}
                >
                  {displayWidth > 450 ? "Active Tenants" : "Active"}
                </label>
              </div>
              <div className="Tanants_table_Select_header_changer">
                <label
                  className="Table_Selectot"
                  style={{
                    borderBottom: `${
                      loadComponent === 1 ? "4px solid blue" : "none"
                    }`,
                  }}
                  onClick={() => setLoadComponent(1)}
                >
                  {displayWidth > 450 ? "Vacated Tenants" : "Vacated"}
                </label>
              </div>
              <div className="Tanants_table_Select_header_changer">
                <label
                  className="Table_Selectot"
                  style={{
                    borderBottom: `${
                      loadComponent === 2 ? "4px solid blue" : "none"
                    }`,
                  }}
                  onClick={() => setLoadComponent(2)}
                >
                  {displayWidth > 450 ? "All Tenants" : "All"}
                </label>
              </div>
            </div>
            <div className="Tenants_component_holder">
              {components[loadComponent]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tenants;
