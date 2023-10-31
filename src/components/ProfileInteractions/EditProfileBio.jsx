import { useState } from "react";

import { getLoggedInUserService, getUser, updateUserBioService } from "../../utilities/users/users-service";

//* font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as solid from '@fortawesome/free-solid-svg-icons';

export default function EditProfileBio() {
  const [bio, setBio] = useState(getUser().bio);

  const updateBio = async (event) => {
    event.preventDefault();

    try {

      await updateUserBioService({ bio });
      await getLoggedInUserService();   //* fetch new getUser()
      
      window.location = `/profile/${getUser().username}/`;
    } catch (err) {
      console.error(err.message);
    }
  };

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