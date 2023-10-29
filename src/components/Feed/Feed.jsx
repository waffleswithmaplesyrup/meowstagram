import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import PostAuthor from "../PostAuthor/PostAuthor";
import PostInteractions from "../PostInteractions/PostInteractions";
import { showFeedService } from "../../utilities/followers/followers-service";
import { getUser } from "../../utilities/users/users-service";


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

  useEffect(() => {
    const fetchFeed = async () => {
      const data = await showFeedService(getUser().username); 
      setFeed(data);
    };
    fetchFeed();
  }, []);

  return (
    <div>
      {
        feed?.map(post => <FeedCard key={post.id} post={post} />)
      }
    </div>
  );
}

function FeedCard({ post }) {
  console.log(post);

  return (
    <div>

      { 
        post.id ?
        <div>
          <img src={post.photo} alt='feed pic' className="post-image"/>
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