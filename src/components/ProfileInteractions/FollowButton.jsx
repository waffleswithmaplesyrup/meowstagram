import { useEffect, useState } from "react";
import { followUserService, showFollowsService, unfollowUserService } from "../../utilities/followers/followers-service";
import { useParams } from "react-router-dom";
import { getUser } from "../../utilities/users/users-service";

export default function FollowButton() {
  const { username } = useParams();

  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchFollowing = async () => {
      const data = await showFollowsService(getUser().username);
      setIsFollowing(data.following.filter(user => user.username === username).length > 0);
    };
    fetchFollowing();
  }, [username]);


  const handleUnfollow = async () => {
    console.log("unfollow", username);
    const unfollow = await unfollowUserService(username);
    console.log(unfollow);
    setIsFollowing(false);
  };

  const handleFollow = async () => {
    console.log("follow", username);
    const follow = await followUserService(username);
    console.log(follow);
    setIsFollowing(true);
  };

  return (
    <div>
      {
        isFollowing ? <button onClick={handleUnfollow}>unfollow</button> : 
        <button onClick={handleFollow}>follow</button>
      }
    </div>
  );
}