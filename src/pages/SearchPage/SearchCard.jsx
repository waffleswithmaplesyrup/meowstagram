import { useEffect, useState } from "react";
import { showFollowsService } from "../../utilities/followers/followers-service";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";


//* sweet alert
import Swal from 'sweetalert2';
import { swalBasicSettings } from "../../utilities/posts/posts-service";


export default function SearchCard ({ user }) {
  const [loading, setLoading] = useState(true);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const followInfo = await showFollowsService(user.username);
        setFollowers(followInfo.followers);

      } catch (err) {
        if (err.message === "Unexpected end of JSON input") {
          Swal.fire({
            ...swalBasicSettings("Internal Server Error", "error"),
            text: "Please try again later.",
          });
        } else {
          Swal.fire({
            ...swalBasicSettings("Error", "error"),
            text: err.message,
            confirmButtonText: "Try Again",
          });
        }
      } finally {
        setLoading(false);
      }
    };
    fetchFollowers();
  }, [user]);

  if (loading) {
    return <div className="d-flex col justify-content-center align-items-center" style={{height: "100vh"}}>
    <ReactLoading type="spin" color="#67E8B5" height={100} width={50} />
    <p>Loading...</p>
    </div>
  }

  return (
    <div style={{width: "400px", margin: "auto"}}>
    <div className="m-auto d-flex justify-content-between my-3" >
      <Link target="_blank" to={`/profile/${user.username}`} className="d-flex">
        <img className="profile-pic-small" src={user.profile_pic} alt='profile pic' />
        <p className="username mx-3">{user.username}</p>
      </Link>
      <p><span className="username">{followers.length}</span> followers</p>
    </div>
    <hr />
    </div>
  );
}