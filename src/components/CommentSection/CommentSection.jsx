import { useEffect, useState } from "react";

import { getAllCommentsService } from "../../utilities/comments/comments-service";
import { getUser } from "../../utilities/users/users-service";

import DeleteButton from "./DeleteButton";

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
        comments?.map(comment => <div key={comment.id} className="comment-card">
          <img src={comment.profile_pic} alt="profile pic" className="profile-pic-small"/>
          <p className="username">{comment.username}</p>
          <p>{comment.content}</p>
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