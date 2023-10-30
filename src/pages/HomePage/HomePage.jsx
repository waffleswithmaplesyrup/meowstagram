import { useEffect, useState } from "react";

import { showFollowsService } from "../../utilities/followers/followers-service";
import { getUser } from "../../utilities/users/users-service";

import Following from "../../components/Following/Following";
import Suggested from "../../components/Suggested/Suggested";
import Feed from "../../components/Feed/Feed";
import Footer from "../../components/Footer/Footer";

import ReactLoading from "react-loading";

//* sweet alert
import Swal from 'sweetalert2';
import { swalBasicSettings } from "../../utilities/posts/posts-service";

export default function HomePage () {
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchUserFollowList = async () => {
      try {
        const data = await showFollowsService(getUser().username);
        setFollowing(data.following);
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
    fetchUserFollowList();
  }, []);

  if (loading) {
    return <div className="d-flex col justify-content-center align-items-center" style={{height: "100vh"}}>
    <ReactLoading type="spin" color="#67E8B5" height={100} width={50} />
    <p>Loading...</p>
    </div>
  }

  return (
    <>
      <div className="w-50 text-center">
        <Following following={following} />
        <hr />
        <Feed />
      </div>
      <div>
        <Suggested following={following} />
        <Footer />
      </div>
    </>
  );
}