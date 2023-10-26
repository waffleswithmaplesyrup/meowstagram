export default function PostAuthor({ post }) {

  return (
    <div>
      <img src='' alt='profile pic' />
      <p>{post.username}</p>
      <p>post caption</p>
      <p>date</p>
    </div>
  );
}