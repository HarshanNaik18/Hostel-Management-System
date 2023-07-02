import React from 'react'
import './Sidebar.css'
function Sidebar({open, onClose}) {
  return (
    <div className='Sidebar' style={{width:`${!open ? '250px' : '3.5rem'}`}} >
      <div className='Sidebar_toggle' >
        {
          !open?<i className="fa-solid fa-xmark" onClick={onClose} />:<i className="fa-solid fa-bars" onClick={onClose} ></i>
        }
      
      </div>
      <div className='sidebar_components_container'>
        <div className='sidebar_components' >
          <label onClick={onClose}  >
          <i className="fa-solid fa-gauge" style={{padding:'0 1rem', fontSize:'1.5rem'}} ></i>
          {
            !open?<span>Dashboard</span>:''
          }
          
          </label>
        </div>
        <div className='sidebar_components' >
          <label onClick={onClose}  >
          <i className="fa-solid fa-gauge" style={{padding:'0 1rem', fontSize:'1.5rem'}} ></i>
          {
            !open?<span>Dashboard</span>:''
          }
          
          </label>
        </div>
        <div className='sidebar_components' >
          <label onClick={onClose}  >
          <i className="fa-solid fa-gauge" style={{padding:'0 1rem', fontSize:'1.5rem'}} ></i>
          {
            !open?<span>Dashboard</span>:''
          }
          
          </label>
        </div>
        <div className='sidebar_components' >
          <label onClick={onClose}  >
          <i className="fa-solid fa-gauge" style={{padding:'0 1rem', fontSize:'1.5rem'}} ></i>
          {
            !open?<span>Dashboard</span>:''
          }
          
          </label>
        </div>
        <div className='sidebar_components' >
          <label onClick={onClose}  >
          <i className="fa-solid fa-gauge" style={{padding:'0 1rem', fontSize:'1.5rem'}} ></i>
          {
            !open?<span>Dashboard</span>:''
          }
          
          </label>
        </div>
        <div className='sidebar_components' >
          <label onClick={onClose}  >
          <i className="fa-solid fa-gauge" style={{padding:'0 1rem', fontSize:'1.5rem'}} ></i>
          {
            !open?<span>Dashboard</span>:''
          }
          
          </label>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
