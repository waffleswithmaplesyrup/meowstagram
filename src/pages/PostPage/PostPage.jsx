import PostAuthor from "../../components/PostAuthor/PostAuthor";
import PostInteractions from "../../components/PostInteractions/PostInteractions";
import Comments from "../../components/Comments/Comments";

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteOnePostService, editPostService, viewOnePostService } from "../../utilities/posts/posts-service";
import { getUser } from "../../utilities/users/users-service";

export default function PostPage () {
  const { username, postID } = useParams();
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);

  const yourPost = username === getUser().username;
  console.log("is this your post?", yourPost);
  // const yourComment = comments.sender_id === getUser().id
  // console.log("is this your comment?", yourComment);


  useEffect(() => {
    const fetchPost = async () => {
      const data = await viewOnePostService(username, postID);
      // console.log(data);
      setPost(data);
      const commentsData = await getAllCommentsService(postID);
      console.log(commentsData);
      setComments(commentsData);
    };
    fetchPost();
  }, [username, postID]);

  const date = new Date(post.date_posted);
  // console.log(date);

  const filterAfterDelete = (commentDeleted) => {
    setComments(comments.filter(comment => comment.id !== commentDeleted));
  };

  return (
    // <div>
    //   <div>
    //     <ImageCarousel />
    //     <PostInteractions />
    //     <p>date</p>
    //   </div>

    //   <div>
    //     <PostAuthor />
    //     <p>post caption</p>
    //     <Comments />
    //     <PostComment />
    //   </div>
    // </div>
    
    <div> 
      {
        post.length === 0 ? "" : (
          <div>
            <img className="post-image" src={post.photo} alt="post image" />
            <p>{post.caption}</p>

            <img className="profile-pic-small" src={post.profile_pic} alt="profile pic"/>
            <p>{post.username}</p>
            {
              yourPost && (
                <div>
                  <EditPost post={post} />
                  <DeletePost post={post} />
                </div>
              )
            }
            <p>{date.toDateString()}</p>
            <div>
              {
                comments.length === 0 ? <p>Be the first to comment</p> :
                comments?.map(comment => <div key={comment.id}>
                    <img src={comment.profile_pic} alt="profile pic" className="profile-pic-comment"/>
                    <p>{comment.username}</p>
                    <p>{comment.content}</p>
                    {
                      comment.sender_id === getUser().id && (
                        <DeleteComment comment={comment} filterAfterDelete={filterAfterDelete} />
                      )
                    }
                  </div>
                  )
              }
            </div>
            <CreateNewComment username={username} postID={postID}/>
          </div>
        )
      }
      
    </div>


  );
}

function ImageCarousel () {

  return (
    <div>
      images
    </div>
  );
}


import Debug from "debug";
import { createNewCommentService, deleteCommentService, getAllCommentsService } from "../../utilities/comments/comments-service";
const debug = Debug("meowstagram:EditPost");

function EditPost({ post }) {
  const [caption, setCaption] = useState(post.caption);
  // console.log(caption);

  const updateCaption = async (event) => {
    event.preventDefault();

    try {

      const data = await editPostService(post.id, { caption });
      debug(data);
      window.location = `/profile/${post.username}/${post.id}`;
    } catch (err) {
      console.error(err.message);
    }

  };

  return (
    <>
    <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target={`#id${post.id}`}>
      Edit
    </button>

    <div className="modal" id={`id${post.id}`}>
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h4 className="modal-title">Edit Todo</h4>
            <button type="button" className="btn-close" data-bs-dismiss="modal"
            onClick={() => setCaption(post.caption)}></button>
          </div>

          <div className="modal-body">
            <input type="text" className="form-control" 
            value={caption} onChange={event => setCaption(event.target.value)}/>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-warning" data-bs-dismiss="modal" onClick={updateCaption}>Edit</button>
          </div>

        </div>
      </div>
    </div>
    </>
  );
}

function DeletePost({ post }) {

  const handleDelete = async () => {
    console.log("delete post id:", post.id);
    


    // const prompt = await Swal.fire({
    //   ...swalBasicSettings("Proceed to delete?", "warning"),
    //   text: "Your favourite outfit containing this apparel will also be deleted.",
    //   showCancelButton: true,
    //   confirmButtonText: "DELETE",
    //   cancelButtonText: "CANCEL",
    // });

    // if (prompt.isConfirmed) {
      try {
        await deleteOnePostService(post.id);
        
        window.location = `/profile/${post.username}`;

        // Swal.fire(swalBasicSettings("Deleted!", "success"));
      } catch (err) {
        console.error(err);
        // Swal.fire({
        //   ...swalBasicSettings("Error", "error"),
        //   text: "Unable to delete. Please try again!",
        // });
      }
    // }

  };

  return (
    <button
    onClick={handleDelete} 
    type="button" className="btn btn-danger">Delete</button>
  );
}

function DeleteComment({ comment, filterAfterDelete }) {

  const handleDelete = async () => {
    console.log("delete comment id:", comment.id);
    


    // const prompt = await Swal.fire({
    //   ...swalBasicSettings("Proceed to delete?", "warning"),
    //   text: "Your favourite outfit containing this apparel will also be deleted.",
    //   showCancelButton: true,
    //   confirmButtonText: "DELETE",
    //   cancelButtonText: "CANCEL",
    // });

    // if (prompt.isConfirmed) {
      try {
        await deleteCommentService(comment.id);
        
        // window.location = `/profile/${post.username}`;
        filterAfterDelete(comment.id);

        // Swal.fire(swalBasicSettings("Deleted!", "success"));
      } catch (err) {
        console.error(err);
        // Swal.fire({
        //   ...swalBasicSettings("Error", "error"),
        //   text: "Unable to delete. Please try again!",
        // });
      }
    // }

  };

  return (
    <button
    onClick={handleDelete} 
    type="button" className="btn btn-danger">Delete</button>
  );
}

function CreateNewComment({ username, postID }) {
  const [content, setContent] = useState('');
  const [status, setStatus] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const newComment = await createNewCommentService(postID, content);
      console.log('new comment created:', newComment);
      window.location = `/profile/${username}/${postID}`;
    } catch (err) {
      if (err.message === "Unexpected end of JSON input") {
        // Swal.fire({
        //   ...swalBasicSettings("Internal Server Error", "error"),
        //   text: "Please try again later.",
        // });
      } else {
        // Swal.fire({
        //   ...swalBasicSettings("Error", "error"),
        //   text: err.message,
        //   confirmButtonText: "Try Again",
        // });
      }
      setStatus("error");
    } finally {
      setStatus("success");
    }
  };

  return (
    <form className="w-100 p-4" onSubmit={handleSubmit}>
      <div className="form-outline form-floating mb-3" style={{width: "22rem", height: "10rem"}}>
        <textarea onChange={(event) => setContent(event.target.value)} 
          value={content} name="caption" placeholder="Add a comment" 
          className="form-control h-100" id="floatingInput" rows="4"></textarea>
        <label htmlFor="floatingInput">Add a comment</label>
      </div>
      <button>Post</button>
    </form>
  );
}