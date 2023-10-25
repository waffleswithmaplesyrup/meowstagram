export default function Comments () {

  return (
    <div>
      <CommentCard />
    </div>
  );
}

function CommentCard () {

  return (
    <div>
      <img src='' alt='profile pic' />
      <p>username</p>
      <p>comment</p>
    </div>
  );
}