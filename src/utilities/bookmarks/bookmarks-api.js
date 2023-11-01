import sendRequest from "../send-request/send-request";

const BASE_URL = "/api/bookmarks";


export function bookmarkPostAPI(postID, userID) {
  // const senderID = getUser().id;
  return sendRequest(`${BASE_URL}/${postID}`, "POST", userID);
}

export function removeBookmarkAPI(postID, userID) {
  return sendRequest(`${BASE_URL}/${postID}/${userID}`, "DELETE");
}

export function showAllBookmarksAPI(postID) {
  return sendRequest(`${BASE_URL}/${postID}`);
}

export function showAllUserBookmarksAPI(userID) {
  return sendRequest(`${BASE_URL}/user/${userID}`);
}