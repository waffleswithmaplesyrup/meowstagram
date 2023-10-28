import sendRequest from "../send-request/send-request";

const BASE_URL = "/api/comments";


export function createNewCommentAPI(postID, commentData) {
  return sendRequest(`${BASE_URL}/${postID}/new`, "POST", commentData);
}

export function deleteCommentAPI(commentID) {
  return sendRequest(`${BASE_URL}/${commentID}`, "DELETE");
}

export function getAllCommentsAPI(postID) {
  return sendRequest(`${BASE_URL}/${postID}`);
}