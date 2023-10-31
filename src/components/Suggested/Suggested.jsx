import { useEffect, useState } from "react";
import ReactLoading from "react-loading";

import { getSuggestedUsersService } from "../../utilities/users/users-service";

//* sweet alert
import Swal from 'sweetalert2';
import { swalBasicSettings } from "../../utilities/posts/posts-service";
import SuggestedCard from "./SuggestedCard";

export default function Suggested ({ following }) {
  const [suggested, setSuggested] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchUsers = async() => {
      try {
        const data = await getSuggestedUsersService();
        setSuggested(data);

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
    <div className="container px-4 pt-5" id="hanging-icons">
    <p className="pb-2 border-bottom">Suggested For You</p>
    <div className="g-4 pt-2 row-cols-1 row-cols-lg-3">
      {
        suggested?.map(user => <SuggestedCard key={user.id} user={user} /> )
      }
    </div>
  </div>
  );
}