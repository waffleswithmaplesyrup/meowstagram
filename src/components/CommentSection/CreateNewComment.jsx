import { useState } from "react";

import { createNewCommentService } from "../../utilities/comments/comments-service";

import ReactLoading from "react-loading";

//* sweet alert
import Swal from 'sweetalert2';
import { swalBasicSettings } from "../../utilities/posts/posts-service";

export default function CreateNewComment({ username, postID }) {
  const [content, setContent] = useState('');
  const [status, setStatus] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setStatus("loading");

    try {
      const newComment = await createNewCommentService(postID, content);
      console.log('new comment created:', newComment);
      Swal.fire(swalBasicSettings("Posted comment successfully!", "success"))
      .then((result) => {
        if (result.isConfirmed) {
          let timerInterval
          Swal.fire({
            ...swalBasicSettings('Refreshing page...'),
            timer: 500,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading()
              const b = Swal.getHtmlContainer().querySelector('b')
              timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft()
              }, 100)
            },
            willClose: () => {
              clearInterval(timerInterval)
            }
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
              console.log('I was closed by the timer')
              window.location.reload();
            }
          })
        }
      });
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

  const disable = content === "";

  return (
    <form className="w-100 p-4" onSubmit={handleSubmit}>
      <div className="form-outline form-floating mb-3 w-100" style={{width: "22rem", height: "10rem"}}>
        <textarea onChange={(event) => setContent(event.target.value)} 
          value={content} name="caption" placeholder="Add a comment" 
          className="form-control h-100" id="floatingInput" rows="4"></textarea>
        <label htmlFor="floatingInput">Add a comment</label>
      </div>
      <div className="w-100 d-flex justify-content-end">
      <button disabled={disable} to={`/profile/${username}/${postID}`} className="default-link">Post</button>
      </div>
    </form>
  );
}