import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { viewAllUserPostsService } from "../../utilities/posts/posts-service";

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

      // console.log(data[0].id);
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
          <button>edit profile</button>
          <p>{posts.length} posts</p>
          <p>{followers.length} followers</p>
          <p>{following.length} following</p>
          <p>{user[0].bio}</p>
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