import { Link } from "react-router-dom";

import PostAuthor from "../PostAuthor/PostAuthor";
import PostInteractions from "../PostInteractions/PostInteractions";


export default function Feed () {

  return (
    <div>
      <FeedCard />
    </div>
  );
}

function FeedCard () {

  return (
    <div>
      <img src='' alt='feed pic' />
      <PostInteractions />
      <div>number of likes</div>
      <PostAuthor />
      <Link>View Comments</Link>
    </div>
  );
}