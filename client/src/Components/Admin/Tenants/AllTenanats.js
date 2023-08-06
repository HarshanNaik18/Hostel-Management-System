import React, {useState, useEffect} from 'react'
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import Sidebar from '../Sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../../Firebase/Firebase';

function AllTenantsComponent() {
  const [tenantsData, setTenantsData] = useState([]);
  
  const navigate = useNavigate();
  const handleTenantView = (index) => {
    console.log(index);
    navigate("/admin/tenants/info");
  };

  useEffect(() => {
    const q = collection(db, "AllTenants");
    const getTenantsData = onSnapshot(q, async (snpashot) => {
      const data = [];
      snpashot.forEach((element) => {
        data.push({...element.data(),id:element.id});
      });
      setTenantsData(data);
      console.log(data);
      console.log(tenantsData);
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
              {tenantsData &&
                tenantsData.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.address}</td>
                    <td>{item.join.toDate().toLocaleDateString()}</td>
                    <td> {item.vacated ==="-"?item.vacated:item.vacated.toDate().toLocaleDateString()} </td>
                    <td id="Action_Buttons">
                      <button id="Vc_Table_View_Button" onClick={handleTenantView} >View</button>
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
    const navigate = useNavigate();
    const [button, setButton] = useState(true);
    const [displayWidth, setDisplayWidth] = useState(window.innerWidth);
  
  
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
                      borderBottom: "none"
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
                      borderBottom:"none"
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
                      borderBottom:"4px solid blue"
                    }}
                    onClick={() => navigate("/admin/tenants/all")}
                  >
                    {displayWidth > 450 ? "All Tenants" : "All"}
                  </label>
                </div>
              </div>
              <div className="Tenants_component_holder">
                <AllTenantsComponent />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default AllTenants