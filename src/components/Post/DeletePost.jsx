

//* sweet alert
import Swal from 'sweetalert2';
import { deleteOnePostService, swalBasicSettings } from "../../utilities/posts/posts-service";

//* font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as solid from '@fortawesome/free-solid-svg-icons';

export default function DeletePost({ post }) {

  const handleDelete = async () => {
    
    const prompt = await Swal.fire({
      ...swalBasicSettings("Proceed to delete?", "warning"),
      text: "Are you sure you want to delete this post?",
      showCancelButton: true,
      confirmButtonText: "DELETE",
      cancelButtonText: "CANCEL",
    });

    if (prompt.isConfirmed) {
      try {
        await deleteOnePostService(post.id);
      
        Swal.fire(swalBasicSettings("Post deleted successfully!", "success")).then((result) => {
          if (result.isConfirmed) {
            let timerInterval
            Swal.fire({
              ...swalBasicSettings('Redirecting...'),
              timer: 2000,
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
                
                window.location = `/profile/${post.username}`;
              }
            })
          }
        });
      } catch (err) {
        console.error(err);
        Swal.fire({
          ...swalBasicSettings("Error", "error"),
          text: "Unable to delete. Please try again!",
        });
      }
    }

  };

  return (
    <FontAwesomeIcon onClick={handleDelete} 
      icon={solid.faTrash} style={{color: "#8D8585"}} className="delete"/>
  );
}