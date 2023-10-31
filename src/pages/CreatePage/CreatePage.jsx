import debug from "debug";

import { useState } from "react";
import { createNewPostService, uploadToS3Service } from "../../utilities/posts/posts-service";
import { getUser } from "../../utilities/users/users-service";
import { useNavigate } from "react-router-dom";

const log = debug("meowstagram:src:pages:create");

import ReactLoading from "react-loading";

//* sweet alert
import Swal from 'sweetalert2';
import { swalBasicSettings } from "../../utilities/posts/posts-service";

export default function CreatePage () {
  const [selectedImage, setSelectedImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();


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
      console.log('new post created:', newPost);
      // navigate(`/profile/${getUser().username}/${newPost.id}`);

      Swal.fire(swalBasicSettings("Uploaded new post successfully!", "success"))
      .then((result) => {
        if (result.isConfirmed) {
          let timerInterval
          Swal.fire({
            ...swalBasicSettings('Redirecting...'),
            timer: 500,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading()
              const b = Swal.getHtmlContainer().querySelector('b')
              timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft()
              }, 100)
            },
            willClose: () => {
              clearInterval(timerInterval)
            }
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
              console.log('I was closed by the timer')
              // window.location.reload();
              navigate(`/profile/${getUser().username}/${newPost.id}`);
            }
          })
        }
      });
    } catch (err) {
      if (err.message === "Unexpected end of JSON input") {
        Swal.fire({
          ...swalBasicSettings("Internal Server Error", "error"),
          text: "Please try again later.",
        });
      } else {
        Swal.fire({
          ...swalBasicSettings("Error", "error"),
          text: err.message,
          confirmButtonText: "Try Again",
        });
      }
      setStatus("error");
    } finally {
      setStatus("success");
    }
  };

  if (status === 'loading') {
    return <div className="d-flex col justify-content-center align-items-center" style={{height: "100vh"}}>
    <ReactLoading type="spin" color="#67E8B5" height={100} width={50} />
    <p>Uploading...</p>
    </div>
  }

  const disable = selectedImage === null;

  return (
    <div className="w-100 text-center py-5">
      <p>Create New Post</p>
      <hr />
      <form className="py-5 m-auto" style={{width: "400px"}}>
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
        <div className="modal-footer">
          <button onClick={handleSubmit} disabled={disable} type="button" className="form-control default-button" style={{width: "100px", marginRight: "10px"}}>Post</button>
        </div>
      </form>
    </div>
  );
}