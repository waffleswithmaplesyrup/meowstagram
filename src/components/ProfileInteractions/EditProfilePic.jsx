import { useState } from "react";
import ReactLoading from "react-loading";

import { getLoggedInUserService, updateProfilePicService, uploadToS3Service } from "../../utilities/users/users-service";

//* font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as solid from '@fortawesome/free-solid-svg-icons';

//* sweet alert
import Swal from 'sweetalert2';
import { swalBasicSettings } from "../../utilities/posts/posts-service";

export default function EditProfilePic() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [status, setStatus] = useState(null);

  const [imageFiles, setImageFiles] = useState({
    images: [],
    preview: [],
    filenames: [],
  });

  const handleImgFileInput = (e) => {
    
    setSelectedImage(e.target.files[0]);

    const imgFiles = Array.from(e.target.files);
    const updatedPreview = [];
    const updatedFilenames = [];

    imgFiles.forEach((img) => {
      const imgUrl = URL.createObjectURL(img);
      updatedPreview.push(imgUrl);
      updatedFilenames.push(img.name);
    });
    setImageFiles({
      images: [...imageFiles.images, ...imgFiles],
      preview: [...imageFiles.preview, ...updatedPreview],
      filenames: [...imageFiles.filenames, ...updatedFilenames],
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (imageFiles.images.length === 0) return;
    setStatus("loading");

    const imgFormData = new FormData();
    imageFiles.images.forEach((img) => {
      imgFormData.append("images", img);
    });
    
    try {
      
      const imgURL = await uploadToS3Service(imgFormData);
      
      const newPic = await updateProfilePicService({
        profile_pic: imgURL,
      });
      console.log('new profile pic uploaded:', newPic);
      await getLoggedInUserService();   //* fetch new getUser()

      Swal.fire(swalBasicSettings("Updated profile photo successfully!", "success"))
      .then((result) => {
        if (result.isConfirmed) {
          let timerInterval
          Swal.fire({
            ...swalBasicSettings('Refreshing page...'),
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
              window.location.reload();
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
    <p>Loading...</p>
    </div>
  }

  const disable = selectedImage === null;

  return (
    <>
    <FontAwesomeIcon icon={solid.faPenToSquare} style={{color: "#67E8B5"}} className="delete" data-bs-toggle="modal" 
    data-bs-target={`#idprofilePic`}/>

    <div className="modal" id={`idprofilePic`} >
    <div className="d-flex align-items-center" style={{height: "100vh"}}>
      <div className="modal-dialog" >
        <div className="modal-content">

          <div className="modal-header">
            <h4 className="modal-title">Upload New Profile Pic</h4>
            <button type="button" className="btn-close" data-bs-dismiss="modal"
            onClick={() => setSelectedImage(null)}></button>
          </div>

          <div className="modal-body p-5">
            <div>
            {selectedImage && (
              <div className="text-center">
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

          </div>

          <div className="modal-footer">
            <button disabled={disable} type="button" className="form-control default-button" style={{width: "100px"}} data-bs-dismiss="modal" onClick={handleSubmit}>Upload</button>
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
  );
}