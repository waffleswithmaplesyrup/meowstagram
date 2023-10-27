import PostAuthor from "../../components/PostAuthor/PostAuthor";
import PostInteractions from "../../components/PostInteractions/PostInteractions";
import Comments from "../../components/Comments/Comments";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { viewOnePostService } from "../../utilities/posts/posts-service";

export default function PostPage () {
  const { username, postID } = useParams();
  const [post, setPost] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const data = await viewOnePostService(username, postID);
      console.log(data);
      setPost(data);
    };
    fetchPost();
  }, [username, postID]);

  const date = new Date(post.date_posted);
  console.log(date);

  return (
    // <div>
    //   <div>
    //     <ImageCarousel />
    //     <PostInteractions />
    //     <p>date</p>
    //   </div>

    //   <div>
    //     <PostAuthor />
    //     <p>post caption</p>
    //     <Comments />
    //     <PostComment />
    //   </div>
    // </div>
    
    <div>
      <img src={post.photo} alt="post image" />
      <p>{post.caption}</p>

      <img className="profile-pic-small" src={post.profile_pic} alt="profile pic"/>
      <p>{post.username}</p>

      <p>{date.toDateString()}</p>
    </div>


  );
}

function ImageCarousel () {

  return (
    <div>
      images
    </div>
  );
}

function PostComment () {

  return (
    <div>
      <textarea placeholder="Add a comment..." />
      <button>Post</button>
    </div>
  );
}