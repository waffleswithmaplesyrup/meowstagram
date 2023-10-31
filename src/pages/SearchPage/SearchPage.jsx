import { useEffect, useState } from "react";
import ReactLoading from "react-loading";

//* sweet alert
import Swal from 'sweetalert2';
import { swalBasicSettings } from "../../utilities/posts/posts-service";
import { searchUsersService } from "../../utilities/users/users-service";
import { showFollowsService } from "../../utilities/followers/followers-service";
import { Link } from "react-router-dom";

export default function SearchPage () {
  const [keyword, setKeyword] = useState("");
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState(null);


  const handleSearch = async (event) => {
    event.preventDefault();
    setStatus("loading");

    try {
      const data = await searchUsersService(keyword);
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

  return (
    <div className="w-100 text-center py-5">
      {/* <SearchBar />   */}
      <form onSubmit={handleSearch}>
        <input onChange={e => setKeyword(e.target.value)} value={keyword} placeholder="Search"/>
      </form>
      
      <hr />
      {
        users.length === 0 ? 
        "No search results" :
        users?.map(user => <SearchCard key={user.id} user={user}/>)
      }
    </div>
  );
}

function SearchCard ({ user }) {
  const [loading, setLoading] = useState(true);
  const [followers, setFollowers] = useState([]);


  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        // const data = await showFeedService(getUser().username); 
        // setFeed(data);
        
        const followInfo = await showFollowsService(user.username);
        setFollowers(followInfo.followers);

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
    fetchFollowers();
  }, [user]);

  if (loading) {
    return <div className="d-flex col justify-content-center align-items-center" style={{height: "100vh"}}>
    <ReactLoading type="spin" color="#67E8B5" height={100} width={50} />
    <p>Loading...</p>
    </div>
  }

  return (
    <div style={{width: "400px", margin: "auto"}}>
    <div className="m-auto d-flex justify-content-between my-3" >
      <Link target="_blank" to={`/profile/${user.username}`} className="d-flex">
        <img className="profile-pic-small" src={user.profile_pic} alt='profile pic' />
        <p className="username mx-3">{user.username}</p>
      </Link>
      <p><span className="username">{followers.length}</span> followers</p>
    </div>
    <hr />
    </div>
  );
}