import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { viewAllUserPostsService } from "../../utilities/posts/posts-service";

export default function ProfilePage () {
  const { username } = useParams();

  const [posts, setPosts] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await viewAllUserPostsService(username);
      //* fetch number of followers
      //* fetch number of following

      // console.log(data);
      setPosts(data);
    };
    fetchPosts();
  }, [username]);


  return (
    <div className="w-100 text-center py-5">
      {
        posts.length > 0 ? (
          <div>
          <img src={posts[0].profile_pic} alt="profile pic" 
          className="profile-pic"/>
          <p>{posts[0].username}</p>
          <button>edit profile</button>
          <p>{posts.length} posts</p>
          <p>{followers.length} followers</p>
          <p>{following.length} following</p>
          <p>{posts[0].bio}</p>
        </div>
        ) : ""
      }
      
      <hr />

      <div className="image-grid">
      {
        posts?.map(post => <Link to={`/profile/${username}/${post.id}`} key={post.id}><img src={post.photo} alt="post"/></Link>)
      }
    </div>
    </div>
  );
}