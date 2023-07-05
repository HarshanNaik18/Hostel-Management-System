import React, { useState, useEffect } from 'react'
import './Dashboard.css'
import AdminNavbar from '../AdminNavbar/AdminNavbar'
import Sidebar from '../Sidebar/Sidebar'
function Dashboard() {
  const [button, setButton] = useState(true);
  const [displayWidth, setDisplayWidth] = useState(window.innerWidth);


  useEffect(() => {
    const unSubscribe = () => {
      setDisplayWidth(window.innerWidth);
    }
    return () => {
      unSubscribe();
    }
    //eslint-disable-next-line
  }, [displayWidth])

  return (
    <div className="Admin_panel">
      <AdminNavbar />
      <div className="admin_panel_container">
        <Sidebar open={button} onClose={() => setButton(!button)} />
        <div className="admin_panel_component_holder" style={{ width: `${!button ? 'calc(100% - 230px)' : 'calc(100% - 3.5rem)'}` }}  >
          <div className='Admin_panel_header'>
            Dashboard
          </div>
          <div className='Admin_panel_cards_container'>
            <div className="row1-container">
              <div className="box box-down cyan">
                <h2 id='h2' >Total Tenants</h2>
                <label>10</label>
              </div>

              <div className="box red">
                <h2 id='h2'>Total Rooms</h2>
                <label>40</label>
              </div>

              <div className="box box-down blue">
                <h2 id='h2'>Available Rooms</h2>
                <label>15</label>
              </div>
            </div>
            <div className="row2-container">
              <div className="box orange">
                <h2 id='h2'>Total Staffs</h2>
                <label>10</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
