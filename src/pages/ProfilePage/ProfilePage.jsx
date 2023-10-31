//* react
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactLoading from "react-loading";

//* utils
import { viewAllUserPostsService } from "../../utilities/posts/posts-service";

//* components
import ProfileHeader from "../../components/ProfileInteractions/ProfileHeader";

//* sweet alert
import Swal from 'sweetalert2';
import { swalBasicSettings } from "../../utilities/posts/posts-service";


export default function ProfilePage () {
  const { username } = useParams();

  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await viewAllUserPostsService(username);

        //* check if user has no posts
        if (data.length === 1 && data[0].id === null) {
          setPosts([]);
        } else {
          setPosts(data);
        }
        setUser(data);
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
    fetchPosts();
    
  }, [username]);

  if (loading) {
    return <div className="d-flex col justify-content-center align-items-center" style={{height: "100vh"}}>
    <ReactLoading type="spin" color="#67E8B5" height={100} width={50} />
    <p>Loading...</p>
    </div>
  }

  return (
    <div className="w-100 text-center py-5 my-2">

      <ProfileHeader user={user[0]} posts={posts} />
      
      <hr />

      { posts.length === 0 ? <p>user has no posts yet</p> : <div className="image-grid text-center"> { posts?.map(post => <Link to={`/profile/${username}/${post.id}`} key={post.id}><img src={post.photo} alt="post"/></Link>) } </div> }

    </div>
  );
}