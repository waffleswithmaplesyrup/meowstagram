import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { viewAllUserPostsService } from "../../utilities/posts/posts-service";

export default function ProfilePage () {
  const { username } = useParams();

  return (
    <div className="w-100 text-center">
      <ProfileHeader />
      <hr />
      <ProfileFeed username={username} />
    </div>
  );
}

function ProfileHeader() {
  return (
    <div>
      <img src='' alt="profile pic"/>
      <div>
        <header>
          <p>username</p>
          <button>Edit Profile</button>
        </header>
        <header>
          <p>number of posts</p>
          <p>number of followers</p>
          <p>number of following</p>
        </header>
        <header>
          bio
        </header>
      </div>
    </div>
  );
}

function ProfileFeed({ username }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await viewAllUserPostsService(username);
      // console.log(data);
      setPosts(data);
    };
    fetchPosts();
  }, [username]);

  return (
    <div className="image-grid">
      {
        posts?.map(post => <Link to={`/profile/${username}/${post.id}`} key={post.id}><img src={post.photo} alt="post"/></Link>)
      }
    </div>
  );
}