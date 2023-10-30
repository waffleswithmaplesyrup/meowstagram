
//* sweet alert
import Swal from 'sweetalert2';
import { editPostService, swalBasicSettings } from "../../utilities/posts/posts-service";

//* font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as solid from '@fortawesome/free-solid-svg-icons';

import debug from 'debug';


export default function EditPost({ post }) {
  const caption = post.caption;

  const handleEdit = async () => {
    Swal.fire({
      ...swalBasicSettings("Edit Caption"),
      input: 'text',
      inputValue: caption,
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Edit',
      showLoaderOnConfirm: true,
      preConfirm: async (edited) => {
        try {
          if (edited !== post.caption) {
            const data = await editPostService(post.id, { caption: edited });
            debug(data);
          } else {
            console.log("caption was not changed");
            return;
          }
        } catch (error) {
          Swal.showValidationMessage(
            `Request failed: ${error}`
          )
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed && result.value !== caption) {
        let timerInterval
        Swal.fire({
          ...swalBasicSettings("Caption edited successfully!"),
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
            console.log('I was closed by the timer')
            window.location.reload();
          }
        })
      }
    })
    
  };

  return (
    <>
      <FontAwesomeIcon icon={solid.faPenToSquare} style={{color: "#8D8585"}} className="delete" onClick={handleEdit}/>
    </>
  );
}