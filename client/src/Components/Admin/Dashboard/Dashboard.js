import React, {useState, useEffect} from 'react'
import './Dashboard.css'
import AdminNavbar from '../AdminNavbar/AdminNavbar'
import Sidebar from '../Sidebar/Sidebar'
function Dashboard() {
  const [button, setButton] = useState(true);
  const [displayWidth, setDisplayWidth]= useState(window.innerWidth);

  
  useEffect(()=>{
    const unSubsribe = ()=>{
      setDisplayWidth(window.innerWidth);
    }
    return ()=>{
      unSubsribe();
    }
    //eslint-disable-next-line
  },[displayWidth])

  return (
    <div className="Admin_panel">
      <AdminNavbar />
      <div className="admin_panel_container">
        <Sidebar open={button} onClose={() => setButton(!button)} />
        <div className="admin_panel_component_holder" style={{width:`${!button ? 'calc(100% - 250px)' : 'calc(100% - 3.5rem)'}`}}  >
          Dashboard{displayWidth}
        </div>
      </div>
      </div>
  )
}

export default Dashboard
