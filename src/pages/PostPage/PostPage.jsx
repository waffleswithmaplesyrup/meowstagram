import PostAuthor from "../../components/PostAuthor/PostAuthor";
import PostInteractions from "../../components/PostInteractions/PostInteractions";
import Comments from "../../components/Comments/Comments";

export default function PostPage () {

  return (
    <div>
      <div>
        <ImageCarousel />
        <PostInteractions />
        <p>date</p>
      </div>

      <div>
        <PostAuthor />
        <p>post caption</p>
        <Comments />
        <PostComment />
      </div>
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