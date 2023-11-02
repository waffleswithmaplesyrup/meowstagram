import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import ReactLoading from "react-loading";

import { logOutService } from "../../utilities/users/users-service";

//* font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as solid from '@fortawesome/free-solid-svg-icons';
import * as regular from '@fortawesome/free-regular-svg-icons';

//* sweet alert
import Swal from 'sweetalert2';
import { swalBasicSettings } from "../../utilities/posts/posts-service";

export default function NavBar ({ user, updateUser }) {
  const navigate = useNavigate();

  const [status, setStatus] = useState(null);

  const handleLogout = async (event) => {
    event.preventDefault();
    setStatus("loading");

    const prompt = await Swal.fire({
      ...swalBasicSettings("Proceed to logout?", "warning"),
      text: `Are you sure you want to log out of ${user.username}?`,
      showCancelButton: true,
      confirmButtonText: "LOGOUT",
      cancelButtonText: "CANCEL",
    });

    if (prompt.isConfirmed) {
      try {
        await logOutService();
        updateUser(null);
  
        Swal.fire(swalBasicSettings("Logged out successfully!", "success"))
       
        navigate("/");

  
      } catch (err) {
        if (err.message === "Unexpected end of JSON input") {
          Swal.fire({
            ...swalBasicSettings("Internal Server Error", "error"),
            text: "Please try again later.",
          });
        } else {
          Swal.fire({
            ...swalBasicSettings("Error", "error"),
            text: err.message,
            confirmButtonText: "Try Again",
          });
        }
        setStatus("error");
      } finally {
        setStatus("success");
      }
    }

    
    
  };

  return (
    <nav className="d-flex flex-column flex-shrink-0 p-3 pt-5 bg-transparent sticky-top" style={{width: "280px", height: "100vh", borderRight: "solid #695F5F 1px"}}>
    <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
      <img src="/assets/nav-logo.png" alt="logo" className="nav-logo" />
    </Link>
    <br />
    <div className="text-center">
      <Link to={`/profile/${user.username}`}><img className="profile-pic opacity-8" src={user.profile_pic} alt='profile pic'/></Link>
      <p className="pt-3">Welcome, <span className="username">{user.username}</span>!</p>
    </div>
    
    <br />
    <ul className="nav nav-pills flex-column mb-auto">
      <li>
        <Link to="/" className="nav-link link-dark d-flex">
          <div className="d-flex justify-content-center" style={{width: "25px"}}>
            <FontAwesomeIcon icon={solid.faHouse} style={{color: "#695F5F"}} className="interaction"/>
          </div>
          <p className="px-3">Home</p>
        </Link>
      </li>
      <li>
        <Link to='/search' className="nav-link link-dark d-flex">
          <div className="d-flex justify-content-center" style={{width: "25px"}}>
            <FontAwesomeIcon icon={solid.faMagnifyingGlass} style={{color: "#695F5F"}} className="interaction"/>
          </div>
          <p className="px-3">Search</p>
        </Link>
      </li>
      <li>
        <Link to='/create' className="nav-link link-dark d-flex">
          <div className="d-flex justify-content-center" style={{width: "25px"}}>
            <FontAwesomeIcon icon={regular.faPlusSquare} style={{color: "#695F5F"}} className="interaction"/>
          </div>
          <p className="px-3">Create</p>
        </Link>
      </li>
      <li>
        <Link to='/bookmarked' className="nav-link link-dark d-flex">
          <div className="d-flex justify-content-center" style={{width: "25px"}}>
            <FontAwesomeIcon icon={regular.faBookmark} style={{color: "#695F5F"}} className="interaction"/>
          </div>
          <p className="px-3">Bookmarked</p>
        </Link>
      </li>
    </ul>
    <hr />
    <div>
      <Link to='/' style={{color: "#695F5F"}} className="nav-link link-dark d-flex justify-content-between align-items-center" 
      onClick={handleLogout}>Logout <FontAwesomeIcon icon={solid.faRightFromBracket} style={{color: "#695F5F"}} className="interaction"/></Link>
    </div>
  </nav>
    
  );
}


  