import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { viewAllUserPostsService } from "../../utilities/posts/posts-service";
import { followUserService, showFollowsService, unfollowUserService } from "../../utilities/followers/followers-service";
import { getUser } from "../../utilities/users/users-service";

export default function ProfilePage () {
  const { username } = useParams();

  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  
  useEffect(() => {
    const fetchPosts = async () => {
      const data = await viewAllUserPostsService(username);
      //* fetch number of followers
      //* fetch number of following
      const followInfo = await showFollowsService(username);
      setFollowers(followInfo.followers);
      setFollowing(followInfo.following);

      // console.log(followInfo.followers);

      //* check if user has no posts
      if (data.length === 1 && data[0].id === null) {
        setPosts([]);
      } else {
        setPosts(data);
      }
      setUser(data);
    };
    fetchPosts();
  }, [username]);

  return (
    <div className="w-100 text-center py-5">
      {
        user.length > 0 ? (
          <div>
          <img src={user[0].profile_pic} alt="profile pic" 
          className="profile-pic"/>
          <p>{user[0].username}</p>
          
          <p>{posts.length} posts</p>
          <p>{followers.length} followers</p>
          <p>{following.length} following</p>
          <p>{user[0].bio}</p>
          {
            getUser().username === username ? <EditProfile /> :
            <FollowButton />
          }
          
        </div>
        ) : ""
      }
      
      <hr />

      <div className="image-grid text-center">
      {
        posts.length === 0 ? <p>user has no posts yet</p> :
        posts?.map(post => <Link to={`/profile/${username}/${post.id}`} key={post.id}><img src={post.photo} alt="post"/></Link>)
      }
      </div>
    </div>
  );
}

function FollowButton() {
  const { username } = useParams();

  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchFollowing = async () => {
      const data = await showFollowsService(getUser().username);
      setIsFollowing(data.following.filter(user => user.username === username).length > 0);
    };
    fetchFollowing();
  }, [username]);

  console.log(isFollowing);

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

function EditProfile() {
  return (
    <div>
      <button>edit profile</button>
    </div>
  );
}