
import { Link } from "react-router-dom";

export default function Following({ following }) {
  
  return (
    <div className="d-flex col text-center justify-content-around pt-5 w-100">
      {
        following.length === 0 ? <p>404 no frens found :(</p> :
        following?.map(user => <FollowingCard key={user.id} user={user}/>)
      }
    </div>
  );
}

function FollowingCard({ user }) {

  return (
    <Link to={`/profile/${user.username}`}>
      <img src={user.profile_pic} alt='friend' className="profile-pic-small"/>
      <p>{user.username}</p>
    </Link>
  );
}