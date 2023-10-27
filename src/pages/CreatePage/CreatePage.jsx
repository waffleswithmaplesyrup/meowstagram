export default function CreatePage () {

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="w-100 text-center py-5">
      <p>Create New Post</p>
      <hr />
      <form onSubmit={handleSubmit} className="py-5">
        <ImageUpload />
        <CaptionEdit />
        <button>Post</button>
      </form>
    </div>
  );
}

import { useState } from "react";

function CaptionEdit () {
  const [caption, setCaption] = useState("");

  return (
      <section className="w-100 p-4 d-flex justify-content-center pb-2">
        <div className="form-outline form-floating mb-3" style={{width: "22rem", height: "10rem"}}>
          <textarea onChange={(event) => setCaption(event.target.value)} 
          value={caption} placeholder="Write a caption" 
          className="form-control h-100" id="floatingInput" rows="4"></textarea>
          <label htmlFor="floatingInput">Write a caption</label>
        </div>
      </section>
  );
}

function ImageUpload () {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div>

      {selectedImage && (
        <div>
          <img
            alt="not found"
            width={"250px"}
            src={URL.createObjectURL(selectedImage)}
          />
          <br />
          <div className="d-flex justify-content-center align-items-center">
      <div className="file-upload-wrapper" style={{width: "250px"}}>
      <button className="form-control" onClick={() => setSelectedImage(null)}>Remove</button>
    </div>
    </div>
        </div>
      )}

      <br />
      
      <div className="d-flex justify-content-center align-items-center">
      <div className="file-upload-wrapper" style={{width: "22rem"}}>
        <input onChange={(event) => {
          console.log(event.target.files[0]);
          setSelectedImage(event.target.files[0]);
        }} type="file" id="input-file-now" className="file-upload form-control" />
      </div>
    </div>
    
    
    
    </div>
  );
}