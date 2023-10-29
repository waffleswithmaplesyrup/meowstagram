import { Link } from "react-router-dom";
import PostAuthor from "../PostAuthor/PostAuthor";
import PostInteractions from "../PostInteractions/PostInteractions";

export default function FeedCard({ post }) {
  // console.log(post);

  return (
    <div>
      { 
        post.id ?
        <div>
          <Link to={`/profile/${post.username}/${post.id}`}><img src={post.photo} alt='feed pic' className="post-image"/></Link>
          <PostInteractions />
          <div>number of likes</div>
          <PostAuthor post={post} />
          <Link>View Comments</Link>
        </div> 
        :
        ""
      }
    </div>
  );
}