import { Link } from "react-router-dom";

const date = new Date();

export default function Footer () {

  return (
    <footer>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
        <li>
          <Link to='/help'>Help</Link>
        </li>
        <li>
          <Link to='/privacy'>Privacy</Link>
        </li>
        <li>
          <Link to='/terms'>Terms</Link>
        </li>
      </ul>

      <div>
        {date.getFullYear()} MEOWSTAGRAM
      </div>
    </footer>
  );
}