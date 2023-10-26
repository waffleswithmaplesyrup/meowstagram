import { Link } from "react-router-dom";

import { logOutService } from "../../utilities/users/users-service";

export default function NavBar ({ user, updateUser }) {

  const handleLogout = (event) => {
    event.preventDefault();
    logOutService();
    updateUser(null);
    // navigate("/");
  };

  return (
    <div>
      <h1>meowstagram</h1>
      <img src={user.profile_pic} alt='profile pic'/>
      <p>Welcome, {user.username}!</p>

      <div>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/search'>Search</Link>
          </li>
          <li>
            <Link to='/create'>Create</Link>
          </li>
          <li>
            <Link to='/donate'>Donate</Link>
          </li>
        </ul>
      </div>
      

      <div>
        <Link to='/' onClick={handleLogout}>Logout</Link>
      </div>
    </div>
  );
}