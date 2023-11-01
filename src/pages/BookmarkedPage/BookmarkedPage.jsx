import { useEffect, useState } from "react";
import ReactLoading from "react-loading";

import FeedCard from "../../components/Feed/FeedCard";

//* sweet alert
import Swal from 'sweetalert2';
import { swalBasicSettings } from "../../utilities/posts/posts-service";
import { showAllUserBookmarksService } from "../../utilities/bookmarks/bookmarks-service";

export default function Feed () {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const data = await showAllUserBookmarksService();
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

  return (
    <div className="w-100 text-center py-5">
      <p className="username">Bookmarked</p>
      <hr />

      <div className="w-100 my-5 pt-5 d-flex row justify-content-center">
        {
          feed.length === 0 ? <p>No posts saved in your bookmarks yet!</p>
          :
          feed.map(value => ({ value, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(({ value }) => value)?.map(post => <FeedCard key={post.id} post={post} location="bookmarks" />)
        }
      </div>
    </div>
  );
}