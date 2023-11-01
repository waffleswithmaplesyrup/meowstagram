//* react
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";

//* utils
import { viewOnePostService } from "../../utilities/posts/posts-service";
import { getUser } from "../../utilities/users/users-service";

//* components
import LikeButton from "../../components/PostInteractions/LikeButton";
import EditPost from "../../components/Post/EditPost";
import DeletePost from "../../components/Post/DeletePost";
import CommentSection from "../../components/CommentSection/CommentSection";
import CreateNewComment from "../../components/CommentSection/CreateNewComment";

//* sweet alert
import Swal from 'sweetalert2';
import { swalBasicSettings } from "../../utilities/posts/posts-service";
import { Bookmark } from "../../components/Feed/Bookmark";


export default function PostPage () {
  const { username, postID } = useParams();
  const [loading, setLoading] = useState(true);

  const [post, setPost] = useState([]);
  
  const yourPost = username === getUser().username;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await viewOnePostService(username, postID);
        setPost(data);
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
    fetchPost();
  }, [username, postID]);

  const date = new Date(post.date_posted);

  if (loading) {
    return <div className="d-flex col justify-content-center align-items-center" style={{height: "100vh"}}>
    <ReactLoading type="spin" color="#67E8B5" height={100} width={50} />
    <p>Loading...</p>
    </div>
  }

  return (
    <div className="d-xxl-flex col my-5 py-5 justify-content-center" > 
      {
        post.length === 0 ? "no post found" : (
          <>
            <div className="m-5" style={{width: "500px"}} >
              <img className="post-image" src={post.photo} alt="post image" />
              <div className="d-flex justify-content-between my-2">
                <LikeButton postID={postID} />
                <Bookmark postID={postID} />
              </div>
            </div>

            <div className="m-5" style={{width: "500px"}}>
              <div className="d-flex justify-content-between">
                <Link to={`/profile/${post.username}`} className="d-flex">
                  <img className="profile-pic-small" src={post.profile_pic} alt="profile pic"/>
                  <p className="username px-2">{post.username}</p>
                </Link>
                <p className="text-end">{date.toDateString()}</p>
              </div>
              
              <div className="d-flex justify-content-between my-3">
                <p>{post.caption}</p>
                {
                  yourPost && (
                    <div style={{marginLeft: "10px"}}>
                      <EditPost post={post} />
                      <DeletePost post={post} />
                    </div>
                  )
                }
              </div>

              <hr />
              <CommentSection postID={postID}/>
              <hr />
              <CreateNewComment username={username} postID={postID}/>
            </div>
          </>
        )
      }
      
    </div>


  );
}