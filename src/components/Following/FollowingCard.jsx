import { Link } from "react-router-dom";

export default function FollowingCard({ user }) {

  return (
    <Link to={`/profile/${user.username}`} className="pt-2">
      <img src={user.profile_pic} alt='friend' className="profile-pic-small opacity-8"/>
      <p>{user.username}</p>
    </Link>
  );
}