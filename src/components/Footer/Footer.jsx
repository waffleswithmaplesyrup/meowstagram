import { Link } from "react-router-dom";

const date = new Date();

export default function Footer () {

  return (
    <div className="container">
      <footer className="py-3 my-4">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
          <li className="nav-item"><Link to='/' className="nav-link px-2 text-muted">Home</Link></li>
          <li className="nav-item"><Link to='/about' className="nav-link px-2 text-muted">About</Link></li>
          <li className="nav-item"><Link to='/help' className="nav-link px-2 text-muted">Help</Link></li>
          <li className="nav-item"><Link to='/privacy' className="nav-link px-2 text-muted">Privacy</Link></li>
          <li className="nav-item"><Link to='/terms' className="nav-link px-2 text-muted">Terms</Link></li>
        </ul>
        <p className="text-center text-muted">© {date.getFullYear()} MEOWSTAGRAM</p>
      </footer>
    </div>
  );
}