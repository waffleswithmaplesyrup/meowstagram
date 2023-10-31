import { useState } from "react";
import { Link } from "react-router-dom";

import { deactivateUserService } from "../../utilities/users/users-service";

//* sweet alert
import Swal from 'sweetalert2';
import { swalBasicSettings } from "../../utilities/posts/posts-service";

export default function UserCard({ user }) {
  const [status, setStatus] = useState(null);
  const [active, setActive] = useState(user.permissions !== 'deactivated');
  const [permissions, setPermissions] = useState(user.permissions);

  const handleDeactivate = async () => {
    
    setStatus("loading");
    
    try {
      
      await deactivateUserService(user.id, "deactivated");
      setActive(false);
      setPermissions("deactivated");
     
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

  const handleReset = async () => {
    
    setStatus("loading");
    
    try {
      
      await deactivateUserService(user.id, "ok");
      setActive(true);
      setPermissions('ok');
     
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

  return (
    <tr>
      <th scope="row"><Link to={`/profile/${user.username}`}><img className="profile-pic-small" src={user.profile_pic} alt="profile pic"/></Link></th>
      <th scope="row">{user.username}</th>
      <td>{user.email}</td>
      <td>{permissions}</td>
      <td>
        {
          active ? <button onClick={handleDeactivate} className="form-control default-button m-auto" style={{width: "150px"}}>Deactivate</button>
          :
          <button onClick={handleReset} className="form-control default-button m-auto" style={{width: "150px"}}>Allow Access</button>
        }
      </td>
    </tr>
  );
}