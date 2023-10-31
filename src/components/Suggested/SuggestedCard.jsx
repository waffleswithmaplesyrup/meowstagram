import { Link } from "react-router-dom";

export default function SuggestedCard ({ user }) {

  return (
    <div >
      <Link to={`/profile/${user.username}`} className="d-flex py-2" >
        <img src={user.profile_pic} alt="profile pic" className="profile-pic-small opacity-8" />
        <p className="mx-2 username">{user.username}</p>
      </Link>
    </div>
  );
}