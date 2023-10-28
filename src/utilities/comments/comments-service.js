import { getUser } from "../users/users-service";
import { createNewCommentAPI, deleteCommentAPI, getAllCommentsAPI} from "./comments-api";

export async function createNewCommentService(postID, content) {
  const newComment = await createNewCommentAPI(postID, { content, senderID: getUser().id});
  return newComment[0];
}

export async function deleteCommentService(commentID) {
  await deleteCommentAPI(commentID);
}

export async function getAllCommentsService(postID) {
  const comments = await getAllCommentsAPI(postID);
  return comments.data.comments;
}
