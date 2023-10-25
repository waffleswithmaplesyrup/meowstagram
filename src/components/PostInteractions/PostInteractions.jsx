export default function PostInteractions () {

  return (
    <div>
      <div>
        <LikeButton />
        <CommentButton />
        <ShareButton />
      </div>
      <BookmarkButton />
    </div>
  );
}

function LikeButton () {
  return (
    <>
      like
    </>
  );
}

function CommentButton () {
  return (
    <>
      comment
    </>
  );
}

function ShareButton () {

  return (
    <>
      share
    </>
  );
}

function BookmarkButton () {

  return (
    <>
      bookmark
    </>
  );
}