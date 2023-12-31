import { useEffect, useState } from "react";
import { followUserService, showFollowsService, unfollowUserService } from "../../utilities/followers/followers-service";
import { useParams } from "react-router-dom";
import { getUser } from "../../utilities/users/users-service";

export default function FollowButton({ followers, changeFollowerCount }) {
  const { username } = useParams();
 
  const [isFollowing, setIsFollowing] = useState(false);
  const [count, setCount] = useState(followers);

  useEffect(() => {
    const fetchFollowing = async () => {
      const data = await showFollowsService(getUser().username);
      setIsFollowing(data.following.filter(user => user.username === username).length > 0);
    };
    fetchFollowing();
  }, [username]);

  const handleUnfollow = async () => {
    
    const unfollow = await unfollowUserService(username);
    
    setIsFollowing(false);

    changeFollowerCount("unfollow");
  };

  const handleFollow = async () => {
    
    const follow = await followUserService(username);
    
    setIsFollowing(true);

    changeFollowerCount("follow");

  };

  return (
    <div>
      {
        isFollowing ? <button onClick={handleUnfollow} className="form-control default-button" style={{width: "100px", fontWeight: "normal"}}>following</button> : 
        <button className="form-control default-button" style={{width: "100px", fontWeight: "normal"}} onClick={handleFollow}>follow</button>
      }
    </div>
  );
}