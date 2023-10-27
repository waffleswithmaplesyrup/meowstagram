import sendRequest from "../send-request/send-request";

const BASE_URL = "/api/posts";

//* getAll
export function viewAllUserPostsAPI(username) {
  return sendRequest(`${BASE_URL}/${username}`);
}

//* getOne
export function viewOnePostAPI(username, postID) {
  return sendRequest(`${BASE_URL}/${username}/${postID}`);
}

export function createNewPostAPI(userID, postData) {
  return sendRequest(`${BASE_URL}/${userID}/new`, "POST", postData);
}

export function deleteOnePostAPI(postID) {
  return sendRequest(`${BASE_URL}/${postID}`, "DELETE");
}