import React, { useState, useEffect } from 'react'
import AdminNavbar from '../AdminNavbar/AdminNavbar'
import Sidebar from '../Sidebar/Sidebar'
import './RoomsAllotment.css'
function RoomsAllotment() {
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
            Rooms Allotment
          </div>
          <div className='Admin_panel_cards_container'>
            <div className='Tanants_table_Select_header'>
              header
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoomsAllotment
