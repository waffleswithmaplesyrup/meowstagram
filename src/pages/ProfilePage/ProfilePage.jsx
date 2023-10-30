//* react
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactLoading from "react-loading";

//* utils
import { viewAllUserPostsService } from "../../utilities/posts/posts-service";
import { showFollowsService } from "../../utilities/followers/followers-service";
import { getUser } from "../../utilities/users/users-service";

//* components
import EditProfilePic from "../../components/ProfileInteractions/EditProfilePic";
import EditProfileBio from "../../components/ProfileInteractions/EditProfileBio";
import FollowButton from "../../components/ProfileInteractions/FollowButton";

//* sweet alert
import Swal from 'sweetalert2';
import { swalBasicSettings } from "../../utilities/posts/posts-service";

export default function ProfilePage () {
  const { username } = useParams();

  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);

  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await viewAllUserPostsService(username);
        const followInfo = await showFollowsService(username);
        setFollowers(followInfo.followers);
        setFollowing(followInfo.following);

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
      {
        user.length > 0 ? (
          <div>
            <div style={{width:"200px", margin: "auto"}}>
              {
                getUser().username === username ? 
                <div className="text-end">
                  <EditProfilePic />
                </div> : ""
              }
              <img src={user[0].profile_pic} alt="profile pic" className="profile-pic" style={{marginTop: "-20px"}}/>
            </div>
          <p>{user[0].username}</p>
          
          <p>{posts.length} post{posts.length === 1 ? "" : "s"}</p>
          <p>{followers.length} follower{followers.length === 1 ? "" : "s"}</p>
          <p>{following.length} following</p>
          <p>
            {
              user[0].bio === "" && user[0].username === getUser().username ? "Write something about yourself..." :
              user[0].bio
            }
            {
              getUser().username === username ? 
              <EditProfileBio /> : "" 
            }
            
            </p>
          {
            getUser().username === username ? 
            "" :
            <FollowButton />
          }
          
        </div>
        ) : ""
      }
      
      <hr />

      {
        posts.length === 0 ? <p>user has no posts yet</p> :
        <div className="image-grid text-center">
        {
          posts?.map(post => <Link to={`/profile/${username}/${post.id}`} key={post.id}><img src={post.photo} alt="post"/></Link>)
        }
        </div>
      }

    </div>
  );
}