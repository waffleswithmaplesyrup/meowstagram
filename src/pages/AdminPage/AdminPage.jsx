import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";

//* sweet alert
import Swal from 'sweetalert2';
import { swalBasicSettings } from "../../utilities/posts/posts-service";

import { getAllUsersAdminService, getUser, deactivateUserService } from "../../utilities/users/users-service";


export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsersAdminService();
        // console.log(data);
        setUsers(data);
        
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
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) {
    return <div className="d-flex col justify-content-center align-items-center" style={{height: "100vh"}}>
    <ReactLoading type="spin" color="#67E8B5" height={100} width={50} />
    <p>Loading...</p>
    </div>
  }

  return (
    <>
      {
      getUser().permissions === "admin" ?
      
      <div className="w-100 text-center py-5">
        <p className="username">View All Users</p>
        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Profile</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Permissions</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {
                users?.map(user => <UserCard key={user.id} user={user}/>)
              }
            </tbody>
          </table>
        </div>
      </div>
      : <div className="d-flex col justify-content-center align-items-center"><p className="username">Unauthorised</p></div>
      }
    </>
  );
}

function UserCard({ user }) {
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
      <th scope="row"><Link to={`/profile/${user.username}`}><img className="profile-pic-comment" src={user.profile_pic} alt="profile pic"/></Link></th>
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