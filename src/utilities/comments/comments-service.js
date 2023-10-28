import { createNewCommentAPI, deleteCommentAPI, getAllCommentsAPI} from "./comments-api";

export async function createNewCommentService(postID, commentData) {
  const newComment = await createNewCommentAPI(postID, commentData);
  return newComment[0];
}

export async function deleteCommentService(commentID) {
  await deleteCommentAPI(commentID);
}

export async function getAllCommentsService(postID) {
  const comments = await getAllCommentsAPI(postID);
  return comments.data.comments;
}
