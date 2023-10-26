import { useState } from "react";
import { Link } from "react-router-dom";

export default function Suggested () {
  const [suggested, setSuggested] = useState([
    { username: "ignacio", profilePic: ""},
    { username: "hector", profilePic: ""},
  ]);

  return (
    <div className="container px-4 pt-5" id="hanging-icons">
    <p className="pb-2 border-bottom">Suggested For You</p>
    <div className="g-4 py-2 row-cols-1 row-cols-lg-3">
      {
        suggested?.map(user => <SuggestedCard key={user.id} user={user} /> )
      }
    </div>
  </div>
  );
}

function SuggestedCard ({ user }) {

  return (
    <div className="col d-flex align-items-start">
      <div className="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
        <img src="" alt="profile pic" />
      </div>
      <p className="text-body-emphasis">{user.username}</p>
      <Link to="/" className="">
        follow
      </Link>
    </div>
  );
}