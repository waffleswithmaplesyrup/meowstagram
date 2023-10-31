import { Link } from "react-router-dom";

export default function FollowingCard({ user }) {

  return (
    <Link to={`/profile/${user.username}`}>
      <img src={user.profile_pic} alt='friend' className="profile-pic-small"/>
      <p>{user.username}</p>
    </Link>
  );
}