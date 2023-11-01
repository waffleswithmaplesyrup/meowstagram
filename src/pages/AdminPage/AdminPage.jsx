import { useEffect, useState } from "react";

import ReactLoading from "react-loading";

//* sweet alert
import Swal from 'sweetalert2';
import { swalBasicSettings } from "../../utilities/posts/posts-service";

import { getAllUsersAdminService, getUser } from "../../utilities/users/users-service";
import UserCard from "./UserCard";


export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsersAdminService();
        
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
      
      <div className="text-center py-5 mx-auto" style={{width: "1000px"}}>
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

