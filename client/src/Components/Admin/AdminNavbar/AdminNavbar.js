import React from 'react'
import './AdminNavbar.css'
import Logo from '../../../Images/LOGO.png'

function AdminNavbar() {
  return (
    <div className='Admin_Navbar'>
      <img src={Logo} alt='' />
      <label>Logout</label>
    </div>
  )
}

export default AdminNavbar
