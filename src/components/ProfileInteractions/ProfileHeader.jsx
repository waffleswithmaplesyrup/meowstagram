import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactLoading from "react-loading";

import { showFollowsService } from "../../utilities/followers/followers-service";
import { getUser } from "../../utilities/users/users-service";

import EditProfilePic from "./EditProfilePic";
import EditProfileBio from "./EditProfileBio";
import FollowButton from "./FollowButton";

//* sweet alert
import Swal from 'sweetalert2';
import { swalBasicSettings } from "../../utilities/posts/posts-service";


export default function ProfileHeader({ user, posts }) {
  const { username } = useParams();

  const [loading, setLoading] = useState(true);

  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  const [followerCount, setFollowerCount] = useState(0);

  useEffect(() => {
    const fetchFollow = async () => {
      try {
        const followInfo = await showFollowsService(username);
        setFollowers(followInfo.followers);
        setFollowerCount(followInfo.followers.length);
        setFollowing(followInfo.following);

        
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
    fetchFollow();
    
  }, [username]);

  if (loading) {
    return <div className="d-flex col justify-content-center align-items-center" style={{height: "100vh"}}>
    <ReactLoading type="spin" color="#67E8B5" height={100} width={50} />
    <p>Loading...</p>
    </div>
  }

  const changeFollowerCount = (action) => {
    if (action === 'follow') {
      setFollowerCount(followerCount+1);
    } else {
      setFollowerCount(followerCount-1);
    }
  };

  return (
    <header className="w-100 d-flex justify-content-center align-items-center">
      <div>
        <div>
          { getUser().username === user.username ? <EditProfilePic photo={user.profile_pic} /> : <img src={user.profile_pic} alt="profile pic" className="profile-pic"/> }
          
        </div>
      </div>

      <div className="px-5" style={{width: "500px"}}>
        <div className="d-flex justify-content-between mb-2">
          <p className="username">{user.username}</p>
          { getUser().username === user.username ? <EditProfileBio /> : <FollowButton followers={followers.length} changeFollowerCount={changeFollowerCount} /> }
        </div>

        <div className="d-flex justify-content-between mb-2">
          <p>
            <span className="username">{posts.length}</span> post{ posts.length === 1 ? "" : "s" }
          </p>
          <p>
            <span className="username">{followerCount}</span> follower{ followerCount === 1 ? "" : "s" }
          </p>
          <p>
            <span className="username">{following.length}</span> following
          </p>
        </div>

        <div className="mb-2">
          <p className="text-start username">{user.bio}</p>
        </div>
      </div>
    </header>
  );
}