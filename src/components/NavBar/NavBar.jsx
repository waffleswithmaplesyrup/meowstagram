import { Link } from "react-router-dom";


export default function NavBar ({ user }) {
  return (
    <div>
      <h1>meowstagram</h1>
      <img src={user.profilePic} alt='profile pic'/>
      <p>Welcome, {user.name}!</p>

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

      <div>
        hamburger more
      </div>
    </div>
  );
}