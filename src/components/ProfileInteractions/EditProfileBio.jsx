import { useState } from "react";
import ReactLoading from "react-loading";

import { getLoggedInUserService, getUser, updateUserBioService } from "../../utilities/users/users-service";

//* sweet alert
import Swal from 'sweetalert2';
import { swalBasicSettings } from "../../utilities/posts/posts-service";

export default function EditProfileBio() {
  const [bio, setBio] = useState(getUser().bio);
  const [status, setStatus] = useState(null);


  const updateBio = async (event) => {
    event.preventDefault();
    setStatus("loading");

    try {

      await updateUserBioService({ bio });
      await getLoggedInUserService();   //* fetch new getUser()

      Swal.fire(swalBasicSettings("Updated profile info successfully!", "success"))
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
      // window.location = `/profile/${getUser().username}/`;
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

  const disable = bio === getUser().bio;
  
  return (
    <>
    <button className="form-control default-button" data-bs-toggle="modal" 
    data-bs-target={`#idprofileBio`} style={{width: "120px", fontWeight: "normal"}} >Edit Profile</button>

    <div className="modal" id={`idprofileBio`}>
    <div className="d-flex align-items-center" style={{height: "100vh"}}>
      <div className="modal-dialog w-100">
        <div className="modal-content">

          <div className="modal-header">
            <h4 className="modal-title">Edit Bio</h4>
            <button type="button" className="btn-close" data-bs-dismiss="modal"
            onClick={() => setBio(getUser().bio)}></button>
          </div>

          <div className="modal-body p-5">
            <input type="text" className="form-control" placeholder="Add stuff about yourself..."
            value={bio} onChange={event => setBio(event.target.value)}/>
          </div>

          <div className="modal-footer">
            <button disabled={disable} type="button" className="form-control default-button" style={{width: "100px"}} data-bs-dismiss="modal" onClick={updateBio}>Edit</button>
          </div>

        </div>
      </div>
      </div>
    </div>
    </>
  );
}