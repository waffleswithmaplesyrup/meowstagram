import sendRequest from "../send-request/send-request";

const BASE_URL = "/api/likes";


export function likePostAPI(postID, senderID) {
  // const senderID = getUser().id;
  return sendRequest(`${BASE_URL}/${postID}`, "POST", senderID);
}

export function unlikePostAPI(postID, senderID) {
  return sendRequest(`${BASE_URL}/${postID}/${senderID}`, "DELETE");
}

export function showAllLikesAPI(postID) {
  return sendRequest(`${BASE_URL}/${postID}`);
}