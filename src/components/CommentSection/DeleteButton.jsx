
import { deleteCommentService } from '../../utilities/comments/comments-service';

//* font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as solid from '@fortawesome/free-solid-svg-icons';

//* sweet alert
import Swal from 'sweetalert2';
import { swalBasicSettings } from "../../utilities/posts/posts-service";


export default function DeleteButton({ comment, filterAfterDelete }) {

  const handleDelete = async () => {
    
    const prompt = await Swal.fire({
      ...swalBasicSettings("Proceed to delete?", "warning"),
      text: "Are you sure you want to delete this comment?",
      showCancelButton: true,
      confirmButtonText: "DELETE",
      cancelButtonText: "CANCEL",
    });

    if (prompt.isConfirmed) {
      try {
        await deleteCommentService(comment.id);
        
        filterAfterDelete(comment.id);

        Swal.fire(swalBasicSettings("Deleted!", "success"));
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