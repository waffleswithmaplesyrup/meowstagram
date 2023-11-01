import { useEffect, useState } from 'react';

//* font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as solid from '@fortawesome/free-solid-svg-icons';
import * as regular from '@fortawesome/free-regular-svg-icons';
import { bookmarkostService, removeBookmarkService, showAllBookmarksService } from '../../utilities/bookmarks/bookmarks-service';
import { getUser } from '../../utilities/users/users-service';

import ReactLoading from "react-loading";

//* sweet alert
import Swal from 'sweetalert2';
import { swalBasicSettings } from "../../utilities/posts/posts-service";

export function Bookmark({ postID, location }) {
  const [bookmarked, setBookmarked] = useState(false);
  const [status, setStatus] = useState(null);
  
  
  const inBookmarksPage = location === 'bookmarks';

  useEffect(() => {
    const fetchLikes = async () => {
      const data = await showAllBookmarksService(postID);
      if (data.filter(bookmark => bookmark.user_id === getUser().id).length > 0) {
        setBookmarked(true);
      }
    };
    fetchLikes();
    
  }, [postID]);
  
  const handleBookmark = async () => {
    await bookmarkostService(postID);
    setBookmarked(true);
  };

  const handleRemoveBookmark = async() => {
    if (inBookmarksPage) {
      setStatus("loading");
    }
    
    try {
      await removeBookmarkService(postID);
      if (inBookmarksPage){
        window.location.reload();
      }
      setBookmarked(false);
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
      setStatus("error");
    } finally {
      setStatus("success");
    }
    
  };

  if (status === 'loading') {
    return <div className="d-flex col justify-content-center align-items-center" style={{height: "100vh"}}>
    <ReactLoading type="spin" color="#67E8B5" height={100} width={50} />
    <p>Loading...</p>
    </div>
  }

  return (
    <div className="my-1">
    { bookmarked ? 
      <FontAwesomeIcon onClick={handleRemoveBookmark} 
      icon={solid.faBookmark} style={{color: "#67E8B5"}} className="interaction"/>
       : 
      <FontAwesomeIcon onClick={handleBookmark} 
      icon={regular.faBookmark} style={{color: "#2B0806"}} className="interaction"/>
    }
    </div>
  );
}