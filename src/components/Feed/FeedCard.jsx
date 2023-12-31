import { Link } from "react-router-dom";
import LikeButton from "../PostInteractions/LikeButton";
import { Bookmark } from "./Bookmark";

export default function FeedCard({ post, location }) {

  const url = post.photo.toLowerCase();
  const isVideo = url.includes('.mov') || url.includes('.mp4') || url.includes('.mwv') || url.includes('.avi') || url.includes('.webm');

  const datePosted = new Date(post.date_posted);

  const currentDate = new Date();

  const durationSinceLastPosted = (currentDate - new Date(datePosted))

  let duration;

  // 1 day = 86, 400, 000 ms
  // 1 hr = 3, 600, 000 ms
  // 1 min = 60, 000 ms
  // 1 sec = 1000 ms
  if (durationSinceLastPosted > 86_400_000) {
    //* more than a day
    duration = Math.floor(durationSinceLastPosted / 86_400_000);
    duration = duration  + ` day${duration === 1 ? "" : "s"} ago`;
  } else if (durationSinceLastPosted > 3_600_000) {
    //* hours
    duration = Math.floor(durationSinceLastPosted / 3_600_000);
    duration = duration  + ` hour${duration === 1 ? "" : "s"} ago`;

  } else if (durationSinceLastPosted > 60_000) {
    //* minutes
    duration = Math.floor(durationSinceLastPosted / 60_000);
    duration = duration  + ` minute${duration === 1 ? "" : "s"} ago`;

  } else if (durationSinceLastPosted > 1000 ) {
    //* seconds
    duration = Math.floor(durationSinceLastPosted / 1000);
    duration = duration  + ` second${duration === 1 ? "" : "s"} ago`;

  } else {
    duration = durationSinceLastPosted;
    duration = duration  + ` millisecond${duration === 1 ? "" : "s"} ago`;

  }

  return (
    <div className="pb-3">
      { 
        post.id ?
        <div className="m-auto" style={{width: "500px"}}>
          <Link to={`/profile/${post.username}/${post.id}`}>
            {
              isVideo ? <video className="post-image opacity-8" src={post.photo} alt="post video" controls autoPlay muted /> 
              : <img className="post-image opacity-8" src={post.photo} alt="feed pic" />
            }
          </Link>
          <div className='d-flex justify-content-between my-2'>
            <LikeButton postID={post.id} />
            <Bookmark postID={post.id} location={location}/>
          </div>

          <div className="d-flex justify-content-between w-100 my-3" >
          
            <Link to={`/profile/${post.username}`} style={{width: "80px"}} className="text-start d-flex">
              <img src={post.profile_pic} alt="profile pic" className="profile-pic-small"/>
              <div>
                <p className="username  mx-3">{post.username}</p>
                <p className="mx-3 p-0" style={{width: "350px"}} >{post.caption}</p>
              </div>
              
            </Link>
            <div className="text-end" style={{width: "200px"}}>     
              <p>{duration}</p>
            </div>
          </div>
          <hr />
        </div> 
        :
        ""
      }
    </div>
  );
}