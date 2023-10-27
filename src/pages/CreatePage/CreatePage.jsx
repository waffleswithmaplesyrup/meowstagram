import debug from "debug";

import { useState } from "react";
import { createNewPostService, uploadToS3Service } from "../../utilities/posts/posts-service";
import { getUser } from "../../utilities/users/users-service";

const log = debug("meowstagram:src:pages:create");

export default function CreatePage () {
  const [selectedImage, setSelectedImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [status, setStatus] = useState(null);


  const [imageFiles, setImageFiles] = useState({
    images: [],
    preview: [],
    filenames: [],
  });

  const handleImgFileInput = (e) => {
    console.log(e.target.files[0]);
    setSelectedImage(e.target.files[0]);

    const imgFiles = Array.from(e.target.files);
    const updatedPreview = [];
    const updatedFilenames = [];

    imgFiles.forEach((img) => {
      const imgUrl = URL.createObjectURL(img);
      updatedPreview.push(imgUrl);
      updatedFilenames.push(img.name);
    });
    log("imges", imgFiles);
    setImageFiles({
      images: [...imageFiles.images, ...imgFiles],
      preview: [...imageFiles.preview, ...updatedPreview],
      filenames: [...imageFiles.filenames, ...updatedFilenames],
    });
    log("Image uploaded");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (imageFiles.images.length === 0) return;
    setStatus("loading");

    const imgFormData = new FormData();
    imageFiles.images.forEach((img) => {
      imgFormData.append("images", img);
    });
    log("images appended to form", imgFormData);
    try {
      const imgURL = await uploadToS3Service(imgFormData);
      const newPost = await createNewPostService(getUser().id, {
        photo: imgURL,
        caption: caption
      });
      console.log(newPost);
      // Swal.fire(swalBasicSettings("Added to Wardrobe!", "success"));
      // setApparel([...apparel, newPost]);
      // resetApparelForm();
    } catch (err) {
      if (err.message === "Unexpected end of JSON input") {
        // Swal.fire({
        //   ...swalBasicSettings("Internal Server Error", "error"),
        //   text: "Please try again later.",
        // });
      } else {
        // Swal.fire({
        //   ...swalBasicSettings("Error", "error"),
        //   text: err.message,
        //   confirmButtonText: "Try Again",
        // });
      }
      setStatus("error");
    } finally {
      setStatus("success");
    }
  };

  return (
    <div className="w-100 text-center py-5">
      <p>Create New Post</p>
      <hr />
      <form onSubmit={handleSubmit} className="py-5">
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
        <input onChange={handleImgFileInput} type="file" name="photo" id="input-file-now" className="file-upload form-control" />
      </div>
    </div>
    </div>
    <section className="w-100 p-4 d-flex justify-content-center pb-2">
        <div className="form-outline form-floating mb-3" style={{width: "22rem", height: "10rem"}}>
          <textarea onChange={(event) => setCaption(event.target.value)} 
          value={caption} name="caption" placeholder="Write a caption" 
          className="form-control h-100" id="floatingInput" rows="4"></textarea>
          <label htmlFor="floatingInput">Write a caption</label>
        </div>
      </section>
        <button>Post</button>
      </form>
    </div>
  );
}