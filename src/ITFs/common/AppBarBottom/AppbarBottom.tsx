import React from 'react'
import './AppbarBottom.css'
function AppbarBottom(props:any) {
  const { setAction,handleGoback }=props;
  return (
    <div className="nav-container">
    <nav className="nav">
      <a  className="nav__link" onClick={() =>{handleGoback(true)}}>
        <i className="fas fa-angle-left"/>
        <span className="nav__text">Back</span>
      </a>
      <a href="#" className="nav__link nav__link--active" onClick={() =>{setAction('clear')}}>
        <i className="fas fa-redo"/>
        <span className="nav__text">Clear</span>
      </a>
      <a href="#" className="nav__link" onClick={()=>{setAction('delete')}}>
        <i className="fas fa-trash"/>
        <span className="nav__text">Delete</span>
      </a>
      <a href="#" className="nav__link" onClick={()=>{setAction('save')}}>
        <i className="fas fa-save"/>
        <span className="nav__text">Save</span>
      </a>
      <a href="#" className="nav__link" onClick={()=>{setAction('save_new')}}>
      <i className="fas fa-plus-square"></i>
        <span className="nav__text">Save +</span>
      </a>
    </nav>
    </div>
  )
}

export default AppbarBottom
