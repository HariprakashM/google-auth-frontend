import React from 'react'
import { useNavigate } from 'react-router-dom';
// import { FaStaylinked } from 'react-icons/fa';
function Nav() {
  const loguser = JSON.parse(localStorage.getItem("user"));
  function logout() {
    localStorage.clear();
    window.location.href = '/'
  }
  return (
    <nav className="navbar navbar-expand-lg ">
      <div className="container-fluid">
        <a className="navbar-brand px-3" href="/dashboard" style={{ fontSize: "25px" }}>{`Google-OAuth`}</a>
        {/* <a className="navbar-brand px-3" href="/home" style={{fontSize:"25px"}}><FaStaylinked style={{color:"white",fontSize:"40px"}}/>{` Pixel Rooms`}</a> */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"><i className="fa fa-bars" style={{ color: "white" }}></i></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav px-4">
            {loguser ? (<>
              <div className="collapse navbar-collapse " id="navbarText">
                <ul className="navbar-nav  mb-2 mb-lg-0">
                  <li className="nav-item">
                  <button className="nav-item btn btn-success" type="button" >
                 <i className='fa fa-user'/> {loguser.username}
                </button>
                  </li>
                  <li className="nav-item">
                  <button className="btn btn-warning " type="button" >
                <a className="dropdown-item" href="#" onClick={logout}>Logout</a>
                </button>
                  </li>
                </ul >
              </div>
              {/* <div className="dropdown">
                <button className="btn btn-success" type="button" >
                 <i className='fa fa-user'/> {loguser.username}
                </button>
                <button className="btn btn-warning " type="button" >
                <a className="dropdown-item" href="#" onClick={logout}>Logout</a>
                </button>
              </div> */}
            </>) : (<>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/register" style={{ fontSize: "20px" }}>Register</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/" style={{ fontSize: "20px" }}>Login</a>
              </li>
            </>)}


          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav