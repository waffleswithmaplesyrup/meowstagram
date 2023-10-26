import { useState } from "react";

export default function Following() {
  const [following, setFollowing] = useState([
    { username: "juju", profilePic: ""},
    { username: "eva", profilePic: ""},
  ]);
  return (
    <div className="d-flex col text-center justify-content-around pt-5 w-100">
      {
        following?.map(user => <FollowingCard ey={user.id} user={user}/>)
      }
    </div>
  );
}

function FollowingCard({ user }) {

  return (
    <div>
      <img src='' alt='friend'/>
      <p>{user.username}</p>
    </div>
  );
}