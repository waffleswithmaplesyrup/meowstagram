import { useEffect, useState } from "react";

import { likePostService, showAllLikesService, unlikePostService } from "../../utilities/likes/likes-service";
import { getUser } from "../../utilities/users/users-service";

//* font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as solid from '@fortawesome/free-solid-svg-icons';
import * as regular from '@fortawesome/free-regular-svg-icons';


export default function LikeButton({ postID }) {
  const [liked, setliked] = useState(false);
  const [likes, setLikes] = useState([]);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    const fetchLikes = async () => {
      const likesData = await showAllLikesService(postID);
      if (likesData.filter(like => like.sender_id === getUser().id).length > 0) {
        setliked(true);
      }
      // console.log(likesData);
      setLikes(likesData);
      setLikesCount(likesData.length);
    };
    fetchLikes();
    
  }, [postID]);
  
  const handleLike = async () => {
    await likePostService(postID);
    setliked(true);
    setLikesCount(likesCount + 1);
  };

  const handleUnlike = async() => {
    await unlikePostService(postID);
    setliked(false);
    setLikesCount(likesCount - 1);
  };

  return (
    <div className="my-3">
    { liked ? 
      <FontAwesomeIcon onClick={handleUnlike} 
      icon={solid.faHeart} style={{color: "#ff3040"}} className="interaction"/>
       : 
      <FontAwesomeIcon onClick={handleLike} 
      icon={regular.faHeart} style={{color: "#2B0806"}} className="interaction"/>
    }
      <p>{likesCount} like{likesCount === 1 ? "" : "s"}</p>

    </div>
  );
}