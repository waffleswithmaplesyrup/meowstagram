import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { viewAllUserPostsService } from "../../utilities/posts/posts-service";
import { followUserService, showFollowsService, unfollowUserService } from "../../utilities/followers/followers-service";
import { getLoggedInUserService, getUser, updateProfilePicService, updateUserBioService, uploadToS3Service } from "../../utilities/users/users-service";

export default function ProfilePage () {
  const { username } = useParams();

  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);

  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  
  useEffect(() => {
    const fetchPosts = async () => {
      const data = await viewAllUserPostsService(username);
      //* fetch number of followers
      //* fetch number of following
      const followInfo = await showFollowsService(username);
      setFollowers(followInfo.followers);
      setFollowing(followInfo.following);

      //* check if user has no posts
      if (data.length === 1 && data[0].id === null) {
        setPosts([]);
      } else {
        setPosts(data);
      }
      setUser(data);
    };
    fetchPosts();
  }, [username]);

  return (
    <div className="w-100 text-center py-5">
      {
        user.length > 0 ? (
          <div>
          <img src={user[0].profile_pic} alt="profile pic" 
          className="profile-pic"/>
          <p>{user[0].username}</p>
          
          <p>{posts.length} posts</p>
          <p>{followers.length} followers</p>
          <p>{following.length} following</p>
          <p>{user[0].bio}</p>
          {
            getUser().username === username ? 
            <div>
              <EditProfilePic />
              <EditProfileBio />
            </div> :
            <FollowButton />
          }
          
        </div>
        ) : ""
      }
      
      <hr />

      <div className="image-grid text-center">
      {
        posts.length === 0 ? <p>user has no posts yet</p> :
        posts?.map(post => <Link to={`/profile/${username}/${post.id}`} key={post.id}><img src={post.photo} alt="post"/></Link>)
      }
      </div>
    </div>
  );
}

function FollowButton() {
  const { username } = useParams();

  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchFollowing = async () => {
      const data = await showFollowsService(getUser().username);
      setIsFollowing(data.following.filter(user => user.username === username).length > 0);
    };
    fetchFollowing();
  }, [username]);


  const handleUnfollow = async () => {
    console.log("unfollow", username);
    const unfollow = await unfollowUserService(username);
    console.log(unfollow);
    setIsFollowing(false);
  };

  const handleFollow = async () => {
    console.log("follow", username);
    const follow = await followUserService(username);
    console.log(follow);
    setIsFollowing(true);
  };

  return (
    <div>
      {
        isFollowing ? <button onClick={handleUnfollow}>unfollow</button> : 
        <button onClick={handleFollow}>follow</button>
      }
    </div>
  );
}

function EditProfilePic() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [status, setStatus] = useState(null);
  

  const [imageFiles, setImageFiles] = useState({
    images: [],
    preview: [],
    filenames: [],
  });

  const handleImgFileInput = (e) => {
    
    setSelectedImage(e.target.files[0]);

    const imgFiles = Array.from(e.target.files);
    const updatedPreview = [];
    const updatedFilenames = [];

    imgFiles.forEach((img) => {
      const imgUrl = URL.createObjectURL(img);
      updatedPreview.push(imgUrl);
      updatedFilenames.push(img.name);
    });
    setImageFiles({
      images: [...imageFiles.images, ...imgFiles],
      preview: [...imageFiles.preview, ...updatedPreview],
      filenames: [...imageFiles.filenames, ...updatedFilenames],
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (imageFiles.images.length === 0) return;
    setStatus("loading");

    const imgFormData = new FormData();
    imageFiles.images.forEach((img) => {
      imgFormData.append("images", img);
    });
    // log("images appended to form", imgFormData);
    try {
      
      const imgURL = await uploadToS3Service(imgFormData);
      
      const newPic = await updateProfilePicService({
        profile_pic: imgURL,
      });
      console.log('new profile pic uploaded:', newPic);
      await getLoggedInUserService();   //* fetch new getUser()

      window.location = `/profile/${getUser().username}/`;
    } catch (err) {
      if (err.message === "Unexpected end of JSON input") {
        // Swal.fire({
        //   ...swalBasicSettings("Internal Server Error", "error"),
        //   text: "Please try again later.",
        // });
      } else {
        // Swal.fire({
        //   ...swalBasicSettings("Error", "error"),
        //   text: err.message,
        //   confirmButtonText: "Try Again",
        // });
      }
      setStatus("error");
    } finally {
      setStatus("success");
    }
  };

  return (
    <>
    <button type="button" className="btn btn-warning" data-bs-toggle="modal" 
    data-bs-target={`#idprofilePic`}>
      Edit Profile Pic
    </button>

    <div className="modal" id={`idprofilePic`}>
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h4 className="modal-title">Upload New Profile Pic</h4>
            <button type="button" className="btn-close" data-bs-dismiss="modal"
            onClick={() => setSelectedImage(null)}></button>
          </div>

          <div className="modal-body">
            <div>
            {selectedImage && (
              <div>
                <img
                  alt="not found"
                  width={"250px"}
                  src={URL.createObjectURL(selectedImage)}
                />
                <br />
                <div className="d-flex justify-content-center align-items-center">
            <div className="file-upload-wrapper" style={{width: "250px"}}>
            <button className="form-control" onClick={() => setSelectedImage(null)}>Remove</button>
          </div>
          </div>
              </div>
            )}

            <br />
            
            <div className="d-flex justify-content-center align-items-center">
            <div className="file-upload-wrapper" style={{width: "22rem"}}>
              <input onChange={handleImgFileInput} type="file" name="photo" id="input-file-now" className="file-upload form-control" />
            </div>
          </div>
          </div>

          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-warning" data-bs-dismiss="modal" onClick={handleSubmit}>Upload</button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

function EditProfileBio() {
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

  return (
    <>
    <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target={`#idprofileBio`}>
      Edit Profile Bio
    </button>

    <div className="modal" id={`idprofileBio`}>
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h4 className="modal-title">Edit Bio</h4>
            <button type="button" className="btn-close" data-bs-dismiss="modal"
            onClick={() => setBio(getUser().bio)}></button>
          </div>

          <div className="modal-body">
            <input type="text" className="form-control" 
            value={bio} onChange={event => setBio(event.target.value)}/>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-warning" data-bs-dismiss="modal" onClick={updateBio}>Edit</button>
          </div>

        </div>
      </div>
    </div>
    </>
  );
}