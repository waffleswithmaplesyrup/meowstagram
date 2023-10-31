import { Link } from "react-router-dom";
import PostAuthor from "../PostAuthor/PostAuthor";
import PostInteractions from "../PostInteractions/PostInteractions";
import LikeButton from "../PostInteractions/LikeButton";

export default function FeedCard({ post }) {
  // console.log(post);

  const datePosted = new Date(post.date_posted);
  const date = post.date_posted

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
  

  console.log(`${post.username}`, duration);


  return (
    <div className="pb-3">
      { 
        post.id ?
        <div className="m-auto" style={{width: "500px"}}>
          <Link to={`/profile/${post.username}/${post.id}`}>
            <img src={post.photo} alt='feed pic' className="post-image opacity-8"/>
          </Link>
          <div className="text-start">
            <LikeButton postID={post.id} />
          </div>

          <div className="d-flex justify-content-start w-100 my-3" >
          
            <Link to={`/profile/${post.username}`} style={{width: "80px"}} className="text-start">
              <img src={post.profile_pic} alt="profile pic" className="profile-pic-small"/>
            </Link>
            <Link to={`/profile/${post.username}`} style={{width: "100px"}} className="text-start mx-2">
              <p className="username">{post.username}</p>
            </Link>
            <div>
              <p className="mx-2 text-start" style={{width: "200px"}} >{post.caption}</p>
            </div>
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