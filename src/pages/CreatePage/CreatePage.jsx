export default function CreatePage () {

  return (
    <div className="w-100 text-center py-5">
      <p>Create New Post</p>
      <hr />
      <div>
        <ImageUpload />
        <CaptionEdit />
      </div>
    </div>
  );
}

function ImageUpload () {

  return (
    <div>
      Upload Image
    </div>
  );
}

function CaptionEdit () {

  return (
    <div>
      <div>
        <img src='' alt='profile pic' />
        <p>username</p>
      </div>
      <textarea placeholder="Write a caption" />
      <button>Post</button>
    </div>
  );
}