import { useState } from "react";
import { Link } from "react-router-dom";

import PostAuthor from "../PostAuthor/PostAuthor";
import PostInteractions from "../PostInteractions/PostInteractions";


export default function Feed () {
  // const [feed, setFeed] = useState([
  //   { username: "juju", profilePic: "", photo: "https://picsum.photos/id/237/200/"},
  //   { username: "eva", profilePic: "", photo: "https://picsum.photos/id/257/200/"},
  //   { username: "juju", profilePic: "", photo: "https://picsum.photos/id/237/200/"},
  //   { username: "eva", profilePic: "", photo: "https://picsum.photos/id/257/200/"},
  //   { username: "juju", profilePic: "", photo: "https://picsum.photos/id/237/200/"},
  //   { username: "eva", profilePic: "", photo: "https://picsum.photos/id/257/200/"},
  // ]);
  const [feed, setFeed] = useState([]);
  

  return (
    <div>
      {
        feed?.map(post => <FeedCard key={post.id} post={post} />)
      }
    </div>
  );
}

function FeedCard({ post }) {

  return (
    <div>
      <img src={post.photo} alt='feed pic' />
      <PostInteractions />
      <div>number of likes</div>
      <PostAuthor post={post} />
      <Link>View Comments</Link>
    </div>
  );
}