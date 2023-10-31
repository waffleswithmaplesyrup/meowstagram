import { useEffect, useState } from "react";

import { getAllCommentsService } from "../../utilities/comments/comments-service";
import { getUser } from "../../utilities/users/users-service";

import DeleteButton from "./DeleteButton";
import { Link } from "react-router-dom";

export default function CommentSection({ postID }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const commentsData = await getAllCommentsService(postID);
      setComments(commentsData);
    };
    fetchComments();
  }, [postID]);

  const filterAfterDelete = (commentDeleted) => {
    setComments(comments.filter(comment => comment.id !== commentDeleted));
  };

  return (
    <div>
      {
        comments.length === 0 ? <p>Be the first to comment</p> :
        comments?.map(comment => <div key={comment.id} className="d-flex justify-content-between mb-2">
          <div className="d-flex">
            <Link to={`/profile/${comment.username}`}>
              <img src={comment.profile_pic} alt="profile pic" className="profile-pic-small"/>
            </Link>
            <Link className="mx-3" to={`/profile/${comment.username}`}>
              <p className="username mb-1">{comment.username}</p>
              <p>{comment.content}</p>
            </Link>
          </div>
          {/* <p>{comment.content}</p> */}
          <div className="text-end">     
          {
            comment.sender_id === getUser().id && (
              <DeleteButton comment={comment} filterAfterDelete={filterAfterDelete} />
            )
          }
          </div>
        </div>
        )
      }
    </div>
  );

}