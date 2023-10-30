import { Link, useNavigate } from "react-router-dom";

import { logOutService } from "../../utilities/users/users-service";

export default function NavBar ({ user, updateUser }) {
  const navigate = useNavigate();

  const handleLogout = (event) => {
    event.preventDefault();
    logOutService();
    updateUser(null);
    navigate("/");
  };

  return (
    <nav className="d-flex flex-column flex-shrink-0 p-3 pt-5 bg-transparent sticky-top" style={{width: "280px", height: "100vh", borderRight: "solid #695F5F 1px"}}>
    <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
      <img src="/assets/nav-logo.png" alt="logo" className="nav-logo" />
    </Link>
    <br />
    <div className="text-center">
      <Link to={`/profile/${user.username}`}><img className="profile-pic" src={user.profile_pic} alt='profile pic'/></Link>
      <p className="pt-3">Welcome, {user.username}!</p>
    </div>
    
    <br />
    <ul className="nav nav-pills flex-column mb-auto">
      <li>
        <Link to="/" className="nav-link link-dark">
          <svg className="bi me-2" width="16" height="16"><use xlinkHref="#speedometer2"></use></svg>
          Home
        </Link>
      </li>
      <li>
        <Link to='/search' className="nav-link link-dark">
          <svg className="bi me-2" width="16" height="16"><use xlinkHref="#speedometer2"></use></svg>
          Search
        </Link>
      </li>
      <li>
        <Link to='/create' className="nav-link link-dark">
          <svg className="bi me-2" width="16" height="16"><use xlinkHref="#table"></use></svg>
          Create
        </Link>
      </li>
      {/* <li>
        <Link to='/donate' className="nav-link link-dark">
          <svg className="bi me-2" width="16" height="16"><use xlinkHref="#grid"></use></svg>
          Donate
        </Link>
      </li> */}
    </ul>
    <hr />
    <div>
      <Link to='/' className="nav-link link-dark" onClick={handleLogout}>Logout</Link>
    </div>
  </nav>
    
  );
}


  