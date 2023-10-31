import { useEffect, useState } from "react";
import ReactLoading from "react-loading";

import { showFeedService } from "../../utilities/followers/followers-service";
import { getUser } from "../../utilities/users/users-service";

import FeedCard from "./FeedCard";

//* sweet alert
import Swal from 'sweetalert2';
import { swalBasicSettings } from "../../utilities/posts/posts-service";

export default function Feed () {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const data = await showFeedService(getUser().username); 
        setFeed(data);

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
    fetchFeed();
  }, []);

  if (loading) {
    return <div className="d-flex col justify-content-center align-items-center" style={{height: "100vh"}}>
    <ReactLoading type="spin" color="#67E8B5" height={100} width={50} />
    <p>Loading...</p>
    </div>
  }

  let isEmpty = true;

  feed?.map(post => {
    if (post.id !== null) {
      isEmpty = false;
    }
  });



  return (
    <div className="pt-5">
      {
        feed.length === 0 ? <p>Start following frens to see their posts!</p>
        : isEmpty ? <p>Your frens don't have anything right meow :(</p> :
        feed.map(value => ({ value, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(({ value }) => value)?.map(post => <FeedCard key={post.id} post={post} />)
      }
    </div>
  );
}